<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengumumanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pengumuman::query();
    
        if ($request->has('search') && $request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }
    
        $pengumumans = $query->latest()->paginate(10)->withQueryString();
    
        return Inertia::render('admin/pengumuman/index', [
            'pengumumans' => $pengumumans,
        ]);
    }
    


    /**
     * Store a newly created resource in storage.
     */public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tgl_pelaksanaan' => 'required|date',
            'lokasi' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        Pengumuman::create($validated);

        return redirect()->route('admin-desa.pengumuman.index')->with('success', 'Pengumuman berhasil ditambahkan.');
    }

    

  

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengumuman $pengumuman)
    {

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tgl_pelaksanaan' => 'required|date',
            'lokasi' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        $pengumuman->update($validated);

        return redirect()->route('admin-desa.pengumuman.index')->with('success', 'Pengumuman berhasil diperbarui.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengumuman $pengumuman)
    {
        $pengumuman->delete();

        return redirect()->back()->with('success', 'Pengumuman berhasil dihapus.');
    }
}
