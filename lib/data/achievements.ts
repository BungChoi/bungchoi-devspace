/**
 * ===========================================
 * ACHIEVEMENTS DATA
 * ===========================================
 * Awards, certifications, and achievements - REAL DATA
 */

export interface Achievement {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
    certificateUrl?: string;
}

export const achievements: Achievement[] = [
    {
        id: '1',
        title: 'PKM-KC 2023 - Pendanaan Kemendikbudristek',
        issuer: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
        date: '15 Desember 2023',
        description: 'LoFo (Leftover Food): Inovasi Pengurangan Food Waste untuk SDGs 2030. Sertifikat No: 220/D3/KM/2287.',
        certificateUrl: '/certificates/pkm-kc-2023.pdf',
    },
    {
        id: '2',
        title: 'E-PKK - Best Poster',
        issuer: 'Expo Pekan Ilmiah Mahasiswa 2023',
        date: '2023',
        description: 'Penghargaan poster terbaik untuk proyek E-PKK Kabupaten Nganjuk. No: 008/SERTIF/HMJ TI/VII/2023.',
        certificateUrl: '/certificates/epkk-best-poster.pdf',
    },
    {
        id: '3',
        title: 'E-PKK - Juara 2 Aplikasi Terbaik',
        issuer: 'TIF Exhibition PSDKU Nganjuk',
        date: '14 Agustus 2023',
        description: 'Juara 2 aplikasi terbaik dari Program Studi Teknik Informatika Kampus 3 Kabupaten Nganjuk.',
        certificateUrl: '/certificates/epkk-juara2.pdf',
    },
    {
        id: '4',
        title: 'Hak Cipta - Prototype Aplikasi LoFo',
        issuer: 'Kementerian Hukum dan HAM',
        date: '9 Oktober 2023',
        description: 'Surat Pencatatan Ciptaan EC00202390619. No Pencatatan: 0005253574.',
        certificateUrl: '/certificates/haki-lofo.pdf',
    },
    {
        id: '5',
        title: 'Memulai Pemrograman dengan Dart',
        issuer: 'Dicoding Indonesia',
        date: '22 November 2023',
        description: 'Sertifikasi Dicoding. ID: 55XE42MKYZRN.',
        certificateUrl: '/certificates/dicoding-dart.pdf',
    },
    {
        id: '6',
        title: 'Belajar Membuat Aplikasi Flutter untuk Pemula',
        issuer: 'Dicoding Indonesia',
        date: '26 Desember 2023',
        description: 'Sertifikasi Dicoding. ID: 0726W86DY2QR.',
        certificateUrl: '/certificates/dicoding-flutter.pdf',
    },
    {
        id: '7',
        title: 'Belajar Prinsip Pemrograman SOLID',
        issuer: 'Dicoding Indonesia',
        date: '08 Januari 2024',
        description: 'Sertifikasi Dicoding. ID: NVP77Q36OPRO.',
        certificateUrl: '/certificates/dicoding-solid.pdf',
    },
    {
        id: '8',
        title: 'Dasar-dasar Desain Pengalaman Pengguna (UX)',
        issuer: 'Google / Coursera',
        date: '26 Desember 2023',
        description: 'Sertifikasi Google UX Design. Verify: coursera.org/verify/HXM2VN7V62R3.',
        certificateUrl: '/certificates/google-ux.pdf',
    },
];
