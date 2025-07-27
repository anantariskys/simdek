<?php

namespace App\Http\Controllers;

use App\Models\JenisSurat;
use App\Models\PengajuanSurat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpOffice\PhpWord\TemplateProcessor;

class PengajuanSuratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PengajuanSurat::query();

        // Filter berdasarkan ID user yang login
        $query->where('user_id', Auth::id());

        // Filter by status if selected from dropdown
        if ($request->has('status') && $request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by letter number, status, or description
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nomor_surat', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%')
                    ->orWhere('keterangan', 'like', '%' . $request->search . '%');
            });
        }

        $pengajuans = $query->with('jenisSurat')->latest()->paginate(10)->withQueryString();
        $jenisSurats = JenisSurat::select('id', 'nama_lengkap')->get();

        return Inertia::render('warga/pengajuan/index', [
            'pengajuans' => $pengajuans,
            'jenisSurats' => $jenisSurats,
        ]);
    }

    /**
     * Display admin listing of submissions
     */
    public function indexAdmin(Request $request)
    {
        $query = PengajuanSurat::query();

        if ($request->has('status') && $request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nomor_surat', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%')
                    ->orWhere('keterangan', 'like', '%' . $request->search . '%');
            });
        }

        $pengajuans = $query->with(['jenisSurat', 'user'])->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/pengajuan/index', [
            'pengajuans' => $pengajuans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_surat_id' => 'required|exists:jenis_surats,id',
            'keterangan' => 'required|string|min:50',
        ]);

        $tahun = now()->year;

        // Ambil nomor urut terakhir tahun ini
        $latestNoUrut = PengajuanSurat::where('tahun', $tahun)->max('no_urut') ?? 0;
        $noUrut = $latestNoUrut + 1;
        $formattedNoUrut = str_pad($noUrut, 3, '0', STR_PAD_LEFT);

        // Ambil kode jenis surat
        $jenisSurat = JenisSurat::find($validated['jenis_surat_id']);

        // Buat format nomor surat
        $nomorSurat = "{$jenisSurat->kode_surat}/{$formattedNoUrut}/{$jenisSurat->kode_prov}/{$tahun}";

        // Simpan ke DB
        $pengajuanSurat = PengajuanSurat::create([
            'user_id' => Auth::id(),
            'jenis_surat_id' => $validated['jenis_surat_id'],
            'no_urut' => $noUrut,
            'tahun' => $tahun,
            'nomor_surat' => $nomorSurat,
            'status' => 'menunggu',
            'keterangan' => $validated['keterangan'],
            'file_surat' => null,
        ]);

        return redirect()->back()->with('success', 'Pengajuan surat berhasil dikirim');
    }

    /**
     * Reject a submission
     */
    /**
     * Reject a submission
     */
    public function tolak(PengajuanSurat $pengajuan, Request $request)
    {


        // Update submission status and rejection reason
        $pengajuan->update([
            'status' => 'ditolak',
        ]);

        return redirect()->back()->with('success', 'Pengajuan surat berhasil ditolak');
    }

    /**
     * Process a submission
     */
    public function proses(PengajuanSurat $pengajuan)
    {
        // Only allow processing submissions in 'menunggu' status
        if ($pengajuan->status !== 'menunggu') {
            return redirect()->back()->with('error', 'Status pengajuan tidak valid untuk diproses');
        }

        $pengajuan->update([
            'status' => 'diproses'
        ]);

        return redirect()->back()->with('success', 'Pengajuan surat sedang diproses');
    }

    /**
     * Upload processed letter
     */
    public function upload(PengajuanSurat $pengajuan, Request $request)
    {
        // Hanya bisa upload jika status 'diproses'
        if ($pengajuan->status !== 'diproses') {
            return redirect()->back()->with('error', 'Status pengajuan tidak valid untuk upload surat');
        }
        
        // Validasi file
        $validated = $request->validate([
            'file_surat' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);
        
        // Hapus file lama jika ada
        if ($pengajuan->file_surat) {
            Storage::disk('public')->delete($pengajuan->file_surat);
        }

        // Generate filename from submission details
        $extension = $request->file('file_surat')->getClientOriginalExtension();
        $filename = sprintf(
            '%s_%s_%s.%s',
            str_replace(['/', '\\'], '-', $pengajuan->nomor_surat),
            str_replace(' ', '_', $pengajuan->user->name),
            str_replace(' ', '_', $pengajuan->jenisSurat->nama_lengkap),
            $extension
        );
        
        // Store file with custom filename
        $path = $request->file('file_surat')->storeAs('surat', $filename, 'public');
        
        // Generate public URL
        $fileUrl = url('storage/' . $path);
        
        // Update pengajuan
        $pengajuan->update([
            'status' => 'selesai',
            'file_surat' => $fileUrl,
        ]);
   
        return redirect()->back()->with('success', 'Surat berhasil diunggah');
    }



    public function generate(PengajuanSurat $pengajuan)
    {
        // Pastikan status pengajuan sudah selesai
        if ($pengajuan->status !== 'diproses') {
            return redirect()->back()->with('error', 'Surat hanya dapat didownload setelah selesai diproses.');
        }

        // Ambil jenis surat
        $jenisSurat = $pengajuan->jenisSurat;
        if (!$jenisSurat || !$jenisSurat->kode_surat) {
            return redirect()->back()->with('error', 'Jenis surat tidak ditemukan.');
        }


        // Buat nama file template (misal: keterangan_kerja.docx)
        $templateFilename = 'template.docx';

        // Ambil path template dari storage
        $templatePath = storage_path('app/templates/' . $templateFilename);

        // Cek apakah file template ada
        if (!file_exists($templatePath)) {
            return redirect()->back()->with('error', 'Template surat tidak ditemukan: ' . $templateFilename);
        }


        // Proses template dengan PHPWord
        $templateProcessor = new TemplateProcessor($templatePath);

        // Isi data dinamis ke template
        $templateProcessor->setValue('jenis_surat', $pengajuan->jenisSurat->nama_lengkap); // contoh placeholder: {{nama}}
        $templateProcessor->setValue('nomor_surat', $pengajuan->nomor_surat);
        $templateProcessor->setValue('tanggal_sekarang', now()->translatedFormat('d F Y'));
        $templateProcessor->setValue('nama', 'Ananta Risky');


        $sanitizedNomor = str_replace(['/', '\\'], '-', $pengajuan->nomor_surat);
        $outputFilename = 'Surat_' . $sanitizedNomor . '.docx';


        $outputPath = storage_path('app/temp/' . $outputFilename);
        $templateProcessor->saveAs($outputPath);



        if (!file_exists($outputPath)) {
            return back()->with('error', 'Gagal menyimpan file surat ke: ' . $outputPath);
        }

        // Return file untuk didownload
        return response()->download($outputPath)->deleteFileAfterSend(true);
    }
}
