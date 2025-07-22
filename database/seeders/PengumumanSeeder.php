<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pengumuman;
use Carbon\Carbon;

class PengumumanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'nama' => 'Rapat Koordinasi Tim A',
                'tgl_pelaksanaan' => Carbon::now()->addDays(3),
                'lokasi' => 'Ruang Rapat Lt. 2',
                'deskripsi' => 'Koordinasi project semester 1'
            ],
            [
                'nama' => 'Workshop Development',
                'tgl_pelaksanaan' => Carbon::now()->addWeeks(2),
                'lokasi' => 'Aula Utama',
                'deskripsi' => 'Pelatihan pengembangan sistem'
            ],
            [
                'nama' => 'Sosialisasi Program Baru',
                'tgl_pelaksanaan' => Carbon::now()->addMonth(),
                'lokasi' => 'Ruang Seminar',
                'deskripsi' => 'Pengenalan program kerja baru'
            ],
            [
                'nama' => 'Training Staff IT',
                'tgl_pelaksanaan' => Carbon::now()->addDays(10),
                'lokasi' => 'Lab Komputer',
                'deskripsi' => 'Pelatihan staff IT divisi support'
            ],
            [
                'nama' => 'Evaluasi Kinerja Q1',
                'tgl_pelaksanaan' => Carbon::now()->addMonths(3),
                'lokasi' => 'Ruang Meeting Lt. 3',
                'deskripsi' => 'Evaluasi kinerja quarter 1'
            ],
            [
                'nama' => 'Gathering Departemen',
                'tgl_pelaksanaan' => Carbon::now()->addWeeks(6),
                'lokasi' => 'Taman Rekreasi',
                'deskripsi' => 'Acara gathering tahunan'
            ],
            [
                'nama' => 'Audit Internal',
                'tgl_pelaksanaan' => Carbon::now()->addMonths(2),
                'lokasi' => 'Ruang Audit',
                'deskripsi' => 'Pelaksanaan audit internal rutin'
            ],
            [
                'nama' => 'Presentasi Project',
                'tgl_pelaksanaan' => Carbon::now()->addWeeks(3),
                'lokasi' => 'Conference Room',
                'deskripsi' => 'Presentasi progress project'
            ],
            [
                'nama' => 'Maintenance Sistem',
                'tgl_pelaksanaan' => Carbon::now()->addDays(15),
                'lokasi' => 'Server Room',
                'deskripsi' => 'Pemeliharaan sistem rutin'
            ],
            [
                'nama' => 'Review Code',
                'tgl_pelaksanaan' => Carbon::now()->addDays(5),
                'lokasi' => 'Meeting Room A',
                'deskripsi' => 'Review code project terbaru'
            ]
        ];

        foreach ($events as $event) {
            Pengumuman::create(array_merge($event, [
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]));
        }
    }
}
