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
        image: '/images/projects/e-porter.png',
        tags: ['Flutter', 'Dart', 'GetX', 'Firebase', 'UI/UX Design'],
        githubUrl: 'https://github.com/orangdeso/e-porter',
        featured: true,
        year: 2025,
        timeline: ls('Januari 2025 - Februari 2025', 'January 2025 - February 2025'),

        // Extended fields
        role: ls('Flutter Mobile Developer', 'Flutter Mobile Developer'),
        platform: ls('Mobile (Flutter)', 'Mobile (Flutter)'),
        status: ls('Prototype / Portfolio Project', 'Prototype / Portfolio Project'),
        team: ls('Solo', 'Solo'),

        // Overview
        overview: {
            summary: ls(
                'E-Porter membantu pengguna melakukan pemesanan tiket pesawat dan, bila dibutuhkan, memanggil porter secara terintegrasi. Di sisi porter, aplikasi menyediakan alur kerja berbasis antrian (FIFO) serta verifikasi layanan menggunakan QR untuk memastikan proses lebih aman dan transparan.',
                'E-Porter helps users book flight tickets and, when needed, request porter services in an integrated manner. For porters, the app provides a FIFO-based workflow and QR verification to ensure a safer and more transparent process.'
            ),
            context: ls(
                'Proses pemesanan tiket dan layanan porter sering berjalan terpisah sehingga status transaksi dan alur layanan kurang terstruktur.',
                'Ticket booking and porter services often run separately, resulting in unstructured transaction status and service flow.'
            ),
            goals: [
                ls('Menyediakan pengalaman booking tiket yang jelas dari awal sampai riwayat transaksi', 'Provide a clear ticket booking experience from start to transaction history'),
                ls('Menyediakan alur porter yang terarah dari mulai masuk antrian → verifikasi QR → selesai → tercatat', 'Provide a directed porter flow from queue entry → QR verification → completion → recorded'),
                ls('Memastikan fairness layanan porter melalui FIFO queue', 'Ensure porter service fairness through FIFO queue'),
                ls('Membuat UI yang rapi dan mudah dipahami untuk dua role pengguna yaitu passenger dan jasa porter', 'Create a clean and easy-to-understand UI for two user roles: passenger and porter service')
            ],
            targetUsers: {
                primary: ls(
                    'Passenger: pengguna yang ingin memesan tiket dan (opsional) meminta bantuan porter',
                    'Passenger: users who want to book tickets and (optionally) request porter assistance'
                ),
                secondary: ls(
                    'Porter: petugas yang menerima order layanan sesuai urutan antrian dan melakukan verifikasi QR',
                    'Porter: staff who receive service orders according to queue order and perform QR verification'
                )
            }
        },

        // Challenges
        challenges: {
            painPoints: [
                ls('Dua role, dua pengalaman: Passenger dan Porter butuh fitur berbeda, namun tetap dalam satu aplikasi yang konsisten', 'Two roles, two experiences: Passenger and Porter need different features, yet within one consistent app'),
                ls('Queue fairness (FIFO): antrian harus benar-benar mengikuti urutan dan tidak boleh "diserobot"', 'Queue fairness (FIFO): the queue must strictly follow order and cannot be "jumped"'),
                ls('Verifikasi layanan: perlu cara cepat dan aman untuk memastikan order yang dilayani benar (QR scan)', 'Service verification: need a quick and secure way to ensure the correct order is served (QR scan)'),
                ls('State & data real-time: status transaksi dan antrian perlu update tanpa membingungkan pengguna', 'Real-time state & data: transaction and queue status need updates without confusing users')
            ],
            constraints: [
                ls('Mengutamakan implementasi yang sederhana namun rapi untuk MVP: fokus ke flow inti + reliability', 'Prioritizing simple yet clean implementation for MVP: focus on core flow + reliability'),
                ls('Menghindari UI yang terlalu panjang/berisik: informasi dibuat ringkas tapi tetap informatif', 'Avoiding overly long/noisy UI: information is kept concise yet informative')
            ]
        },

        // Solution
        solution: {
            approach: ls(
                'Saya membangun aplikasi berbasis role-based access: setelah login, user masuk ke flow sesuai perannya. Seluruh data transaksi dan antrian disusun agar mudah dipantau lewat history dan status yang jelas.',
                'I built the app based on role-based access: after login, users enter the flow according to their role. All transaction and queue data is organized to be easily monitored through history and clear status.'
            ),
            keyDecisions: [
                { decision: ls('Role-based Flow (Passenger vs Porter)', 'Role-based Flow (Passenger vs Porter)'), reason: ls('Agar UI tidak bercampur dan user tidak melihat fitur yang bukan haknya', 'So UI is not mixed and users don\'t see features not meant for them') },
                { decision: ls('FIFO Queue untuk porter', 'FIFO Queue for porter'), reason: ls('Untuk menjaga fairness: order dilayani berdasarkan urutan masuk', 'To maintain fairness: orders served based on entry order') },
                { decision: ls('QR Scan untuk verifikasi', 'QR Scan for verification'), reason: ls('Untuk mempercepat validasi dan meminimalkan risiko salah order/penyalahgunaan', 'To speed up validation and minimize wrong order/misuse risk') },
                { decision: ls('Firebase sebagai database', 'Firebase as database'), reason: ls('Memanfaatkan penyimpanan terpusat dan pembaruan data yang responsif untuk MVP', 'Utilizing centralized storage and responsive data updates for MVP') }
            ],
            highlights: [
                ls('Menggunakan GetX untuk state management (loading, success, empty, error) dan navigasi halaman', 'Using GetX for state management (loading, success, empty, error) and page navigation'),
                ls('Menyusun UI dengan komponen reusable (button, card, list item, badge status)', 'Building UI with reusable components (button, card, list item, status badge)'),
                ls('Empty state & error state yang konsisten', 'Consistent empty state & error state'),
                ls('Status transaksi terstruktur: ticket (created → confirmed → completed), porter (waiting → serving → done)', 'Structured transaction status: ticket (created → confirmed → completed), porter (waiting → serving → done)')
            ]
        },

        // Contributions
        contributions: [
            ls('Menyusun layout UI/UX dan mengimplementasikannya di Flutter secara pixel-neat', 'Designing UI/UX layout and implementing it in Flutter pixel-neat'),
            ls('Membangun flow terpisah untuk Passenger dan Porter (role-based access)', 'Building separate flows for Passenger and Porter (role-based access)'),
            ls('Mengimplementasikan fitur inti: Booking tiket pesawat, riwayat transaksi, layanan porter (QR scan, antrian FIFO)', 'Implementing core features: Flight ticket booking, transaction history, porter service (QR scan, FIFO queue)'),
            ls('Integrasi Firebase untuk penyimpanan data transaksi & sinkronisasi status', 'Firebase integration for transaction data storage & status synchronization'),
            ls('Menjaga kualitas implementasi: struktur kode rapi, komponen reusable, serta state handling yang konsisten', 'Maintaining implementation quality: clean code structure, reusable components, and consistent state handling')
        ],

        // Features
        features: [
            { name: ls('Pemesanan Tiket Pesawat', 'Flight Ticket Booking'), benefit: ls('Passenger dapat membuat transaksi pemesanan tiket dengan alur yang jelas', 'Passengers can create ticket booking transactions with a clear flow'), techNote: 'Flutter UI + state GetX' },
            { name: ls('Riwayat Transaksi Tiket', 'Ticket Transaction History'), benefit: ls('Menampilkan histori pemesanan agar pengguna bisa mengecek status dan detail transaksi', 'Displays booking history so users can check status and transaction details'), techNote: 'Data list + empty/loading state' },
            { name: ls('Scan QR Porter', 'Porter QR Scan'), benefit: ls('Porter melakukan verifikasi order menggunakan QR untuk memastikan order valid', 'Porter verifies orders using QR to ensure validity'), techNote: 'QR scanner + data validation' },
            { name: ls('Antrian Porter (FIFO)', 'Porter Queue (FIFO)'), benefit: ls('Order porter diproses berdasarkan urutan masuk, sehingga layanan lebih fair', 'Porter orders processed by entry order, making service fairer'), techNote: 'Time/sequence ordering + order status' },
            { name: ls('Riwayat Transaksi Porter', 'Porter Transaction History'), benefit: ls('Porter memiliki histori pekerjaan untuk tracking layanan yang sudah dilakukan', 'Porter has work history for tracking completed services'), techNote: 'Role + status filtering' }
        ],

        // Role-based Features
        roleBasedFeatures: {
            'Passenger': [
                ls('Membuat pemesanan tiket', 'Create ticket booking'),
                ls('Melihat riwayat transaksi tiket', 'View ticket transaction history'),
                ls('Memanggil layanan porter & melihat statusnya', 'Request porter service & view its status')
            ],
            'Porter': [
                ls('Melihat daftar antrian (FIFO)', 'View queue list (FIFO)'),
                ls('Verifikasi layanan melalui QR', 'Verify service via QR'),
                ls('Update status layanan & melihat histori pekerjaan', 'Update service status & view work history')
            ]
        },

        // User Flows
        userFlows: [
            {
                title: ls('Passenger Flow', 'Passenger Flow'),
                steps: [
                    ls('Login sebagai Passenger', 'Login as Passenger'),
                    ls('Pilih/isi kebutuhan pemesanan tiket', 'Select/fill ticket booking requirements'),
                    ls('Konfirmasi pemesanan → transaksi tercatat', 'Confirm booking → transaction recorded'),
                    ls('Cek status & detail pada Riwayat Transaksi Tiket', 'Check status & details in Ticket Transaction History'),
                    ls('(Jika menggunakan porter) buat request porter → pantau status layanan', '(If using porter) create porter request → monitor service status')
                ]
            },
            {
                title: ls('Porter Flow', 'Porter Flow'),
                steps: [
                    ls('Login sebagai Porter', 'Login as Porter'),
                    ls('Lihat Antrian Porter (FIFO)', 'View Porter Queue (FIFO)'),
                    ls('Ambil order sesuai urutan', 'Take order according to sequence'),
                    ls('Verifikasi order via Scan QR', 'Verify order via QR Scan'),
                    ls('Selesaikan layanan → order masuk ke Riwayat Transaksi Porter', 'Complete service → order enters Porter Transaction History')
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
                ls('Memisahkan bagian UI, state/controller, dan data handling agar codebase lebih mudah dirawat', 'Separating UI, state/controller, and data handling for easier codebase maintenance'),
                ls('Setiap fitur memiliki state yang konsisten: loading / success / empty / error', 'Each feature has consistent state: loading / success / empty / error'),
                ls('Reusable UI components untuk menjaga konsistensi desain', 'Reusable UI components to maintain design consistency')
            ]
        },

        // Results
        results: {
            outcomes: [
                ls('MVP berjalan dengan dua role yang jelas (Passenger & Porter)', 'MVP runs with two clear roles (Passenger & Porter)'),
                ls('Fitur inti selesai dan tersambung: Ticket booking + history, Porter queue FIFO + QR verification + history', 'Core features completed and connected: Ticket booking + history, Porter queue FIFO + QR verification + history'),
                ls('UX lebih rapi karena setiap flow punya konteks dan status yang mudah dipahami', 'Cleaner UX as each flow has easy-to-understand context and status')
            ],
            impact: [
                ls('Pengguna lebih mudah memahami status transaksi karena ada history dan status yang konsisten', 'Users understand transaction status easier due to consistent history and status'),
                ls('Porter memiliki alur kerja yang lebih terstruktur dan fair melalui sistem FIFO', 'Porter has more structured and fair workflow through FIFO system')
            ]
        },

        // Lessons Learned
        lessonsLearned: [
            ls('Mendesain flow multi-role perlu boundary yang tegas agar UI tidak "campur aduk"', 'Designing multi-role flow needs firm boundaries so UI is not "mixed up"'),
            ls('FIFO queue perlu definisi status yang rapi agar tidak terjadi double-claim atau kebingungan urutan', 'FIFO queue needs clear status definition to prevent double-claim or order confusion'),
            ls('Konsistensi state handling (empty/loading/error) sangat mempengaruhi kesan "produk jadi"', 'Consistent state handling (empty/loading/error) greatly affects "finished product" impression')
        ],

        // Next Improvements
        nextImprovements: [
            ls('Push notification untuk update status transaksi/antrian', 'Push notification for transaction/queue status updates'),
            ls('Dashboard admin (opsional) untuk memonitor transaksi dan layanan porter', 'Admin dashboard (optional) to monitor transactions and porter services'),
            ls('Peningkatan reliability: retry strategy, offline tolerance, dan logging yang lebih baik', 'Reliability improvements: retry strategy, offline tolerance, and better logging'),
            ls('Unit test untuk logic antrian dan validasi QR', 'Unit tests for queue logic and QR validation')
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
            `Aplikasi pendamping membaca (reading companion) untuk mengubah kutipan & ide dari buku menjadi pengetahuan yang bertahan lama.

        Dikembangkan dengan:
        • Slicing desain UI yang responsif & intuitif
        • Pola Clean Architecture
        • State management menggunakan BLoC
        • Integrasi dengan layanan backend melalui konsumsi API`,
            `Reading companion app to transform book quotes & ideas into lasting knowledge.

        Developed with:
        • Responsive & intuitive UI design slicing
        • Clean Architecture pattern
        • State management using BLoC
        • Integration with backend services via API consumption`
        ),
        image: '/images/projects/orymu.png',
        tags: ['Flutter', 'Dart', 'BLoC', 'Clean Architecture'],
        featured: true,
        year: 2024,
    },
    {
        id: 'e-pkk',
        title: 'E-PKK Kabupaten Nganjuk',
        subtitle: ls('Aplikasi Pengelolaan Data PKK', 'PKK Data Management App'),
        description: ls(
            'Aplikasi mobile terintegrasi website untuk membantu pengelolaan data kegiatan PKK, termasuk upload laporan dan galeri secara terpusat.',
            'Website-integrated mobile app to help manage PKK activity data, including centralized report and gallery uploads.'
        ),
        image: '/images/projects/e-pkk.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: true,
        year: 2023,

        // Extended fields
        role: ls('Flutter Mobile Developer & UI/UX', 'Flutter Mobile Developer & UI/UX'),
        platform: ls('Mobile (Flutter)', 'Mobile (Flutter)'),
        status: ls('Project kolaborasi (Diskominfo Nganjuk & PKK Nganjuk)', 'Collaboration project (Nganjuk Diskominfo & PKK Nganjuk)'),
        team: ls('Kolaborasi', 'Collaboration'),

        // Overview
        overview: {
            summary: ls(
                'E-PKK adalah aplikasi mobile yang terintegrasi dengan website, dirancang untuk membantu menyelesaikan masalah pengelolaan data kegiatan PKK. Project ini dikerjakan melalui kolaborasi dengan Diskominfo Nganjuk dan PKK Nganjuk, mulai dari tahap riset kebutuhan hingga implementasi aplikasi sesuai desain yang disepakati.',
                'E-PKK is a website-integrated mobile app designed to help solve PKK activity data management problems. This project was done in collaboration with Nganjuk Diskominfo and PKK Nganjuk, from requirements research to app implementation according to agreed designs.'
            ),
            context: ls(
                'Pengelolaan data kegiatan PKK membutuhkan sistem yang lebih terstruktur dan terdigitalisasi agar pelaporan dan dokumentasi kegiatan tidak tercecer.',
                'PKK activity data management needs a more structured and digitalized system so that reporting and documentation are not scattered.'
            ),
            goals: [
                ls('Memudahkan pengurus/aktor terkait dalam mengelola data kegiatan PKK melalui mobile', 'Make it easier for administrators/stakeholders to manage PKK activity data via mobile'),
                ls('Menyediakan fitur upload laporan dan galeri yang langsung terintegrasi dengan website', 'Provide report and gallery upload features directly integrated with the website'),
                ls('Membangun aplikasi sesuai kebutuhan pengguna dan desain yang telah disetujui stakeholder', 'Build the app according to user needs and stakeholder-approved designs')
            ],
            targetUsers: {
                primary: ls(
                    'Pengguna internal/PKK yang membutuhkan input data kegiatan, laporan, dan dokumentasi secara mobile',
                    'Internal/PKK users who need to input activity data, reports, and documentation via mobile'
                ),
                secondary: ls(
                    'Stakeholder: Diskominfo Nganjuk & PKK Nganjuk (kolaborasi identifikasi kebutuhan dan validasi solusi)',
                    'Stakeholders: Nganjuk Diskominfo & PKK Nganjuk (collaboration for requirements identification and solution validation)'
                )
            }
        },

        // Challenges
        challenges: {
            painPoints: [
                ls('Kebutuhan pengguna spesifik domain: aktivitas PKK punya alur dan kebutuhan data yang khas, sehingga perlu riset langsung agar solusi tepat sasaran', 'Domain-specific user needs: PKK activities have unique flows and data needs, requiring direct research for targeted solutions'),
                ls('Integrasi mobile–website: data yang diinput dari aplikasi harus konsisten dan tersinkron ke website melalui API', 'Mobile-website integration: data input from app must be consistent and synced to website via API'),
                ls('Upload konten (laporan & galeri): pengelolaan file/media membutuhkan alur yang jelas (form, validasi, status upload, dan feedback ke user)', 'Content upload (reports & gallery): file/media management needs clear flow (form, validation, upload status, and user feedback)')
            ],
            constraints: [
                ls('Implementasi harus mengikuti desain UI yang telah disetujui stakeholder (Diskominfo/PKK)', 'Implementation must follow stakeholder-approved UI design (Diskominfo/PKK)'),
                ls('Mengandalkan kontrak REST API dari backend (PHP + MySQL) sebagai sumber data website dan mobile', 'Relying on REST API contract from backend (PHP + MySQL) as data source for website and mobile')
            ]
        },

        // Solution
        solution: {
            approach: ls(
                'Saya memulai dengan riset bersama Diskominfo dan PKK untuk mengidentifikasi permasalahan inti, lalu menerjemahkannya menjadi desain UI dan prototipe. Setelah desain disetujui, saya mengembangkan aplikasi menggunakan Flutter & Dart dan menghubungkannya ke website E-PKK melalui REST API.',
                'I started with research together with Diskominfo and PKK to identify core problems, then translated them into UI design and prototype. After design approval, I developed the app using Flutter & Dart and connected it to E-PKK website via REST API.'
            ),
            keyDecisions: [
                { decision: ls('User-centered design', 'User-centered design'), reason: ls('Desain antarmuka dibuat berdasarkan kebutuhan pengguna PKK, bukan asumsi', 'Interface design based on PKK user needs, not assumptions') },
                { decision: ls('Integrasi REST API', 'REST API integration'), reason: ls('Memastikan mobile menjadi bagian dari ekosistem E-PKK (sinkron dengan website)', 'Ensuring mobile becomes part of E-PKK ecosystem (synced with website)') },
                { decision: ls('Fokus fitur inti', 'Focus on core features'), reason: ls('Prioritas pada fitur yang paling berdampak untuk operasional—upload laporan dan galeri', 'Priority on most impactful features for operations—report and gallery upload') }
            ],
            highlights: [
                ls('Implementasi UI Flutter yang konsisten dengan desain final', 'Flutter UI implementation consistent with final design'),
                ls('Integrasi endpoint untuk proses upload laporan dan galeri agar data masuk ke sistem website E-PKK', 'Endpoint integration for report and gallery upload process so data enters E-PKK website system'),
                ls('State handling yang jelas untuk kebutuhan form (loading, success, error) agar user paham progres input', 'Clear state handling for form needs (loading, success, error) so users understand input progress')
            ]
        },

        // Contributions
        contributions: [
            ls('Melakukan riset bersama stakeholder (Diskominfo & PKK) untuk identifikasi masalah utama', 'Conducted research with stakeholders (Diskominfo & PKK) to identify main problems'),
            ls('Mendesain antarmuka aplikasi berdasarkan solusi dan kebutuhan pengguna', 'Designed app interface based on solutions and user needs'),
            ls('Mengembangkan aplikasi menggunakan Flutter & Dart sesuai desain yang disetujui', 'Developed app using Flutter & Dart according to approved design'),
            ls('Mengimplementasikan integrasi upload laporan dan galeri terhubung ke website melalui REST API', 'Implemented report and gallery upload integration connected to website via REST API')
        ],

        // Features
        features: [
            { name: ls('Manajemen Data Kegiatan PKK', 'PKK Activity Data Management'), benefit: ls('Mempermudah pengelolaan dan pendataan aktivitas agar lebih terstruktur', 'Easier activity management and recording for better structure'), techNote: 'Mobile ↔ Website sync' },
            { name: ls('Upload Laporan', 'Report Upload'), benefit: ls('Pengguna dapat mengunggah laporan kegiatan agar terdokumentasi dan terintegrasi dengan sistem website E-PKK', 'Users can upload activity reports for documentation and E-PKK website system integration'), techNote: 'REST API integration' },
            { name: ls('Upload Galeri', 'Gallery Upload'), benefit: ls('Pengguna dapat mengunggah dokumentasi (galeri) kegiatan yang terhubung ke website E-PKK', 'Users can upload activity documentation (gallery) connected to E-PKK website'), techNote: 'Media handling + API' }
        ],

        // User Flows
        userFlows: [
            {
                title: ls('Flow Pengelolaan Data', 'Data Management Flow'),
                steps: [
                    ls('Pengguna membuka aplikasi dan masuk ke halaman utama', 'User opens app and enters main page'),
                    ls('Pengguna mengakses menu terkait data kegiatan', 'User accesses activity data related menu'),
                    ls('Pengguna mengisi/submit data → data tersimpan dan tersinkron ke sistem website via API', 'User fills/submits data → data saved and synced to website system via API')
                ]
            },
            {
                title: ls('Flow Upload Laporan', 'Report Upload Flow'),
                steps: [
                    ls('Buka menu Upload Laporan', 'Open Report Upload menu'),
                    ls('Isi informasi yang dibutuhkan', 'Fill required information'),
                    ls('Submit → sistem mengirim data ke server melalui REST API', 'Submit → system sends data to server via REST API'),
                    ls('Tampilkan status berhasil/gagal agar user mendapat feedback yang jelas', 'Display success/failure status for clear user feedback')
                ]
            },
            {
                title: ls('Flow Upload Galeri', 'Gallery Upload Flow'),
                steps: [
                    ls('Buka menu Galeri', 'Open Gallery menu'),
                    ls('Pilih media/dokumen', 'Select media/document'),
                    ls('Upload → terintegrasi ke website E-PKK via REST API', 'Upload → integrated to E-PKK website via REST API'),
                    ls('Data tampil pada sistem (mobile/website) sesuai sinkronisasi', 'Data appears on system (mobile/website) according to sync')
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
                ls('Pemisahan komponen UI dan logika integrasi API agar pengembangan lebih mudah dirawat', 'Separation of UI components and API integration logic for easier development maintenance'),
                ls('Menjaga konsistensi state untuk form upload (loading/success/error) agar UX rapi', 'Maintaining consistent state for upload form (loading/success/error) for clean UX')
            ]
        },

        // Results
        results: {
            outcomes: [
                ls('Aplikasi mobile berhasil dibangun sesuai desain yang disepakati', 'Mobile app successfully built according to agreed design'),
                ls('Fitur upload laporan dan galeri terintegrasi dengan website E-PKK melalui REST API', 'Report and gallery upload features integrated with E-PKK website via REST API'),
                ls('Juara 2 TIF Exhibition & Best Poster Expo Pekan Ilmiah Mahasiswa 2023', '2nd Place TIF Exhibition & Best Poster Expo at Pekan Ilmiah Mahasiswa 2023')
            ],
            impact: [
                ls('Proses dokumentasi dan pelaporan kegiatan menjadi lebih terstruktur karena input dapat dilakukan lewat mobile dan tersimpan terpusat', 'Activity documentation and reporting process becomes more structured as input can be done via mobile and stored centrally')
            ]
        },

        // Lessons Learned
        lessonsLearned: [
            ls('Riset langsung dengan stakeholder sangat membantu memastikan fitur yang dibangun benar-benar relevan', 'Direct research with stakeholders greatly helps ensure built features are truly relevant'),
            ls('Integrasi mobile–website perlu kontrak API yang jelas agar sinkronisasi data stabil', 'Mobile-website integration needs clear API contract for stable data synchronization'),
            ls('UX upload harus punya feedback yang tegas (progress & error handling) agar user percaya prosesnya', 'Upload UX must have firm feedback (progress & error handling) for user trust in the process')
        ],

        // Next Improvements
        nextImprovements: [
            ls('Peningkatan UX upload: kompresi media, retry upload, dan indikator progres yang lebih detail', 'Upload UX improvements: media compression, upload retry, and more detailed progress indicator'),
            ls('Pencarian/filter data kegiatan agar akses informasi lebih cepat', 'Activity data search/filter for faster information access'),
            ls('Role & permission yang lebih granular (jika kebutuhan pengguna bertambah)', 'More granular role & permission (if user needs increase)')
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
        image: '/images/projects/tomatify.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'IoT', 'UI/UX Design'],
        featured: false,
        year: 2023,

        // Extended fields
        role: ls('Flutter Developer & UI/UX', 'Flutter Developer & UI/UX'),
        platform: ls('Mobile (Flutter)', 'Mobile (Flutter)'),
        status: ls('IoT Integration Project', 'IoT Integration Project'),
        team: ls('Team', 'Team'),

        // Overview
        overview: {
            summary: ls(
                'Tomatify adalah aplikasi mobile untuk memonitoring sistem penyortiran tomat otomatis yang terintegrasi dengan IoT dan sistem cerdas untuk klasifikasi tomat matang/mentah.',
                'Tomatify is a mobile app for monitoring automatic tomato sorting system integrated with IoT and smart system for ripe/unripe tomato classification.'
            ),
            context: ls(
                'Proses penyortiran tomat secara manual memakan waktu dan tidak konsisten. Diperlukan sistem otomatis dengan monitoring real-time.',
                'Manual tomato sorting process is time-consuming and inconsistent. An automatic system with real-time monitoring is needed.'
            ),
            goals: [
                ls('Menyediakan monitoring real-time untuk sistem penyortiran tomat', 'Provide real-time monitoring for tomato sorting system'),
                ls('Menampilkan hasil klasifikasi tomat matang/mentah', 'Display ripe/unripe tomato classification results'),
                ls('Integrasi dengan perangkat IoT pada sistem penyortiran', 'Integration with IoT devices on sorting system')
            ]
        },

        // Challenges
        challenges: {
            painPoints: [
                ls('Integrasi mobile dengan sistem IoT membutuhkan protokol komunikasi yang tepat', 'Mobile integration with IoT system requires proper communication protocol'),
                ls('Real-time monitoring memerlukan penanganan data streaming yang efisien', 'Real-time monitoring requires efficient data streaming handling'),
                ls('UI harus informatif namun tetap mudah dipahami pengguna', 'UI must be informative yet easy for users to understand')
            ],
            constraints: [
                ls('Bergantung pada ketersediaan dan stabilitas koneksi dengan perangkat IoT', 'Depends on availability and stability of connection with IoT device'),
                ls('Backend menggunakan REST API (PHP) dengan database MySQL', 'Backend uses REST API (PHP) with MySQL database')
            ]
        },

        // Solution
        solution: {
            approach: ls(
                'Saya memulai dengan mengumpulkan kebutuhan pengguna melalui wawancara dan observasi, lalu mendesain antarmuka yang user-friendly. Aplikasi dikembangkan dengan Flutter dan diintegrasikan dengan sistem IoT melalui REST API.',
                'I started by gathering user needs through interviews and observation, then designed a user-friendly interface. The app was developed with Flutter and integrated with IoT system via REST API.'
            ),
            keyDecisions: [
                { decision: ls('User-centered design', 'User-centered design'), reason: ls('Desain berbasis kebutuhan nyata dari hasil wawancara dan observasi', 'Design based on real needs from interviews and observation') },
                { decision: ls('REST API integration', 'REST API integration'), reason: ls('Standar komunikasi dengan backend dan perangkat IoT', 'Standard communication with backend and IoT device') },
                { decision: ls('Real-time data display', 'Real-time data display'), reason: ls('Monitoring status penyortiran secara langsung', 'Direct sorting status monitoring') }
            ]
        },

        // Contributions
        contributions: [
            ls('Mengumpulkan kebutuhan pengguna melalui wawancara & observasi', 'Gathering user needs through interviews & observation'),
            ls('Membuat desain antarmuka sesuai data kebutuhan pengguna', 'Creating interface design according to user needs data'),
            ls('Mengembangkan aplikasi menggunakan Flutter & Dart', 'Developing app using Flutter & Dart'),
            ls('Integrasi dengan IoT pada sistem penyortiran tomat melalui REST API', 'Integration with IoT on tomato sorting system via REST API')
        ],

        // Features
        features: [
            { name: ls('Monitoring Penyortiran', 'Sorting Monitoring'), benefit: ls('Melihat status dan hasil penyortiran tomat secara real-time', 'View tomato sorting status and results in real-time'), techNote: 'REST API + IoT' },
            { name: ls('Klasifikasi Tomat', 'Tomato Classification'), benefit: ls('Menampilkan hasil klasifikasi tomat matang/mentah', 'Display ripe/unripe tomato classification results'), techNote: 'IoT sensor data' },
            { name: ls('Riwayat Penyortiran', 'Sorting History'), benefit: ls('Melihat histori dan statistik penyortiran', 'View sorting history and statistics'), techNote: 'MySQL database' }
        ],

        // Architecture
        architecture: {
            stack: {
                frontend: 'Flutter + Dart',
                backend: 'REST API (PHP) + MySQL',
                tools: ['Figma', 'Git', 'VS Code']
            },
            notes: [
                ls('Integrasi dengan sistem IoT untuk data penyortiran', 'Integration with IoT system for sorting data'),
                ls('State management untuk real-time data updates', 'State management for real-time data updates')
            ]
        },

        // Results
        results: {
            outcomes: [
                ls('Aplikasi berhasil terintegrasi dengan sistem IoT penyortiran tomat', 'App successfully integrated with tomato sorting IoT system'),
                ls('Monitoring real-time berjalan dengan baik', 'Real-time monitoring works well')
            ]
        },

        // Lessons Learned
        lessonsLearned: [
            ls('Integrasi IoT memerlukan penanganan error dan retry yang baik', 'IoT integration requires good error handling and retry'),
            ls('Real-time UI updates perlu optimasi agar tidak membebani performa', 'Real-time UI updates need optimization to not burden performance'),
            ls('Riset pengguna membantu menentukan informasi yang paling penting ditampilkan', 'User research helps determine most important information to display')
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
        image: '/images/projects/cemilku.png',
        tags: ['Android', 'Java', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: false,
        year: 2022,

        // Extended fields
        role: ls('Android Developer & UI/UX', 'Android Developer & UI/UX'),
        platform: ls('Mobile (Android)', 'Mobile (Android)'),
        status: ls('Mobile Apps (Terintegrasi Website)', 'Mobile Apps (Website Integrated)'),
        team: ls('Team', 'Team'),

        // Overview
        overview: {
            summary: ls(
                'Cemilku adalah aplikasi Android yang terintegrasi dengan website, di mana aplikasi mobile berperan sebagai hak akses penjual/admin untuk UMKM penjual kripik di Kabupaten Nganjuk.',
                'Cemilku is a website-integrated Android app where the mobile app serves as seller/admin access for snack seller MSMEs in Nganjuk Regency.'
            ),
            context: ls(
                'UMKM membutuhkan cara yang lebih cepat dan sederhana untuk mengelola data produk dan transaksi, terutama ketika aktivitas operasional dilakukan di lapangan.',
                'MSMEs need a faster and simpler way to manage product and transaction data, especially when operational activities are done in the field.'
            ),
            goals: [
                ls('Menyediakan akses mobile untuk penjual/admin yang tetap terhubung dengan website', 'Provide mobile access for sellers/admins that stays connected to website'),
                ls('Memudahkan pengelolaan produk melalui fitur tambah produk', 'Ease product management through add product feature'),
                ls('Memudahkan pemantauan transaksi melalui fitur riwayat transaksi', 'Ease transaction monitoring through transaction history feature'),
                ls('Membangun UI yang mudah dipahami untuk kebutuhan pengguna UMKM', 'Build easy-to-understand UI for MSME user needs')
            ],
            targetUsers: {
                primary: ls(
                    'Penjual UMKM: mengelola produk dan memantau transaksi dari mobile',
                    'MSME sellers: manage products and monitor transactions from mobile'
                ),
                secondary: ls(
                    'Admin: memantau/menangani data sesuai kebutuhan operasional',
                    'Admin: monitor/handle data according to operational needs'
                )
            }
        },

        // Challenges
        challenges: {
            painPoints: [
                ls('Kebutuhan user lapangan: flow harus sederhana dan cepat dipahami oleh pengguna UMKM', 'Field user needs: flow must be simple and quickly understood by MSME users'),
                ls('Integrasi mobile ↔ website: data produk/transaksi harus konsisten', 'Mobile ↔ website integration: product/transaction data must be consistent'),
                ls('Pengalaman input data: proses tambah produk membutuhkan validasi dan feedback yang jelas', 'Data input experience: add product process needs clear validation and feedback')
            ],
            constraints: [
                ls('Bergantung pada kontrak REST API (PHP) dan struktur database MySQL', 'Depends on REST API contract (PHP) and MySQL database structure'),
                ls('Aplikasi perlu tetap nyaman digunakan pada kondisi jaringan tidak stabil', 'App needs to remain comfortable to use on unstable network conditions')
            ]
        },

        // Solution
        solution: {
            approach: ls(
                'Saya memulai dengan wawancara mitra UMKM untuk memahami kebutuhan dan kebiasaan kerja mereka. Dari hasil itu, saya menyusun desain dan prototipe sebagai acuan UI/UX. Setelah desain disepakati, saya mengembangkan aplikasi menggunakan Android (Java) dan menghubungkannya ke website melalui REST API.',
                'I started with interviews with MSME partners to understand their needs and work habits. From the results, I created design and prototype as UI/UX reference. After design agreement, I developed the app using Android (Java) and connected it to website via REST API.'
            ),
            keyDecisions: [
                { decision: ls('User-centered design', 'User-centered design'), reason: ls('Desain dibuat berbasis kebutuhan nyata dari hasil wawancara', 'Design based on real needs from interview results') },
                { decision: ls('API-driven integration', 'API-driven integration'), reason: ls('Seluruh data penting diambil/dikirim lewat REST API agar sinkron dengan website', 'All important data retrieved/sent via REST API to sync with website') },
                { decision: ls('State & feedback yang jelas', 'Clear state & feedback'), reason: ls('Setiap aksi penting memiliki indikator loading/success/error', 'Every important action has loading/success/error indicator') }
            ],
            highlights: [
                ls('Implementasi UI Android sesuai prototipe', 'Android UI implementation according to prototype'),
                ls('Integrasi endpoint REST API untuk Tambah Produk dan Riwayat Transaksi', 'REST API endpoint integration for Add Product and Transaction History'),
                ls('Penanganan state dasar untuk UX (loading, empty, error)', 'Basic state handling for UX (loading, empty, error)')
            ]
        },

        // Contributions
        contributions: [
            ls('Mengumpulkan kebutuhan pengguna melalui wawancara dengan mitra UMKM penjual kripik', 'Gathering user needs through interviews with snack seller MSME partners'),
            ls('Menyusun desain dan prototipe aplikasi berdasarkan kebutuhan yang ditemukan', 'Creating app design and prototype based on found needs'),
            ls('Mengembangkan aplikasi Android menggunakan Java', 'Developing Android app using Java'),
            ls('Membangun fitur hak akses penjual/admin: Tambah Produk dan Riwayat Transaksi', 'Building seller/admin access features: Add Product and Transaction History'),
            ls('Mengintegrasikan aplikasi dengan website melalui REST API (PHP) dan MySQL', 'Integrating app with website via REST API (PHP) and MySQL')
        ],

        // Features
        features: [
            { name: ls('Tambah Produk', 'Add Product'), benefit: ls('Penjual dapat menambahkan produk baru melalui mobile sehingga update katalog lebih cepat', 'Sellers can add new products via mobile for faster catalog updates'), techNote: 'Form input + validation + REST API' },
            { name: ls('Riwayat Transaksi', 'Transaction History'), benefit: ls('Penjual/admin bisa memantau aktivitas penjualan dan status transaksi secara terpusat', 'Sellers/admin can monitor sales activity and transaction status centrally'), techNote: 'List view with state handling' }
        ],

        // User Flows
        userFlows: [
            {
                title: ls('Flow Tambah Produk', 'Add Product Flow'),
                steps: [
                    ls('Login sebagai penjual/admin', 'Login as seller/admin'),
                    ls('Buka menu Tambah Produk', 'Open Add Product menu'),
                    ls('Isi data produk → submit', 'Fill product data → submit'),
                    ls('Aplikasi mengirim data ke server via REST API', 'App sends data to server via REST API'),
                    ls('Tampilkan status berhasil/gagal', 'Display success/failure status')
                ]
            },
            {
                title: ls('Flow Riwayat Transaksi', 'Transaction History Flow'),
                steps: [
                    ls('Login sebagai penjual/admin', 'Login as seller/admin'),
                    ls('Buka menu Riwayat Transaksi', 'Open Transaction History menu'),
                    ls('Aplikasi mengambil data transaksi via REST API', 'App fetches transaction data via REST API'),
                    ls('Tampilkan daftar transaksi dengan state handling', 'Display transaction list with state handling')
                ]
            }
        ],

        // Architecture
        architecture: {
            stack: {
                frontend: 'Android (Java)',
                backend: 'REST API (PHP) + MySQL',
                tools: ['Figma', 'Android Studio', 'Git']
            },
            notes: [
                ls('Pemisahan logic request API dari UI untuk memudahkan maintenance', 'Separation of API request logic from UI for easier maintenance'),
                ls('Handling state (loading/empty/error) agar pengalaman pengguna terasa produk', 'State handling (loading/empty/error) for product-like user experience')
            ]
        },

        // Results
        results: {
            outcomes: [
                ls('Aplikasi mobile Cemilku berhasil dibangun sebagai hak akses penjual/admin', 'Cemilku mobile app successfully built as seller/admin access'),
                ls('Fitur inti berjalan dan tersinkron melalui REST API', 'Core features work and synced via REST API')
            ],
            impact: [
                ls('Penjual dapat mengelola produk dan memantau transaksi lebih praktis via mobile', 'Sellers can manage products and monitor transactions more practically via mobile'),
                ls('Proses operasional lebih cepat karena update data tidak bergantung pada akses website', 'Faster operational process as data updates don\'t depend on website access')
            ]
        },

        // Lessons Learned
        lessonsLearned: [
            ls('Wawancara pengguna membantu menentukan prioritas fitur yang benar-benar dipakai', 'User interviews help determine priority of features actually used'),
            ls('Integrasi mobile–website membutuhkan kontrak API yang jelas dan konsisten', 'Mobile-website integration needs clear and consistent API contract'),
            ls('UX form (tambah produk) harus punya feedback yang tegas agar user percaya prosesnya', 'Form UX (add product) must have firm feedback for user trust in the process')
        ],

        // Next Improvements
        nextImprovements: [
            ls('Edit/hapus produk + manajemen stok', 'Edit/delete product + stock management'),
            ls('Filter/pencarian pada riwayat transaksi', 'Filter/search on transaction history'),
            ls('Notifikasi status transaksi', 'Transaction status notification'),
            ls('Peningkatan reliability: retry, timeout handling, dan caching', 'Reliability improvements: retry, timeout handling, and caching')
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
        image: '/images/projects/siapsadi.png',
        tags: ['Flutter', 'Dart', 'Figma', 'UI/UX Implementation'],
        featured: false,
        year: 2023,

        // Extended fields
        role: ls('Flutter Developer (UI Slicing)', 'Flutter Developer (UI Slicing)'),
        platform: ls('Mobile (Flutter)', 'Mobile (Flutter)'),
        status: ls('Frontend Only / UI Prototype', 'Frontend Only / UI Prototype'),
        team: ls('Solo', 'Solo'),

        // Overview
        overview: {
            summary: ls(
                'SIAPSADI adalah proyek UI slicing yang berfokus pada penerjemahan desain aplikasi pengelolaan sampah digital ke dalam Flutter. Output utama project ini adalah tampilan UI yang pixel-neat, konsisten, dan disusun dengan komponen reusable. Project ini tidak mencakup backend—data yang tampil menggunakan dummy/mock data.',
                'SIAPSADI is a UI slicing project focused on translating digital waste management app design into Flutter. The main output is pixel-neat, consistent UI built with reusable components. This project doesn\'t include backend—displayed data uses dummy/mock data.'
            ),
            context: ls(
                'Aplikasi SIAPSADI menampilkan konsep layanan pengelolaan sampah berbasis digital: onboarding, login, dan dashboard yang menonjolkan poin/koin, informasi penjemputan, promo/banner, serta menu layanan dalam bentuk grid.',
                'SIAPSADI app shows digital-based waste management service concept: onboarding, login, and dashboard highlighting points/coins, pickup info, promo/banner, and service menu in grid form.'
            ),
            goals: [
                ls('Mengimplementasikan desain UI ke Flutter dengan hasil yang rapi dan konsisten', 'Implement UI design to Flutter with clean and consistent results'),
                ls('Menyusun komponen UI yang bisa dipakai ulang (buttons, cards, menu items, banner)', 'Build reusable UI components (buttons, cards, menu items, banner)'),
                ls('Membuat struktur halaman yang jelas agar mudah dikembangkan jika ditambah backend', 'Create clear page structure for easy development if backend is added')
            ]
        },

        // Challenges
        challenges: {
            painPoints: [
                ls('Menjaga konsistensi spacing, typography, dan radius di banyak layar', 'Maintaining consistency of spacing, typography, and radius across many screens'),
                ls('Membuat dashboard yang padat informasi tetap terasa rapi (card + banner + grid menu)', 'Making information-dense dashboard still feel clean (card + banner + grid menu)'),
                ls('Menghindari duplikasi widget dengan memecah UI menjadi komponen reusable', 'Avoiding widget duplication by breaking UI into reusable components'),
                ls('Membuat layout tetap nyaman di berbagai ukuran layar (responsiveness dasar)', 'Making layout comfortable across various screen sizes (basic responsiveness)')
            ],
            constraints: [
                ls('Fokus pada UI slicing (frontend only)', 'Focus on UI slicing (frontend only)'),
                ls('Data menggunakan dummy/mock untuk kebutuhan prototipe', 'Data uses dummy/mock for prototype needs')
            ]
        },

        // Solution
        solution: {
            approach: ls(
                'Saya memecah UI menjadi beberapa screen utama lalu menyusun design system mini (style teks, padding, komponen card/button) agar tampilan konsisten. Data yang tampil menggunakan dummy/mock supaya fokus tetap pada kualitas UI.',
                'I broke down UI into several main screens then built a mini design system (text style, padding, card/button components) for consistent look. Displayed data uses dummy/mock to keep focus on UI quality.'
            ),
            keyDecisions: [
                { decision: ls('Reusable Components', 'Reusable Components'), reason: ls('Untuk elemen berulang: profile header card, coin/point card, primary button, menu grid item, promo/banner card', 'For recurring elements: profile header card, coin/point card, primary button, menu grid item, promo/banner card') },
                { decision: ls('Design system mini', 'Mini design system'), reason: ls('Menetapkan ukuran teks, spacing, radius agar konsisten di semua screen', 'Setting text size, spacing, radius to be consistent across all screens') },
                { decision: ls('State UI dasar', 'Basic UI state'), reason: ls('Loading placeholder/skeleton dan empty state untuk section list', 'Loading placeholder/skeleton and empty state for list sections') }
            ],
            highlights: [
                ls('Implementasi UI dari desain menjadi Flutter (pixel-neat)', 'UI implementation from design to Flutter (pixel-neat)'),
                ls('Komponen reusable agar UI konsisten dan mudah dirawat', 'Reusable components for consistent and maintainable UI'),
                ls('Layout dashboard (card + banner + grid menu) yang terstruktur', 'Structured dashboard layout (card + banner + grid menu)'),
                ls('Navigasi UI-level antar halaman (onboarding → login → home)', 'UI-level navigation between pages (onboarding → login → home)')
            ]
        },

        // Contributions
        contributions: [
            ls('Implementasi UI dari desain menjadi Flutter (pixel-neat)', 'UI implementation from design to Flutter (pixel-neat)'),
            ls('Membuat komponen reusable agar UI konsisten dan mudah dirawat', 'Creating reusable components for consistent and maintainable UI'),
            ls('Menyusun layout dashboard (card + banner + grid menu) supaya informasinya tetap terstruktur', 'Building dashboard layout (card + banner + grid menu) to keep information structured'),
            ls('Menyusun navigasi UI-level antar halaman (onboarding → login → home)', 'Building UI-level navigation between pages (onboarding → login → home)')
        ],

        // Features (Key Screens)
        features: [
            { name: ls('Splash Screen', 'Splash Screen'), benefit: ls('Menampilkan branding SIAPSADI sebagai screen pembuka aplikasi', 'Displays SIAPSADI branding as app opening screen'), techNote: 'Flutter splash' },
            { name: ls('Onboarding', 'Onboarding'), benefit: ls('Slide onboarding dengan headline dan navigasi (indikator + tombol lanjut/lewati)', 'Onboarding slides with headline and navigation (indicator + next/skip buttons)'), techNote: 'PageView + indicators' },
            { name: ls('Login Screen', 'Login Screen'), benefit: ls('Form Email & Password dengan opsi login sosial (UI only)', 'Email & Password form with social login option (UI only)'), techNote: 'Form widgets' },
            { name: ls('Home / Dashboard', 'Home / Dashboard'), benefit: ls('Header profile, ringkasan Koin, info penjemputan, CTA Tukar Koin, banner, grid menu layanan', 'Profile header, Coin summary, pickup info, Redeem Coin CTA, banner, service menu grid'), techNote: 'Cards + Grid + ListView' },
            { name: ls('Info / Promo Page', 'Info / Promo Page'), benefit: ls('Halaman edukasi seperti "Tabung Pakai Sampah Koin" (UI content page)', 'Education page like "Save with Waste Coins" (UI content page)'), techNote: 'Content page layout' }
        ],

        // User Flows
        userFlows: [
            {
                title: ls('Flow Utama (UI Level)', 'Main Flow (UI Level)'),
                steps: [
                    ls('Splash Screen', 'Splash Screen'),
                    ls('Onboarding (skip/next)', 'Onboarding (skip/next)'),
                    ls('Login', 'Login'),
                    ls('Home / Dashboard', 'Home / Dashboard'),
                    ls('Akses menu layanan melalui grid (UI only)', 'Access service menu via grid (UI only)')
                ]
            }
        ],

        // Architecture
        architecture: {
            stack: {
                frontend: 'Flutter + Dart',
                tools: ['Figma', 'VS Code', 'Git']
            },
            notes: [
                ls('Struktur per screen + folder komponen: /screens, /widgets, /theme', 'Structure per screen + component folders: /screens, /widgets, /theme'),
                ls('Dummy/mock data untuk tampilan dashboard (koin, status penjemputan, banner)', 'Dummy/mock data for dashboard display (coins, pickup status, banner)'),
                ls('Reusable widgets untuk elemen yang sering dipakai', 'Reusable widgets for frequently used elements')
            ]
        },

        // Results
        results: {
            outcomes: [
                ls('UI utama berhasil tersusun: onboarding, login, dashboard, promo/info page', 'Main UI successfully built: onboarding, login, dashboard, promo/info page'),
                ls('Tampilan konsisten melalui komponen reusable (lebih mudah dikembangkan)', 'Consistent look through reusable components (easier to develop)'),
                ls('Struktur project siap dikembangkan ke tahap integrasi backend jika dibutuhkan', 'Project structure ready for backend integration stage if needed')
            ]
        },

        // Lessons Learned
        lessonsLearned: [
            ls('Konsistensi kecil (spacing/typography) sangat menentukan UI terlihat "produk"', 'Small consistencies (spacing/typography) greatly determine UI looking "product-ready"'),
            ls('Reusable component mempercepat pembuatan layar baru dan mengurangi bug visual', 'Reusable components speed up new screen creation and reduce visual bugs'),
            ls('Dashboard perlu hierarchy yang jelas agar informasi padat tetap nyaman dibaca', 'Dashboard needs clear hierarchy so dense information remains comfortable to read')
        ],

        // Next Improvements
        nextImprovements: [
            ls('Menambahkan tema light/dark berbasis style guide', 'Add light/dark theme based on style guide'),
            ls('Skeleton loading & empty state yang lebih polished', 'More polished skeleton loading & empty state'),
            ls('Micro-interaction sederhana (button feedback / page transition)', 'Simple micro-interactions (button feedback / page transition)'),
            ls('Persiapan integrasi API (contract & state management) jika project dilanjutkan', 'API integration preparation (contract & state management) if project continues')
        ]
    },
];

// Get featured projects only
export const featuredProjects = projects.filter((p) => p.featured);

// Get projects by year
export const getProjectsByYear = (year: number) =>
    projects.filter((p) => p.year === year);
