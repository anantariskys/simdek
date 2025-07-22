import Pagination from '@/components/shared/pagination';
import RootLayout from '@/layouts/app/root-layout';
import { InertiaPagination } from '@/types/pagination';
import { Calendar, MapPin, Users, Clock, AlertCircle } from 'lucide-react';
import React from 'react';

interface PengumumanItem {
  id: number;
  nama: string;
  tgl_pelaksanaan: string;
  lokasi: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  newestPengumuman: PengumumanItem[];
  allPengumuman:InertiaPagination<PengumumanItem> 
}

export default function Pengumuman({ newestPengumuman, allPengumuman }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long', 
      year: 'numeric',
    });
  };

  const getEventIcon = (nama: string) => {
    if (nama?.toLowerCase().includes('kerja bakti')) return Users;
    if (nama?.toLowerCase().includes('kesehatan')) return Clock;
    if (nama?.toLowerCase().includes('umkm') || nama?.toLowerCase().includes('pelatihan')) return Calendar;
    return Calendar;
  };

  const NoDataMessage = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Pengumuman</h3>
      <p className="text-gray-500 text-center max-w-sm">
        Saat ini belum ada pengumuman atau kegiatan yang tersedia. Silakan cek kembali nanti.
      </p>
    </div>
  );

  return (
    <RootLayout>
      {/* Enhanced Hero Section */}
      <section
        style={{
          backgroundImage: "url('/heroimg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="relative flex min-h-[85vh] items-center overflow-hidden"
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-800/70 to-green-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-green-400/10 rounded-full blur-lg animate-pulse delay-1000" />
        
        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Informasi Terkini</span>
            </div>
            
            <h1 className="mb-6 text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent animate-fade-in">
              Pengumuman Desa
            </h1>
            <p className="mb-12 text-2xl font-medium leading-relaxed text-green-50 max-w-2xl">
              Tetap terhubung dengan kegiatan dan informasi penting di desa. Temukan jadwal acara,
              kegiatan gotong royong, pelatihan, dan lainnya.
            </p>
            
            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{newestPengumuman.length + allPengumuman.total}</div>
                <div className="text-green-200 text-sm">Pengumuman Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-green-200 text-sm">Lokasi Kegiatan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              Kegiatan Mendatang
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Pengumuman Terbaru
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jangan lewatkan kegiatan-kegiatan penting yang telah direncanakan untuk kemajuan desa kita bersama
            </p>
          </div>

          {/* Latest Announcements Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {newestPengumuman.length > 0 ? (
              newestPengumuman.map((item, index) => {
                const IconComponent = getEventIcon(item.nama);
                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2"
                  >
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                      <div className="flex items-center justify-between">
                        <div className="bg-white/20 p-3 rounded-xl">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                          Terbaru
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
                        {item.nama}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-3 text-green-600" />
                          <span className="text-sm font-medium">{formatDate(item.tgl_pelaksanaan)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-3 text-green-600" />
                          <span className="text-sm font-medium">{item.lokasi}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {item.deskripsi}
                      </p>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            Diperbarui: {formatDate(item.updated_at)}
                          </span>
                          <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full">
                <NoDataMessage />
              </div>
            )}
          </div>

          {/* Enhanced Table for Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-700 to-green-800 px-6 py-4">
                <h3 className="text-white text-lg font-semibold">Pengumuman Lainnya</h3>
              </div>
              
              <div className="overflow-x-auto">
                {allPengumuman.data.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">#</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kegiatan</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tanggal</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Lokasi</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPengumuman.data.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-all duration-300"
                        >
                          <td className="px-6 py-4">
                            <span className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                              {(allPengumuman.current_page - 1) * allPengumuman.per_page + index + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {React.createElement(getEventIcon(item.nama), {
                                className: "w-5 h-5 text-green-600 mr-3"
                              })}
                              <span className="font-semibold text-gray-900">{item.nama}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-green-600 mr-2" />
                              {formatDate(item.tgl_pelaksanaan)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-green-600 mr-2" />
                              {item.lokasi}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 max-w-xs">
                            <p className="line-clamp-2">{item.deskripsi}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoDataMessage />
                )}
              </div>

              {allPengumuman.data.length > 0 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    {/* Info */}
                    <div className="text-sm text-gray-600">
                      Menampilkan {((allPengumuman.current_page - 1) * allPengumuman.per_page) + 1}-
                      {Math.min(allPengumuman.current_page * allPengumuman.per_page, allPengumuman.total)} dari {allPengumuman.total} pengumuman
                    </div>
                    
                    <Pagination links={allPengumuman.links}/>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ada Pertanyaan?</h3>
              <p className="text-green-100 mb-6">
                Hubungi kantor desa untuk informasi lebih lanjut tentang kegiatan yang akan datang
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-sm font-medium">Kantor Desa Terbuka Setiap Hari</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}