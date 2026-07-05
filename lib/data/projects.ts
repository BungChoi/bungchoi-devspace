/**
 * ===========================================
 * PROJECTS DATA (Localized)
 * ===========================================
 * Portfolio projects with Indonesian & English translations
 */

import type { Project } from '../types';
import { ls } from '../utils/localization';

export const projects: Project[] = [
    {
        id: 'e-porter',
        title: 'E-Porter',
        subtitle: ls(
            'Flight Ticket & Porter Service',
            'Flight Ticket & Porter Service'
        ),
        description: ls(
            'Aplikasi pemesanan tiket pesawat yang terintegrasi layanan porter dengan dua role (Passenger & Porter) dan antrian porter berbasis FIFO.',
            'Flight ticket booking app integrated with porter services featuring two roles (Passenger & Porter) and FIFO-based porter queue.'
        ),
        longDescription: ls(
            'E-Porter membantu pengguna melakukan pemesanan tiket pesawat dan memanggil porter secara terintegrasi. Di sisi porter, aplikasi menyediakan alur kerja berbasis antrian (FIFO) serta verifikasi layanan menggunakan QR untuk memastikan proses lebih aman dan transparan.',
            'E-Porter helps users book flight tickets and request porter services in an integrated manner. For porters, the app provides a FIFO-based workflow and QR verification to ensure a safer and more transparent process.'
        ),
        image: '/images/projects/e-porter.png',
        tags: ['Flutter', 'Dart', 'GetX', 'Firebase', 'UI/UX Design'],
        githubUrl: 'https://github.com/orangdeso/e-porter',
        featured: true,
        year: 2025,
        timeline: ls('Januari 2025 - Februari 2025', 'January 2025 - February 2025'),
        features: [
            { name: ls('Pemesanan Tiket Pesawat', 'Flight Ticket Booking'), benefit: ls('Passenger dapat membuat transaksi pemesanan tiket dengan alur yang jelas', 'Passengers can create ticket booking transactions with a clear flow') },
            { name: ls('Riwayat Transaksi Tiket', 'Ticket Transaction History'), benefit: ls('Menampilkan histori pemesanan agar pengguna bisa mengecek status dan detail transaksi', 'Displays booking history so users can check status and transaction details') },
            { name: ls('Scan QR Porter', 'Porter QR Scan'), benefit: ls('Porter melakukan verifikasi order menggunakan QR untuk memastikan order valid', 'Porter verifies orders using QR to ensure validity') },
            { name: ls('Antrian Porter (FIFO)', 'Porter Queue (FIFO)'), benefit: ls('Order porter diproses berdasarkan urutan masuk, sehingga layanan lebih fair', 'Porter orders processed by entry order, making service fairer') },
            { name: ls('Riwayat Transaksi Porter', 'Porter Transaction History'), benefit: ls('Porter memiliki histori pekerjaan untuk tracking layanan yang sudah dilakukan', 'Porter has work history for tracking completed services') }
        ]
    },
    {
        id: 'orymu',
        title: 'Orymu',
        description: ls(
            'Aplikasi pendamping membaca (reading companion) untuk mengubah kutipan & ide dari buku menjadi pengetahuan yang bertahan lama.',
            'Reading companion app to transform book quotes & ideas into lasting knowledge.'
        ),
        longDescription: ls(
            'Aplikasi pendamping membaca (reading companion) untuk mengubah kutipan & ide dari buku menjadi pengetahuan yang bertahan lama.',
            'Reading companion app to transform book quotes & ideas into lasting knowledge.'
        ),
        image: '/images/projects/orymu.png',
        tags: ['Flutter', 'Dart', 'BLoC', 'Clean Architecture', 'REST API'],
        featured: true,
        year: 2024,
        timeline: ls('Tahun 2024', 'Year 2024'),
        features: [
            {
                name: ls('Slicing Desain UI', 'UI Design Slicing'),
                benefit: ls('Membangun antarmuka yang responsif dan intuitif.', 'Building responsive and intuitive interface.')
            },
            {
                name: ls('Clean Architecture', 'Clean Architecture'),
                benefit: ls('Mempermudah pemeliharaan kode dan skalabilitas proyek.', 'Easing code maintenance and project scalability.')
            },
            {
                name: ls('BLoC State Management', 'BLoC State Management'),
                benefit: ls('Mengelola state aplikasi dengan alur data yang terprediksi.', 'Managing application state with predictable data flow.')
            },
            {
                name: ls('Integrasi REST API', 'REST API Integration'),
                benefit: ls('Mengkonsumsi layanan backend untuk sinkronisasi data.', 'Consuming backend services for data synchronization.')
            }
        ]
    },
    {
        id: 'e-pkk',
        title: 'E-PKK Kabupaten Nganjuk',
        subtitle: ls('Aplikasi Pengelolaan Data PKK', 'PKK Data Management App'),
        description: ls(
            'Aplikasi mobile terintegrasi website untuk membantu pengelolaan data kegiatan PKK, termasuk upload laporan dan galeri secara terpusat.',
            'Website-integrated mobile app to help manage PKK activity data, including centralized report and gallery uploads.'
        ),
        longDescription: ls(
            'E-PKK adalah aplikasi mobile yang terintegrasi dengan website, dirancang untuk membantu menyelesaikan masalah pengelolaan data kegiatan PKK. Project ini dikerjakan melalui kolaborasi dengan Diskominfo Nganjuk dan PKK Nganjuk, mulai dari tahap riset kebutuhan hingga implementasi aplikasi sesuai desain yang disepakati.',
            'E-PKK is a website-integrated mobile app designed to help solve PKK activity data management problems. This project was done in collaboration with Nganjuk Diskominfo and PKK Nganjuk, from requirements research to app implementation according to agreed designs.'
        ),
        image: '/images/projects/e-pkk.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: true,
        year: 2023,
        timeline: ls('Tahun 2023', 'Year 2023'),
        features: [
            { name: ls('Manajemen Data Kegiatan PKK', 'PKK Activity Data Management'), benefit: ls('Mempermudah pengelolaan dan pendataan aktivitas agar lebih terstruktur', 'Easier activity management and recording for better structure') },
            { name: ls('Upload Laporan', 'Report Upload'), benefit: ls('Pengguna dapat mengunggah laporan kegiatan agar terdokumentasi dan terintegrasi dengan sistem website E-PKK', 'Users can upload activity reports for documentation and E-PKK website system integration') },
            { name: ls('Upload Galeri', 'Gallery Upload'), benefit: ls('Pengguna dapat mengunggah dokumentasi (galeri) kegiatan yang terhubung ke website E-PKK', 'Users can upload activity documentation (gallery) connected to E-PKK website') }
        ]
    },
    {
        id: 'tomatify',
        title: 'Tomatify (Tomato Identify)',
        subtitle: ls('Sistem Monitoring Penyortiran Tomat', 'Tomato Sorting Monitoring System'),
        description: ls(
            'Aplikasi mobile untuk memonitoring penyortiran tomat otomatis yang terintegrasi dengan IoT dan sistem klasifikasi tomat matang/mentah.',
            'Mobile app for monitoring automatic tomato sorting integrated with IoT and ripe/unripe tomato classification system.'
        ),
        longDescription: ls(
            'Tomatify adalah aplikasi mobile untuk memonitoring sistem penyortiran tomat otomatis yang terintegrasi dengan IoT dan sistem cerdas untuk klasifikasi tomat matang/mentah.',
            'Tomatify is a mobile app for monitoring automatic tomato sorting system integrated with IoT and smart system for ripe/unripe tomato classification.'
        ),
        image: '/images/projects/tomatify.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'IoT', 'UI/UX Design'],
        featured: false,
        year: 2023,
        timeline: ls('Tahun 2023', 'Year 2023'),
        features: [
            { name: ls('Monitoring Penyortiran', 'Sorting Monitoring'), benefit: ls('Melihat status dan hasil penyortiran tomat secara real-time', 'View tomato sorting status and results in real-time') },
            { name: ls('Klasifikasi Tomat', 'Tomato Classification'), benefit: ls('Menampilkan hasil klasifikasi tomat matang/mentah', 'Display ripe/unripe tomato classification results') },
            { name: ls('Riwayat Penyortiran', 'Sorting History'), benefit: ls('Melihat histori dan statistik penyortiran', 'View sorting history and statistics') }
        ]
    },
    {
        id: 'cemilku',
        title: 'Cemilku',
        subtitle: ls('Aplikasi UMKM Penjual Kripik', 'Snack Seller MSME App'),
        description: ls(
            'Aplikasi Android terintegrasi website untuk membantu UMKM penjual kripik di Kabupaten Nganjuk mengelola produk dan memantau transaksi.',
            'Website-integrated Android app to help snack seller MSMEs in Nganjuk Regency manage products and monitor transactions.'
        ),
        longDescription: ls(
            'Cemilku adalah aplikasi Android yang terintegrasi dengan website, di mana aplikasi mobile berperan sebagai hak akses penjual/admin untuk UMKM penjual kripik di Kabupaten Nganjuk.',
            'Cemilku is a website-integrated Android app where the mobile app serves as seller/admin access for snack seller MSMEs in Nganjuk Regency.'
        ),
        image: '/images/projects/cemilku.png',
        tags: ['Android', 'Java', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: false,
        year: 2022,
        timeline: ls('Tahun 2022', 'Year 2022'),
        features: [
            { name: ls('Tambah Produk', 'Add Product'), benefit: ls('Penjual dapat menambahkan produk baru melalui mobile sehingga update katalog lebih cepat', 'Sellers can add new products via mobile for faster catalog updates') },
            { name: ls('Riwayat Transaksi', 'Transaction History'), benefit: ls('Penjual/admin bisa memantau aktivitas penjualan dan status transaksi secara terpusat', 'Sellers/admin can monitor sales activity and transaction status centrally') }
        ]
    },
    {
        id: 'siapsadi',
        title: 'SIAPSADI',
        subtitle: ls('Sistem Aplikasi Pemilahan Sampah Digital', 'Digital Waste Sorting Application System'),
        description: ls(
            'UI Slicing project: menerjemahkan desain aplikasi pengelolaan sampah menjadi antarmuka Flutter yang rapi, konsisten, dan reusable (frontend only).',
            'UI Slicing project: translating waste management app design into clean, consistent, and reusable Flutter interface (frontend only).'
        ),
        longDescription: ls(
            'SIAPSADI adalah proyek UI slicing yang berfokus pada penerjemahan desain aplikasi pengelolaan sampah digital ke dalam Flutter. Output utama project ini adalah tampilan UI yang pixel-neat, konsisten, dan disusun dengan komponen reusable.',
            'SIAPSADI is a UI slicing project focused on translating digital waste management app design into Flutter. The main output is pixel-neat, consistent UI built with reusable components.'
        ),
        image: '/images/projects/siapsadi.png',
        tags: ['Flutter', 'Dart', 'Figma', 'UI/UX Implementation'],
        featured: false,
        year: 2023,
        timeline: ls('Tahun 2023', 'Year 2023'),
        features: [
            { name: ls('Splash Screen', 'Splash Screen'), benefit: ls('Menampilkan branding SIAPSADI sebagai screen pembuka aplikasi', 'Displays SIAPSADI branding as app opening screen') },
            { name: ls('Onboarding', 'Onboarding'), benefit: ls('Slide onboarding dengan headline dan navigasi (indikator + tombol lanjut/lewati)', 'Onboarding slides with headline and navigation (indicator + next/skip buttons)') },
            { name: ls('Login Screen', 'Login Screen'), benefit: ls('Form Email & Password dengan opsi login sosial (UI only)', 'Email & Password form with social login option (UI only)') },
            { name: ls('Home / Dashboard', 'Home / Dashboard'), benefit: ls('Header profile, ringkasan Koin, info penjemputan, CTA Tukar Koin, banner, grid menu layanan', 'Profile header, Coin summary, pickup info, Redeem Coin CTA, banner, service menu grid') },
            { name: ls('Info / Promo Page', 'Info / Promo Page'), benefit: ls('Halaman edukasi seperti "Tabung Pakai Sampah Koin" (UI content page)', 'Education page like "Save with Waste Coins" (UI content page)') }
        ]
    },
    {
        id: 'pesantrenqu',
        title: 'PesantrenQu',
        description: ls(
            'PesantrenQu adalah aplikasi digital pesantren yang dirancang untuk membantu pengelolaan aktivitas santri, wali santri, dan lingkungan pesantren dalam satu ekosistem terintegrasi. Aplikasi ini memudahkan proses pemantauan aktivitas santri, pengelolaan keuangan, pembayaran administrasi, serta mendukung kebutuhan ibadah harian secara lebih praktis, aman, dan transparan. Aplikasi ini telah tersedia di Google Play dan dikembangkan untuk memberikan pengalaman digital yang lebih mudah bagi wali santri dalam memantau kebutuhan anak selama berada di pesantren.',
            'PesantrenQu is a digital pesantren application designed to help manage pesantren activities for students, parents, and the pesantren environment within one integrated ecosystem. This application simplifies the process of monitoring student activities, managing finances, paying administrative fees, and supporting daily worship needs more practically, securely, and transparently. The application is available on Google Play and developed to provide a more convenient digital experience for parents in monitoring their child\'s needs while at the pesantren.'
        ),
        longDescription: ls(
            'PesantrenQu adalah aplikasi digital pesantren yang dirancang untuk membantu pengelolaan aktivitas santri, wali santri, dan lingkungan pesantren dalam satu ekosistem terintegrasi. Aplikasi ini memudahkan proses pemantauan aktivitas santri, pengelolaan keuangan, pembayaran administrasi, serta mendukung kebutuhan ibadah harian secara lebih praktis, aman, dan transparan. Aplikasi ini telah tersedia di Google Play dan dikembangkan untuk memberikan pengalaman digital yang lebih mudah bagi wali santri dalam memantau kebutuhan anak selama berada di pesantren.',
            'PesantrenQu is a digital pesantren application designed to help manage pesantren activities for students, parents, and the pesantren environment within one integrated ecosystem. This application simplifies the process of monitoring student activities, managing finances, paying administrative fees, and supporting daily worship needs more practically, securely, and transparently. The application is available on Google Play and developed to provide a more convenient digital experience for parents in monitoring their child\'s needs while at the pesantren.'
        ),
        image: '/images/projects/orymu.png',
        tags: ['Flutter', 'Dart', 'GetX', 'Clean Architecture'],
        featured: true,
        year: 2024,
        timeline: ls('Tahun 2024', 'Year 2024'),
        playStoreUrl: 'https://play.google.com/store/apps/details?id=id.siesta.app.pesantrenqu.v2&hl=id',
        features: [
            {
                name: ls('Pemantauan Aktivitas Santri', 'Student Activity Monitoring'),
                benefit: ls('Wali santri dapat memantau aktivitas dan perkembangan anak di lingkungan pesantren.', 'Parents can monitor their child\'s activities and progress in the pesantren.')
            },
            {
                name: ls('Kirim Uang Bekal Santri', 'Send Student Allowance'),
                benefit: ls('Pengguna dapat mengirim uang bekal santri langsung ke kartu SaQu yang terhubung dengan bank/fintech.', 'Users can send allowance directly to SaQu cards connected to banks/fintechs.')
            },
            {
                name: ls('Pengaturan Limit Jajan Harian', 'Daily Allowance Limits'),
                benefit: ls('Wali santri dapat mengatur batas uang jajan anak agar transaksi lebih terkontrol.', 'Parents can set allowance limits to keep spending controlled.')
            },
            {
                name: ls('Pembayaran Syahriah / SPP', 'Tuition/SPP Payments'),
                benefit: ls('Mendukung pembayaran biaya pesantren secara digital dengan riwayat tercatat otomatis.', 'Supports digital tuition payments with automated history tracking.')
            },
            {
                name: ls('Riwayat Transaksi Keuangan', 'Financial Transaction History'),
                benefit: ls('Menampilkan histori transaksi dan laporan keuangan santri secara transparan.', 'Displays transaction history and financial reports transparently.')
            },
            {
                name: ls('Fitur Islami', 'Islamic Features'),
                benefit: ls('Menyediakan fitur pendukung ibadah harian sebagai pengingat dan pendamping.', 'Provides daily worship support tools as reminders and guides.')
            },
            {
                name: ls('ZISWAF', 'ZISWAF Payments'),
                benefit: ls('Mendukung Zakat, Infaq, Sedekah, dan Wakaf secara lebih mudah.', 'Supports Zakat, Infaq, Alms, and Waqf payments easily.')
            }
        ],
        contributions: [
            ls('Mengembangkan fitur aplikasi mobile menggunakan Flutter dan Dart.', 'Developed mobile application features using Flutter and Dart.'),
            ls('Mengimplementasikan state management dan alur aplikasi menggunakan GetX.', 'Implemented state management and application flow using GetX.'),
            ls('Membangun komponen UI yang responsif dan reusable berdasarkan desain produk.', 'Built responsive and reusable UI components based on the product design.'),
            ls('Mengintegrasikan REST API untuk data santri, transaksi, uang saku, dan fitur terkait pembayaran.', 'Integrated REST API for student data, transactions, allowance, and payment-related features.'),
            ls('Mengimplementasikan struktur clean architecture untuk menjaga codebase tetap scalable dan maintainable.', 'Implemented clean architecture structure to keep the codebase scalable and maintainable.'),
            ls('Menangani proses debugging, peningkatan fitur, dan optimasi aplikasi sebelum rilis.', 'Handled debugging, feature improvements, and app optimization before release.'),
            ls('Mendukung proses rilis hingga aplikasi berhasil dipublikasikan di Google Play.', 'Supported the release process until the application was published on Google Play.')
        ]
    }
];

// Get featured projects only
export const featuredProjects = projects.filter((p) => p.featured);

// Get projects by year
export const getProjectsByYear = (year: number) =>
    projects.filter((p) => p.year === year);
