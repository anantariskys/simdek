<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = News::query();
    
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('body', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
    
        $news = $query->with('user')
                     ->latest()
                     ->paginate(10)
                     ->withQueryString();
    
        return Inertia::render('admin/artikel/index', [
            'artikels' => $news,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category
            ]
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
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|in:berita,wisata,budaya,umkm',
            'url_gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'phone_number' => 'nullable|string|required_if:category,umkm'
        ]);

   

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('url_gambar')) {
            $file = $request->file('url_gambar')->store('news-images', 'public');
            $imagePath = url('storage/' . $file);
        }
        // Generate slug from title
        $slug = Str::slug($request->title);
    

        $news = News::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'slug' => $slug,
            'body' => $request->body,
            'url_gambar' => $imagePath,
            'category' => $request->category,
            'phone_number' => $request->phone_number
        ]);

        return redirect()->route('admin-desa.artikel.index')->with('success', 'News created successfully');
    }
    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $artikel)
    {
        
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|in:berita,wisata,budaya,umkm',
            'url_gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'phone_number' => 'nullable|string|required_if:category,umkm'
        ]);


        // Handle image upload if new image is provided
        if ($request->hasFile('url_gambar')) {
            // Delete old image if exists
            if ($artikel->url_gambar) {
                $oldPath = str_replace(url('storage/'), '', $artikel->url_gambar);
                if (file_exists(storage_path('app/public/' . $oldPath))) {
                    unlink(storage_path('app/public/' . $oldPath));
                }
            }
            
            // Store new image
            $file = $request->file('url_gambar')->store('artikel-images', 'public');
            $imagePath = url('storage/' . $file);
        } else {
            $imagePath = $artikel->url_gambar;
        }

        // Generate new slug from title
        $slug = Str::slug($request->title);

        $artikel->update([
            'title' => $request->title,
            'slug' => $slug,
            'body' => $request->body,
            'url_gambar' => $imagePath,
            'category' => $request->category,
            'phone_number' => $request->phone_number
        ]);

        return redirect()->route('admin-desa.artikel.index')->with('success', 'News updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $artikel)
    {

 
        // Delete associated image if exists
        if ($artikel->url_gambar) {
            $imagePath = str_replace(url('storage/'), '', $artikel->url_gambar);
            if (file_exists(storage_path('app/public/' . $imagePath))) {
                unlink(storage_path('app/public/' . $imagePath));
            }
        }

        $artikel->delete();

        return redirect()->route('admin-desa.artikel.index')->with('success', 'News deleted successfully');
    }
}
