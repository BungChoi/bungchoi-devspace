/**
 * ===========================================
 * PROJECTS DATA
 * ===========================================
 * Portfolio projects - REAL DATA
 */

import type { Project } from '../types';

export const projects: Project[] = [
    {
        id: 'e-porter',
        title: 'E-Porter',
        subtitle: 'Flight Ticket & Porter Service',
        description: 'Aplikasi pemesanan tiket pesawat yang terintegrasi layanan porter dengan dua role (Passenger & Porter) dan antrian porter berbasis FIFO.',
        image: '/images/projects/e-porter.png',
        tags: ['Flutter', 'Dart', 'GetX', 'Firebase', 'UI/UX Design'],
        githubUrl: 'https://github.com/orangdeso/e-porter',
        featured: true,
        year: 2025,

        // Extended fields
        role: 'Flutter Mobile Developer',
        platform: 'Mobile (Flutter)',
        status: 'Prototype / Portfolio Project',
        team: 'Solo',

        // Overview
        overview: {
            summary: 'E-Porter membantu pengguna melakukan pemesanan tiket pesawat dan, bila dibutuhkan, memanggil porter secara terintegrasi. Di sisi porter, aplikasi menyediakan alur kerja berbasis antrian (FIFO) serta verifikasi layanan menggunakan QR untuk memastikan proses lebih aman dan transparan.',
            context: 'Proses pemesanan tiket dan layanan porter sering berjalan terpisah sehingga status transaksi dan alur layanan kurang terstruktur.',
            goals: [
                'Menyediakan pengalaman booking tiket yang jelas dari awal sampai riwayat transaksi',
                'Menyediakan alur porter yang terarah dari mulai masuk antrian → verifikasi QR → selesai → tercatat',
                'Memastikan fairness layanan porter melalui FIFO queue',
                'Membuat UI yang rapi dan mudah dipahami untuk dua role pengguna yaitu passenger dan jasa porter'
            ],
            targetUsers: {
                primary: 'Passenger: pengguna yang ingin memesan tiket dan (opsional) meminta bantuan porter',
                secondary: 'Porter: petugas yang menerima order layanan sesuai urutan antrian dan melakukan verifikasi QR'
            }
        },

        // Challenges
        challenges: {
            painPoints: [
                'Dua role, dua pengalaman: Passenger dan Porter butuh fitur berbeda, namun tetap dalam satu aplikasi yang konsisten',
                'Queue fairness (FIFO): antrian harus benar-benar mengikuti urutan dan tidak boleh "diserobot"',
                'Verifikasi layanan: perlu cara cepat dan aman untuk memastikan order yang dilayani benar (QR scan)',
                'State & data real-time: status transaksi dan antrian perlu update tanpa membingungkan pengguna'
            ],
            constraints: [
                'Mengutamakan implementasi yang sederhana namun rapi untuk MVP: fokus ke flow inti + reliability',
                'Menghindari UI yang terlalu panjang/berisik: informasi dibuat ringkas tapi tetap informatif'
            ]
        },

        // Solution
        solution: {
            approach: 'Saya membangun aplikasi berbasis role-based access: setelah login, user masuk ke flow sesuai perannya. Seluruh data transaksi dan antrian disusun agar mudah dipantau lewat history dan status yang jelas.',
            keyDecisions: [
                { decision: 'Role-based Flow (Passenger vs Porter)', reason: 'Agar UI tidak bercampur dan user tidak melihat fitur yang bukan haknya' },
                { decision: 'FIFO Queue untuk porter', reason: 'Untuk menjaga fairness: order dilayani berdasarkan urutan masuk' },
                { decision: 'QR Scan untuk verifikasi', reason: 'Untuk mempercepat validasi dan meminimalkan risiko salah order/penyalahgunaan' },
                { decision: 'Firebase sebagai database', reason: 'Memanfaatkan penyimpanan terpusat dan pembaruan data yang responsif untuk MVP' }
            ],
            highlights: [
                'Menggunakan GetX untuk state management (loading, success, empty, error) dan navigasi halaman',
                'Menyusun UI dengan komponen reusable (button, card, list item, badge status)',
                'Empty state & error state yang konsisten',
                'Status transaksi terstruktur: ticket (created → confirmed → completed), porter (waiting → serving → done)'
            ]
        },

        // Contributions
        contributions: [
            'Menyusun layout UI/UX dan mengimplementasikannya di Flutter secara pixel-neat',
            'Membangun flow terpisah untuk Passenger dan Porter (role-based access)',
            'Mengimplementasikan fitur inti: Booking tiket pesawat, riwayat transaksi, layanan porter (QR scan, antrian FIFO)',
            'Integrasi Firebase untuk penyimpanan data transaksi & sinkronisasi status',
            'Menjaga kualitas implementasi: struktur kode rapi, komponen reusable, serta state handling yang konsisten'
        ],

        // Features
        features: [
            { name: 'Pemesanan Tiket Pesawat', benefit: 'Passenger dapat membuat transaksi pemesanan tiket dengan alur yang jelas', techNote: 'Flutter UI + state GetX' },
            { name: 'Riwayat Transaksi Tiket', benefit: 'Menampilkan histori pemesanan agar pengguna bisa mengecek status dan detail transaksi', techNote: 'Data list + empty/loading state yang konsisten' },
            { name: 'Scan QR Porter', benefit: 'Porter melakukan verifikasi order menggunakan QR untuk memastikan order valid', techNote: 'Integrasi QR scanner + validasi data' },
            { name: 'Antrian Porter (FIFO)', benefit: 'Order porter diproses berdasarkan urutan masuk, sehingga layanan lebih fair', techNote: 'Pengurutan berdasarkan waktu/sequence + status order' },
            { name: 'Riwayat Transaksi Porter', benefit: 'Porter memiliki histori pekerjaan untuk tracking layanan yang sudah dilakukan', techNote: 'Filtering berdasarkan role + status' }
        ],

        // Role-based Features
        roleBasedFeatures: {
            'Passenger': [
                'Membuat pemesanan tiket',
                'Melihat riwayat transaksi tiket',
                'Memanggil layanan porter & melihat statusnya'
            ],
            'Porter': [
                'Melihat daftar antrian (FIFO)',
                'Verifikasi layanan melalui QR',
                'Update status layanan & melihat histori pekerjaan'
            ]
        },

        // User Flows
        userFlows: [
            {
                title: 'Passenger Flow',
                steps: [
                    'Login sebagai Passenger',
                    'Pilih/isi kebutuhan pemesanan tiket',
                    'Konfirmasi pemesanan → transaksi tercatat',
                    'Cek status & detail pada Riwayat Transaksi Tiket',
                    '(Jika menggunakan porter) buat request porter → pantau status layanan'
                ]
            },
            {
                title: 'Porter Flow',
                steps: [
                    'Login sebagai Porter',
                    'Lihat Antrian Porter (FIFO)',
                    'Ambil order sesuai urutan',
                    'Verifikasi order via Scan QR',
                    'Selesaikan layanan → order masuk ke Riwayat Transaksi Porter'
                ]
            }
        ],

        // Architecture
        architecture: {
            stack: {
                frontend: 'Flutter + Dart',
                stateManagement: 'GetX',
                backend: 'Firebase',
                tools: ['Figma', 'Git', 'VS Code']
            },
            notes: [
                'Memisahkan bagian UI, state/controller, dan data handling agar codebase lebih mudah dirawat',
                'Setiap fitur memiliki state yang konsisten: loading / success / empty / error',
                'Reusable UI components untuk menjaga konsistensi desain'
            ]
        },

        // Results
        results: {
            outcomes: [
                'MVP berjalan dengan dua role yang jelas (Passenger & Porter)',
                'Fitur inti selesai dan tersambung: Ticket booking + history, Porter queue FIFO + QR verification + history',
                'UX lebih rapi karena setiap flow punya konteks dan status yang mudah dipahami'
            ],
            impact: [
                'Pengguna lebih mudah memahami status transaksi karena ada history dan status yang konsisten',
                'Porter memiliki alur kerja yang lebih terstruktur dan fair melalui sistem FIFO'
            ]
        },

        // Lessons Learned
        lessonsLearned: [
            'Mendesain flow multi-role perlu boundary yang tegas agar UI tidak "campur aduk"',
            'FIFO queue perlu definisi status yang rapi agar tidak terjadi double-claim atau kebingungan urutan',
            'Konsistensi state handling (empty/loading/error) sangat mempengaruhi kesan "produk jadi"'
        ],

        // Next Improvements
        nextImprovements: [
            'Push notification untuk update status transaksi/antrian',
            'Dashboard admin (opsional) untuk memonitor transaksi dan layanan porter',
            'Peningkatan reliability: retry strategy, offline tolerance, dan logging yang lebih baik',
            'Unit test untuk logic antrian dan validasi QR'
        ]
    },
    {
        id: 'orymu',
        title: 'Orymu',
        description: 'Aplikasi pendamping membaca (reading companion) untuk mengubah kutipan & ide dari buku menjadi pengetahuan yang bertahan lama.',
        longDescription: `Aplikasi pendamping membaca (reading companion) untuk mengubah kutipan & ide dari buku menjadi pengetahuan yang bertahan lama.

        Dikembangkan dengan:
        • Slicing desain UI yang responsif & intuitif
        • Pola Clean Architecture
        • State management menggunakan BLoC
        • Integrasi dengan layanan backend melalui konsumsi API`,
        image: '/images/projects/orymu.png',
        tags: ['Flutter', 'Dart', 'BLoC', 'Clean Architecture'],
        featured: true,
        year: 2024,
    },
    {
        id: 'e-pkk',
        title: 'E-PKK Kabupaten Nganjuk',
        subtitle: 'Aplikasi Pengelolaan Data PKK',
        description: 'Aplikasi mobile terintegrasi website untuk membantu pengelolaan data kegiatan PKK, termasuk upload laporan dan galeri secara terpusat.',
        image: '/images/projects/e-pkk.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: true,
        year: 2023,

        // Extended fields
        role: 'Flutter Mobile Developer & UI/UX',
        platform: 'Mobile (Flutter)',
        status: 'Project kolaborasi (Diskominfo Nganjuk & PKK Nganjuk)',
        team: 'Kolaborasi',

        // Overview
        overview: {
            summary: 'E-PKK adalah aplikasi mobile yang terintegrasi dengan website, dirancang untuk membantu menyelesaikan masalah pengelolaan data kegiatan PKK. Project ini dikerjakan melalui kolaborasi dengan Diskominfo Nganjuk dan PKK Nganjuk, mulai dari tahap riset kebutuhan hingga implementasi aplikasi sesuai desain yang disepakati.',
            context: 'Pengelolaan data kegiatan PKK membutuhkan sistem yang lebih terstruktur dan terdigitalisasi agar pelaporan dan dokumentasi kegiatan tidak tercecer.',
            goals: [
                'Memudahkan pengurus/aktor terkait dalam mengelola data kegiatan PKK melalui mobile',
                'Menyediakan fitur upload laporan dan galeri yang langsung terintegrasi dengan website',
                'Membangun aplikasi sesuai kebutuhan pengguna dan desain yang telah disetujui stakeholder'
            ],
            targetUsers: {
                primary: 'Pengguna internal/PKK yang membutuhkan input data kegiatan, laporan, dan dokumentasi secara mobile',
                secondary: 'Stakeholder: Diskominfo Nganjuk & PKK Nganjuk (kolaborasi identifikasi kebutuhan dan validasi solusi)'
            }
        },

        // Challenges
        challenges: {
            painPoints: [
                'Kebutuhan pengguna spesifik domain: aktivitas PKK punya alur dan kebutuhan data yang khas, sehingga perlu riset langsung agar solusi tepat sasaran',
                'Integrasi mobile–website: data yang diinput dari aplikasi harus konsisten dan tersinkron ke website melalui API',
                'Upload konten (laporan & galeri): pengelolaan file/media membutuhkan alur yang jelas (form, validasi, status upload, dan feedback ke user)'
            ],
            constraints: [
                'Implementasi harus mengikuti desain UI yang telah disetujui stakeholder (Diskominfo/PKK)',
                'Mengandalkan kontrak REST API dari backend (PHP + MySQL) sebagai sumber data website dan mobile'
            ]
        },

        // Solution
        solution: {
            approach: 'Saya memulai dengan riset bersama Diskominfo dan PKK untuk mengidentifikasi permasalahan inti, lalu menerjemahkannya menjadi desain UI dan prototipe. Setelah desain disetujui, saya mengembangkan aplikasi menggunakan Flutter & Dart dan menghubungkannya ke website E-PKK melalui REST API.',
            keyDecisions: [
                { decision: 'User-centered design', reason: 'Desain antarmuka dibuat berdasarkan kebutuhan pengguna PKK, bukan asumsi' },
                { decision: 'Integrasi REST API', reason: 'Memastikan mobile menjadi bagian dari ekosistem E-PKK (sinkron dengan website)' },
                { decision: 'Fokus fitur inti', reason: 'Prioritas pada fitur yang paling berdampak untuk operasional—upload laporan dan galeri' }
            ],
            highlights: [
                'Implementasi UI Flutter yang konsisten dengan desain final',
                'Integrasi endpoint untuk proses upload laporan dan galeri agar data masuk ke sistem website E-PKK',
                'State handling yang jelas untuk kebutuhan form (loading, success, error) agar user paham progres input'
            ]
        },

        // Contributions
        contributions: [
            'Melakukan riset bersama stakeholder (Diskominfo & PKK) untuk identifikasi masalah utama',
            'Mendesain antarmuka aplikasi berdasarkan solusi dan kebutuhan pengguna',
            'Mengembangkan aplikasi menggunakan Flutter & Dart sesuai desain yang disetujui',
            'Mengimplementasikan integrasi upload laporan dan galeri terhubung ke website melalui REST API'
        ],

        // Features
        features: [
            { name: 'Manajemen Data Kegiatan PKK', benefit: 'Mempermudah pengelolaan dan pendataan aktivitas agar lebih terstruktur', techNote: 'Mobile ↔ Website sinkronisasi' },
            { name: 'Upload Laporan', benefit: 'Pengguna dapat mengunggah laporan kegiatan agar terdokumentasi dan terintegrasi dengan sistem website E-PKK', techNote: 'REST API integration' },
            { name: 'Upload Galeri', benefit: 'Pengguna dapat mengunggah dokumentasi (galeri) kegiatan yang terhubung ke website E-PKK', techNote: 'Media handling + API' }
        ],

        // User Flows
        userFlows: [
            {
                title: 'Flow Pengelolaan Data',
                steps: [
                    'Pengguna membuka aplikasi dan masuk ke halaman utama',
                    'Pengguna mengakses menu terkait data kegiatan',
                    'Pengguna mengisi/submit data → data tersimpan dan tersinkron ke sistem website via API'
                ]
            },
            {
                title: 'Flow Upload Laporan',
                steps: [
                    'Buka menu Upload Laporan',
                    'Isi informasi yang dibutuhkan',
                    'Submit → sistem mengirim data ke server melalui REST API',
                    'Tampilkan status berhasil/gagal agar user mendapat feedback yang jelas'
                ]
            },
            {
                title: 'Flow Upload Galeri',
                steps: [
                    'Buka menu Galeri',
                    'Pilih media/dokumen',
                    'Upload → terintegrasi ke website E-PKK via REST API',
                    'Data tampil pada sistem (mobile/website) sesuai sinkronisasi'
                ]
            }
        ],

        // Architecture
        architecture: {
            stack: {
                frontend: 'Flutter + Dart',
                backend: 'REST API (PHP) + MySQL',
                tools: ['Figma', 'Git', 'VS Code']
            },
            notes: [
                'Pemisahan komponen UI dan logika integrasi API agar pengembangan lebih mudah dirawat',
                'Menjaga konsistensi state untuk form upload (loading/success/error) agar UX rapi'
            ]
        },

        // Results
        results: {
            outcomes: [
                'Aplikasi mobile berhasil dibangun sesuai desain yang disepakati',
                'Fitur upload laporan dan galeri terintegrasi dengan website E-PKK melalui REST API',
                'Juara 2 TIF Exhibition & Best Poster Expo Pekan Ilmiah Mahasiswa 2023'
            ],
            impact: [
                'Proses dokumentasi dan pelaporan kegiatan menjadi lebih terstruktur karena input dapat dilakukan lewat mobile dan tersimpan terpusat'
            ]
        },

        // Lessons Learned
        lessonsLearned: [
            'Riset langsung dengan stakeholder sangat membantu memastikan fitur yang dibangun benar-benar relevan',
            'Integrasi mobile–website perlu kontrak API yang jelas agar sinkronisasi data stabil',
            'UX upload harus punya feedback yang tegas (progress & error handling) agar user percaya prosesnya'
        ],

        // Next Improvements
        nextImprovements: [
            'Peningkatan UX upload: kompresi media, retry upload, dan indikator progres yang lebih detail',
            'Pencarian/filter data kegiatan agar akses informasi lebih cepat',
            'Role & permission yang lebih granular (jika kebutuhan pengguna bertambah)'
        ]
    },
    {
        id: 'tomatify',
        title: 'Tomatify (Tomato Identify)',
        description: 'Aplikasi mobile untuk memonitoring penyortiran tomat otomatis yang terintegrasi dengan IoT dan sistem klasifikasi tomat matang/mentah.',
        longDescription: `Aplikasi mobile untuk memonitoring penyortiran tomat otomatis yang terintegrasi dengan IoT dan sistem cerdas untuk klasifikasi tomat matang/mentah.

        Kontribusi:
        • Mengumpulkan kebutuhan pengguna melalui wawancara & observasi
        • Membuat desain antarmuka sesuai data kebutuhan pengguna
        • Mengembangkan aplikasi menggunakan Flutter & Dart
        • Integrasi dengan IoT pada sistem penyortiran tomat melalui REST API (PHP) dan MySQL`,
        image: '/images/projects/tomatify.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'IoT', 'UI/UX Design'],
        featured: false,
        year: 2023,
    },
    {
        id: 'cemilku',
        title: 'Cemilku',
        description: 'Aplikasi mobile terintegrasi dengan website untuk UMKM penjual kripik di Kabupaten Nganjuk. Mobile sebagai hak akses penjual/admin.',
        longDescription: `Aplikasi mobile yang terintegrasi dengan website, di mana mobile berperan sebagai hak akses penjual/admin untuk UMKM penjual kripik di Kabupaten Nganjuk.

        Kontribusi:
        • Mengumpulkan kebutuhan pengguna dari mitra UMKM melalui wawancara
        • Membuat desain & prototipe aplikasi berdasarkan kebutuhan pengguna
        • Mengembangkan aplikasi menggunakan Java
        • Fitur hak akses penjual: Tambah Produk dan Riwayat Transaksi yang terintegrasi melalui REST API`,
        image: '/images/projects/cemilku.png',
        tags: ['Android', 'Java', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: false,
        year: 2022,
    },
    {
        id: 'siapsadi',
        title: 'SIAPSADI',
        description: 'Sistem Aplikasi Pemilihan Sampah Digital. Implementasi desain prototipe aplikasi sebagai syarat kelulusan kursus Dicoding.',
        longDescription: `SIAPSADI (Sistem Aplikasi Pemilihan Sampah Digital)

        Implementasi desain prototipe aplikasi menggunakan Flutter sebagai syarat kelulusan kursus Dicoding (Belajar Membuat Aplikasi Flutter untuk Pemula).

        Kontribusi:
        • Membuat desain antarmuka sesuai ketentuan Dicoding menggunakan Figma
        • Mengimplementasikan desain ke dalam aplikasi menggunakan Flutter`,
        image: '/images/projects/siapsadi.png',
        tags: ['Flutter', 'Dart', 'Figma', 'UI/UX Design'],
        featured: false,
        year: 2023,
    },
];

// Get featured projects only
export const featuredProjects = projects.filter((p) => p.featured);

// Get projects by year
export const getProjectsByYear = (year: number) =>
    projects.filter((p) => p.year === year);
