<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PengaduanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pengaduan::query();

        // Filter berdasarkan ID user yang login
        $query->where('user_id', Auth::id());

        // Pencarian berdasarkan judul
        if ($request->has('search') && $request->search) {
            $query->where('judul', 'like', '%' . $request->search . '%');
        }

        $pengaduans = $query->latest()->paginate(10)->withQueryString();



        return Inertia::render('warga/pengaduan/index', [
            'pengaduans' => $pengaduans,
        ]);
    }
    
    public function indexAdmin(Request $request)
    {
        $query = Pengaduan::query();



        // Pencarian berdasarkan judul
        if ($request->has('search') && $request->search) {
            $query->where('judul', 'like', '%' . $request->search . '%');
        }

        $pengaduans = $query->with('user')
            ->latest()
            ->paginate(10)
            ->withQueryString();


       

        return Inertia::render('admin/pengaduan/index', [
            'pengaduans' => $pengaduans,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'note' => 'required|string'
        ]);

        try {
            // Create new pengaduan with validated data and current user
            $pengaduan = Pengaduan::create([
                'user_id' => Auth::id(),
                'judul' => $validated['judul'],
                'note' => $validated['note']
            ]);

            return redirect()
                ->route('warga.pengaduan.index')
                ->with('success', 'Pengaduan berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()
                ->route('warga.pengaduan.index')
                ->with('error', 'Gagal menambahkan pengaduan.');
        }
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengaduan $pengaduan)
    {
        // Validate the request
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'note' => 'required|string'
        ]);

        try {
            // Check if pengaduan belongs to current user
            if ($pengaduan->user_id !== Auth::id()) {
                return redirect()
                    ->route('warga.pengaduan.index')
                    ->with('error', 'Unauthorized action.');
            }

            // Update pengaduan with validated data
            $pengaduan->update([
                'judul' => $validated['judul'],
                'note' => $validated['note']
            ]);

            return redirect()
                ->route('warga.pengaduan.index')
                ->with('success', 'Pengaduan successfully updated.');
        } catch (\Exception $e) {
            return redirect()
                ->route('warga.pengaduan.index')
                ->with('error', 'Failed to update pengaduan.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengaduan $pengaduan)
    {
        try {
            // Check if pengaduan belongs to current user
            if ($pengaduan->user_id !== Auth::id()) {
                return redirect()
                    ->route('warga.pengaduan.index')
                    ->with('error', 'Unauthorized action.');
            }

            // Delete the pengaduan
            $pengaduan->delete();

            return redirect()
                ->route('warga.pengaduan.index')
                ->with('success', 'Pengaduan successfully deleted.');
        } catch (\Exception $e) {
            return redirect()
                ->route('warga.pengaduan.index')
                ->with('error', 'Failed to delete pengaduan.');
        }
    }
}
