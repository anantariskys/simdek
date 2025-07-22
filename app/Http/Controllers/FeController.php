<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeController extends Controller
{
    public function landingPage() {}
    public function pengumuman()
    {
        $latestAnnouncements = Pengumuman::latest()->take(3)->get();
        $remainingAnnouncements = Pengumuman::whereNotIn('id', $latestAnnouncements->pluck('id'))->paginate(5);
        return Inertia::render('pengumuman', [
            'newestPengumuman' => $latestAnnouncements,
            'allPengumuman' => $remainingAnnouncements
        ]);
    }
    public function umkm() {
        $umkms = News::where('category', 'umkm')->paginate(10);
        return  Inertia::render('umkm',[
            'umkms' => $umkms
        ]);
    }
    public function umkmDetail(News $umkm) {
        return Inertia::render('detail-umkm', [
            'umkm' => $umkm,
            'relatedUmkm' => News::where('category', 'umkm')
                ->where('id', '!=', $umkm->id)
                ->take(3)
                ->get()
        ]);
    }
}
