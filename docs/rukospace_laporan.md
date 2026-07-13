## **LAPORAN MINI PROYEK LITERASI MANUSIA** 

## **RUKOSPACE:** 

## **APLIKASI MARKETPLACE PENYEWAAN RUKO** 

## **MAKALAH MATA KULIAH LITERASI MANUSIA** 

## **DISUSUN OLEH :** 

**714240002 Nadi Azzada Akbar 714240005 Alif Satria Raghib 714240006 Muhammad Rashid Al Savero 714240008 Muhammad Arif Rivaldi** 

## **Dosen Pengampu: Supriady, S.T., M.T** 

## **PROGRAM STUDI DIV TEKNIK INFORMATIKA** 

## **SEKOLAH TEKNOLOGI INFORMASI** 

## **UNIVERSITAS LOGISTIK DAN BISNIS INTERNASIONAL** 

## **BANDUNG** 

**2026** 

## **DAFTAR ISI** 

|**DAFTAR ISI**|**DAFTAR ISI**|**i**|
|---|---|---|
|**DAFTAR GAMBAR**||**ii**|
|**DAFTAR TABEL**||**iii**|
|**BAB**|**I**<br>**PENDAHULUAN**|**1**|
|1.1|Latar Belakang<br>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|1|
|1.2|Rumusan Masalah . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|2|
|1.3|Tujuan . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|2|
|**BAB**|**II**<br>**KAJIAN MASALAH**|**3**|
|2.1|Analisis Kondisi Masyarakat . . . . . . . . . . . . . . . . . . . . . . .|3|
|2.2|Dampak Masalah . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|4|
|**BAB**|**III**<br>**SOLUSI TEKNOLOGI**|**5**|
|3.1|Deskripsi Solusi . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|5|
|3.2|Teknologi yang Digunakan . . . . . . . . . . . . . . . . . . . . . . . .|5|
|**BAB**|**IV**<br>**IMPLEMENTASI**|**8**|
|4.1|Tahapan Pengerjaan . . . . . . . . . . . . . . . . . . . . . . . . . . . .|8|
|4.2|Screenshot Produk<br>. . . . . . . . . . . . . . . . . . . . . . . . . . . .|9|
|**BAB**|**V**<br>**EVALUASI**|**11**|
|5.1|Hasil Pengujian . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|11|
|5.2|Kelebihan . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|12|
|5.3|Kekurangan . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|12|
|**BAB**|**VI**<br>**KESIMPULAN DAN SARAN**|**14**|
|6.1|Kesimpulan . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|14|
|6.2|Saran<br>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|14|
|**DAFTAR PUSTAKA**||**16**|



i 

## **DAFTAR GAMBAR** 

|Gambar|3.1|Alur penggunaan utama RukoSpace . . . . . . . . . . . . . . .|5|
|---|---|---|---|
|Gambar|3.2|Workfow sistem RukoSpace . . . . . . . . . . . . . . . . . . .|7|
|Gambar|4.1|Pembagian sprint pengerjaan mini proyek RukoSpace . . . . . .|9|
|Gambar|4.2|Tampilan UI Figma RukoSpace<br>. . . . . . . . . . . . . . . . .|9|



ii 

## **DAFTAR TABEL** 

|Tabel|2.1|Pemetaan Pengguna dan Kebutuhan Utama|RukoSpace . . . . . .|3|
|---|---|---|---|---|
|Tabel|3.1|Teknologi dan Fungsi dalam Rancangan RukoSpace . . . . . . . .||6|
|Tabel|4.1|Pembagian Sprint Pengerjaan RukoSpace|. . . . . . . . . . . . .|8|
|Tabel|5.1|Evaluasi Kesesuaian Fitur dengan Masalah|Pengguna . . . . . . .|11|



iii 

## **BAB I PENDAHULUAN** 

## **1.1 Latar Belakang** 

Perkembangan teknologi digital mengubah cara masyarakat mencari informasi, bertransaksi, dan mengambil keputusan dalam aktivitas ekonomi. Salah satu aktivitas yang ikut terdampak adalah proses pencarian lokasi usaha. Bagi pelaku UMKM, ruko bukan hanya bangunan untuk berjualan, tetapi juga titik strategis yang menentukan akses pelanggan, biaya operasional, legalitas usaha, keamanan, dan peluang pertumbuhan bisnis. 

Berdasarkan dokumen Product Requirements Document RukoSpace, proses penyewaan ruko saat ini masih menghadapi banyak hambatan. Calon penyewa sering memperoleh informasi yang tidak lengkap tentang harga, luas bangunan, daya listrik, air, lahan parkir, zonasi usaha, dan status legalitas. Informasi dari spanduk fisik atau kontak agen juga tidak selalu aktif dan terbarui. Akibatnya, calon penyewa perlu mendatangi beberapa lokasi hanya untuk mengetahui bahwa ruko tersebut tidak sesuai dengan kebutuhan usaha (Tim RukoSpace, 2026). 

Masalah serupa dialami oleh pemilik ruko dan agen. Mereka membutuhkan media pemasaran yang mampu menjangkau calon penyewa secara lebih luas, tetapi tetap dapat menyaring penyewa yang serius. Jika informasi dasar harus dijawab berulang melalui pesan pribadi, proses pemasaran menjadi lambat dan tidak efisien. Di sisi lain, administrator sistem harus menjaga agar data ruko, dokumen legalitas, status listing, dan transaksi tetap valid. 

RukoSpace dirancang sebagai aplikasi marketplace penyewaan ruko yang mempertemukan calon penyewa, pemilik ruko, agen, dan administrator. Aplikasi ini mengusulkan fitur pencarian berbasis peta, filter spesifikasi, pemindaian QR Code di lokasi ruko, penjadwalan survei, pembayaran digital, sistem escrow, verifikasi properti, serta kontrak sewa digital. Dalam perspektif literasi manusia, aplikasi tersebut perlu dinilai bukan hanya dari sisi teknologi, tetapi juga dari kemampuannya memahami kebutuhan, keterbatasan, rasa aman, dan cara pengguna berkomunikasi. 

Pendekatan desain yang berpusat pada manusia menekankan bahwa sistem interaktif harus dikembangkan dengan memahami pengguna, tugas, dan lingkungan pengguna sepanjang siklus hidup sistem (International Organization 

1 

for Standardization, 2019). Literasi digital juga menuntut kemampuan masyarakat untuk mengakses, mengevaluasi, menggunakan, dan berpartisipasi secara aman dalam ruang digital (Law et al., 2018). Oleh karena itu, RukoSpace menjadi contoh relevan untuk mengkaji hubungan antara manusia, teknologi, kepercayaan, keamanan data, dan efisiensi dalam penyewaan properti komersial. 

## **1.2 Rumusan Masalah** 

Berdasarkan latar belakang tersebut, rumusan masalah dalam laporan ini adalah sebagai berikut. 

1. Apa masalah manusia yang ingin diselesaikan oleh aplikasi RukoSpace dalam proses penyewaan ruko? 

2. Bagaimana kebutuhan calon penyewa, pemilik ruko, agen, dan administrator dipetakan dalam rancangan RukoSpace? 

3. Bagaimana solusi teknologi pada RukoSpace mendukung efisiensi, transparansi informasi, keamanan, komunikasi, dan kepercayaan? 

4. Apa dampak positif, risiko, serta rekomendasi pengembangan aplikasi RukoSpace dari sudut pandang literasi manusia? 

## **1.3 Tujuan** 

Tujuan penyusunan laporan ini adalah sebagai berikut. 

1. Menjelaskan gambaran umum aplikasi RukoSpace sebagai marketplace penyewaan ruko. 

2. Menganalisis kondisi masyarakat dan masalah pengguna yang menjadi dasar kebutuhan aplikasi. 

3. Menjelaskan fitur dan teknologi yang digunakan dalam rancangan RukoSpace. 

4. Mengevaluasi kelebihan, kekurangan, dan risiko aplikasi berdasarkan prinsip literasi manusia. 

5. Memberikan kesimpulan dan saran agar RukoSpace lebih mudah digunakan, aman, transparan, dan bermanfaat bagi pengguna. 

2 

## **BAB II KAJIAN MASALAH** 

## **2.1 Analisis Kondisi Masyarakat** 

Kondisi masyarakat yang menjadi konteks RukoSpace adalah meningkatnya kebutuhan pelaku usaha terhadap lokasi yang tepat, tetapi proses pencarian ruko masih banyak dilakukan secara manual. Calon penyewa biasanya memperoleh informasi dari spanduk, rekomendasi relasi, grup media sosial, agen, atau pencarian acak di internet. Cara tersebut tidak selalu menyediakan data yang rapi dan sebanding antar properti. 

Kelompok pengguna utama RukoSpace terdiri atas calon penyewa ruko, pemilik ruko atau agen, dan administrator sistem. Calon penyewa membutuhkan informasi yang lengkap sebelum melakukan survei. Pemilik ruko membutuhkan pemasaran yang lebih luas dan terukur. Administrator membutuhkan mekanisme verifikasi agar data yang muncul kepada publik tidak menyesatkan. 

Tabel 2.1: Pemetaan Pengguna dan Kebutuhan Utama RukoSpace 

|**Pengguna**|**Masalah Utama**|**Kebutuhan**|
|---|---|---|
|Calon penyewa|Informasi ruko sering tidak|Pencarian berbasis lokasi,|
||lengkap, kontak lambat, dan|flter harga dan spesifkasi,|
||survei manual|jadwal survei, serta|
||menghabiskan waktu.|informasi legalitas yang|
|||jelas.|
|Pemilik ruko atau|Promosi masih terbatas dan|Dashboard listing, statistik|
|agen|banyak pertanyaan dasar|kunjungan, QR Code|
||harus dijawab berulang.|lokasi, dan pengelolaan|
|||calon penyewa.|
|Administrator|Data properti, dokumen,|Panel verifkasi, manajemen|
||dan transaksi perlu|listing, pemantauan|
||diverifkasi agar tidak|transaksi, dan mekanisme|
||merugikan pengguna.|pelaporan.|



Kondisi tersebut menunjukkan bahwa masalah utama bukan hanya kurangnya aplikasi, tetapi juga kurangnya transparansi, koordinasi, dan kepercayaan. Dalam marketplace digital, kepercayaan menjadi faktor penting karena pengguna mengambil keputusan tanpa selalu bertemu langsung dengan pemilik properti. Kepercayaan dan persepsi kemudahan penggunaan terbukti 

3 

berpengaruh terhadap penerimaan teknologi dalam transaksi daring (Davis, 1989; Gefen et al., 2003). 

RukoSpace juga berkaitan dengan perubahan perilaku pembayaran. Bank Indonesia menjelaskan bahwa QRIS memfasilitasi pembayaran berbasis QR Code agar transaksi lebih cepat, mudah, murah, aman, dan andal, serta diarahkan sebagai pintu masuk UMKM ke ekosistem digital (Bank Indonesia, 2025). Walaupun QRIS pada PRD RukoSpace digunakan sebagai inspirasi ekosistem pembayaran digital, aplikasi penyewaan ruko tetap perlu memperhatikan izin, keamanan, dan kepatuhan apabila kelak memproses transaksi secara nyata. 

## **2.2 Dampak Masalah** 

Apabila masalah penyewaan ruko tidak diselesaikan, dampaknya dirasakan oleh banyak pihak. Calon penyewa dapat mengalami pemborosan waktu, biaya transportasi, dan energi karena harus mengecek banyak lokasi yang tidak sesuai. Bagi UMKM, kesalahan memilih lokasi dapat memengaruhi peluang penjualan, kenyamanan pelanggan, dan keberlanjutan usaha. 

Pemilik ruko juga mengalami dampak ekonomi. Ruko yang kosong terlalu lama menimbulkan kehilangan potensi pendapatan. Pemasaran yang mengandalkan spanduk fisik sulit memberikan data tentang berapa banyak orang yang tertarik, berapa banyak yang meminta survei, dan alasan calon penyewa batal. Tanpa data tersebut, pemilik sulit memperbaiki harga, deskripsi, foto, atau strategi pemasaran. 

Dari sisi sosial, kurangnya informasi legalitas dapat menimbulkan konflik antara penyewa dan pemilik. Calon penyewa memerlukan kepastian mengenai status kepemilikan, dokumen pajak, zonasi usaha, dan syarat kontrak. Jika informasi ini baru diketahui setelah transaksi berjalan, risiko sengketa meningkat. 

Dari sisi keamanan digital, aplikasi yang menyimpan data pribadi, dokumen properti, nomor kontak, dan riwayat transaksi harus mengikuti prinsip pelindungan data. Undang-Undang Nomor 27 Tahun 2022 mengatur hak subjek data, pemrosesan data pribadi, kewajiban pengendali data, dan larangan penggunaan data pribadi secara tidak sah (Republik Indonesia, 2022). Selain itu, penyelenggaraan sistem dan transaksi elektronik di Indonesia diatur melalui Peraturan Pemerintah Nomor 71 Tahun 2019 (Republik Indonesia, 2019). Hal ini memperlihatkan bahwa solusi RukoSpace perlu dirancang dengan memperhatikan aspek manusia, hukum, dan teknologi secara bersamaan. 

4 

## **BAB III SOLUSI TEKNOLOGI** 

## **3.1 Deskripsi Solusi** 

RukoSpace adalah rancangan aplikasi marketplace penyewaan ruko yang menghubungkan calon penyewa dengan pemilik properti atau agen. Solusi ini menyederhanakan pencarian, pembandingan, survei, transaksi, dan administrasi sewa melalui data listing yang memuat alamat, harga, luas, daya listrik, fasilitas, foto, dokumen pendukung, serta status zonasi usaha. 

Fitur utama RukoSpace meliputi pencarian berbasis peta, filter kebutuhan, QR Code di lokasi ruko, penjadwalan survei, pembayaran digital, escrow, verifikasi properti, dan kontrak digital. Dalam perspektif literasi manusia, fitur tersebut menjawab kebutuhan informasi, efisiensi waktu, keamanan, komunikasi, dan kepercayaan pengguna. 

**==> picture [393 x 85] intentionally omitted <==**

**----- Start of picture text -----**<br>
Cari ruko −→ Filter kebutuhan −→ Lihat detail −→ Jadwal survei<br>Scan QR lokasi −→ Ajukan sewa −→ Pembayaran −→ Kontrak digital<br>**----- End of picture text -----**<br>


Gambar 3.1: Alur penggunaan utama RukoSpace 

## **3.2 Teknologi yang Digunakan** 

Teknologi RukoSpace dikelompokkan pada tingkat rancangan produk, yaitu antarmuka, data, verifikasi, transaksi, dan administrasi. 

5 

Tabel 3.1: Teknologi dan Fungsi dalam Rancangan RukoSpace 

|**Teknologi**|**Fungsi**|**Nilai bagi Pengguna**|
|---|---|---|
|Peta digital dan|Menampilkan ruko|Membantu calon penyewa|
|geolokasi|berdasarkan lokasi dan jarak|menilai akses, lingkungan,|
||dari area target.|dan potensi lokasi usaha.|
|Filter pencarian|Menyaring ruko berdasarkan|Mengurangi waktu|
||harga, luas, daya listrik,|pencarian dan survei yang|
||lantai, parkir, dan zonasi.|tidak relevan.|
|QR Code|Menghubungkan ruko fsik|Memudahkan calon|
||dengan halaman detail|penyewa memperoleh|
||digital.|informasi saat melihat ruko|
|||di lapangan.|
|Dashboard|Mengelola listing, foto,|Membantu pemilik ruko|
|pemilik|status, jadwal survei, dan|memasarkan properti secara|
||data minat pengguna.|lebih efektif.|
|Verifkasi admin|Memeriksa dokumen, foto,|Meningkatkan kepercayaan|
||alamat, dan status listing|serta mengurangi risiko|
||sebelum dipublikasikan.|informasi palsu.|
|Pembayaran|Memfasilitasi pembayaran|Memberikan pilihan|
|digital|melalui kanal digital seperti|pembayaran yang lebih|
||virtual account, dompet|praktis dan tercatat.|
||elektronik, atau kartu.||
|Escrow|Menahan dana sementara|Mengurangi risiko penipuan|
||sampai tahapan sewa|dan memberi perlindungan|
||disetujui.|bagi kedua pihak.|
|Kontrak digital|Menyimpan kesepakatan|Memudahkan arsip,|
||sewa dalam bentuk|transparansi hak dan|
||dokumen elektronik.|kewajiban, serta|
|||administrasi.|



Teknologi tersebut harus mudah digunakan karena persepsi manfaat dan kemudahan penggunaan memengaruhi penerimaan sistem (Davis, 1989). Kualitas RukoSpace juga bergantung pada akurasi informasi, kecepatan pencarian, kejelasan transaksi, layanan bantuan, dan manfaat nyata bagi pengguna (DeLone and McLean, 2003). 

6 

Gambar 3.2: Workflow sistem RukoSpace 

Gambar 3.2 memperlihatkan alur kerja sistem RukoSpace dari sisi pengguna dan proses layanan. Workflow ini membantu menjelaskan hubungan antara pencarian ruko, pengelolaan listing, verifikasi, survei, transaksi, dan kontrak digital. 

7 

## **BAB IV IMPLEMENTASI** 

## **4.1 Tahapan Pengerjaan** 

Tahapan pengerjaan RukoSpace dibagi ke dalam beberapa sprint agar proses pengembangan lebih terarah, mudah dipantau, dan dapat dievaluasi secara bertahap. Pembagian sprint juga membantu tim memisahkan pekerjaan analisis, desain, validasi, dan penyusunan laporan sehingga setiap anggota kelompok memiliki fokus kerja yang jelas. 

Tabel 4.1: Pembagian Sprint Pengerjaan RukoSpace 

|**Sprint**|**Fokus Pengerjaan**|**Output**|
|---|---|---|
|Sprint 1|Analisis masalah penyewaan|Rumusan masalah, target|
||ruko, identifkasi target|pengguna, dan daftar|
||pengguna, dan pengumpulan|kebutuhan utama aplikasi.|
||kebutuhan awal dari calon||
||penyewa, pemilik ruko, agen,||
||serta administrator.||
|Sprint 2|Penyusunan kebutuhan|Daftar ftur utama seperti|
||fungsional dan nonfungsional,|pencarian ruko, flter, QR|
||prioritas ftur, serta pemetaan|Code, booking survei,|
||ftur terhadap masalah|pembayaran digital, escrow,|
||pengguna.|kontrak digital, dashboard|
|||pemilik, dan verifkasi admin.|
|Sprint 3|Perancangan alur penggunaan|Alur pengguna, rancangan|
||dan desain awal antarmuka|layar pencarian, rancangan|
||untuk calon penyewa, pemilik|detail properti, dan gambaran|
||ruko, dan administrator.|dashboard.|
|Sprint 4|Validasi rancangan solusi dari|Evaluasi kesesuaian ftur,|
||sisi literasi manusia,|daftar risiko, serta catatan|
||keamanan, kepercayaan, dan|perbaikan pada verifkasi, data|
||kemudahan penggunaan.|pribadi, dan pembayaran|
|||digital.|
|Sprint 5|Penyusunan dokumentasi akhir|Laporan LaTeX, daftar|
||dan laporan mini proyek|pustaka, dan kesimpulan|
||berdasarkan PRD RukoSpace.|pengembangan aplikasi.|



Setiap sprint memiliki keluaran yang saling berurutan: Sprint 1 menetapkan masalah dan pengguna, Sprint 2 merumuskan fitur prioritas, Sprint 3 menyusun alur dan tampilan awal, Sprint 4 memvalidasi rancangan dari sisi literasi manusia 

8 

dan keamanan, sedangkan Sprint 5 menyelesaikan dokumentasi laporan. Pola ini membuat pengerjaan lebih terarah tanpa mengabaikan kebutuhan calon penyewa, pemilik ruko, dan administrator. 

**==> picture [283 x 576] intentionally omitted <==**

**----- Start of picture text -----**<br>
Sprint 1 Sprint 2 Sprint 3<br>−→ −→<br>Analisis Kebutuhan Desain<br>Sprint 4 Sprint 5<br>−→<br>Validasi Laporan<br>Pembagian sprint pengerjaan mini proyek RukoSpace<br>produk pada Gambar 4.2 berasal dari rancangan<br>Tampilan tersebut menunjukkan halaman awal, dashboard<br>. a panama a<br> Ruko Strategis untuk Byrnes ere what's happening with your properties oasy<br>Bisnis Anda GD Anaryecs Projected Revenue © TetaOn-site Seas<br>-_<br>cengan eas tekne yang trventiaa: account° Rp2%  1.2Bvse 842heres popertas<br>sucrman) Tipe wens ira @ setungs Recent Properties ViewAa<br>SonneSudirman Corporatesctmannar2t  Spacenoe<br>Keunggulan RukoSpace — Boe<br>Data stars, survei mucan, kepitucan eepat oun ge =]<br>. °<br>360 Virtual Tours Spesifikasi Terverifikasi | te €Kemang [amarg] [Ray] Retail [48] Unit [aa] A<br>pereglatAc bah nendeaan ekiroon ‘tndvaed wre memasthon cana | t20sqm $16,508<br>oe ge wowace |<br>Landing page Dashboard pemilik<br>Welcome back, Budi! [Rese |<br>&® My Active Rentais b o<br>(NH I<br>MT IT 5 ~ ' 5 Recent Payments von<br>Ruko Mega Kuningan Blok A RukoBSD City Soktor4 Wvasaes6h 5p oe once -_<br>etoem 4 20008 ten 4 NeosvA wvseaeGth ay 25.080 ~<br>—ip 25.00.00 15tameNov 2024 oFW2EOE — ay sc oe vee<br>{8 Upcoming Surveys<br>cerSaoRukoaowa PIK Boulevard | assem | NeedChremeenceaggAssistance? apaenmari schobesetanemeeot<br>Irs] — [emnnaeooeme<br>Dashboard penyewa<br>**----- End of picture text -----**<br>


Gambar 4.1: Pembagian sprint pengerjaan mini proyek RukoSpace 

## **4.2 Screenshot Produk** 

Screenshot produk pada Gambar 4.2 berasal dari rancangan UI Figma RukoSpace. Tampilan tersebut menunjukkan halaman awal, dashboard penyewa, dan dashboard pemilik sebagai antarmuka utama yang mendukung pencarian ruko, pengelolaan listing, serta pengambilan keputusan pengguna. 

Gambar 4.2: Tampilan UI Figma RukoSpace 

9 

Rancangan ini menekankan informasi yang mudah ditemukan dan alur kerja yang dekat dengan tugas pengguna. Prinsip desain yang berpusat pada manusia menuntut sistem menyesuaikan kebutuhan pengguna, bukan memaksa pengguna mencari informasi penting di tempat yang tersembunyi (International Organization for Standardization, 2019; Norman, 2013). 

10 

## **BAB V EVALUASI** 

## **5.1 Hasil Pengujian** 

Karena RukoSpace dalam laporan ini disusun berdasarkan PRD, pengujian yang dilakukan adalah pengujian konseptual terhadap kebutuhan dan alur, bukan pengujian aplikasi yang sudah berjalan. Pengujian dilakukan dengan menilai apakah setiap fitur menjawab masalah pengguna yang sudah dijelaskan pada BAB II. 

Tabel 5.1: Evaluasi Kesesuaian Fitur dengan Masalah Pengguna 

|**Masalah**|**Fitur RukoSpace**|**Hasil Evaluasi**|
|---|---|---|
|Informasi ruko|Detail properti, foto, video,|Sesuai, karena calon|
|tidak lengkap|spesifkasi, dan legalitas.|penyewa dapat menilai ruko|
|||sebelum survei.|
|Pencarian manual|Peta digital dan flter|Sesuai, karena daftar ruko|
|memakan waktu|kebutuhan.|dapat dipersempit sesuai|
|||kriteria usaha.|
|Kontak pemilik|Booking survei, notifkasi,|Sesuai, karena jadwal dapat|
|lambat atau tidak|dan dashboard pemilik.|dikelola melalui sistem.|
|aktif|||
|Risiko data atau|Verifkasi admin dan|Sesuai dengan catatan|
|dokumen palsu|pelaporan listing.|bahwa prosedur verifkasi|
|||harus dibuat ketat.|
|Risiko|Pembayaran digital dan|Sesuai secara rancangan,|
|pembayaran|escrow.|tetapi perlu kepatuhan|
|||hukum dan integrasi|
|||penyedia pembayaran|
|||berizin.|
|Pengguna kurang|Antarmuka sederhana dan|Perlu diperkuat dengan|
|terbiasa teknologi|panduan penggunaan.|bantuan pelanggan dan|
|||bahasa yang mudah|
|||dipahami.|



Hasil evaluasi menunjukkan bahwa fitur RukoSpace secara umum sudah selaras dengan kebutuhan utama pengguna. Fitur pencarian, filter, dan detail properti menjawab kebutuhan informasi. Fitur booking survei menjawab kebutuhan koordinasi. Fitur verifikasi, escrow, dan kontrak digital menjawab kebutuhan kepercayaan dan keamanan. 

11 

Meskipun demikian, hasil evaluasi juga menunjukkan beberapa catatan. Pertama, aplikasi harus memiliki mekanisme verifikasi dokumen yang jelas agar tidak hanya menjadi tempat unggah listing. Kedua, pengguna perlu diberi edukasi mengenai dokumen legalitas seperti SHM, HGB, PBB, dan zonasi usaha. Ketiga, sistem pembayaran digital perlu mengikuti aturan penyelenggaraan transaksi elektronik dan pelindungan data pribadi (Republik Indonesia, 2019, 2022). 

## **5.2 Kelebihan** 

Kelebihan utama RukoSpace adalah kemampuannya menyatukan informasi penyewaan ruko dalam satu platform. Calon penyewa tidak perlu mengumpulkan informasi dari banyak sumber yang tidak seragam. Pemilik ruko dapat menampilkan properti secara lebih profesional, sedangkan admin dapat menjaga kualitas data melalui proses verifikasi. 

Kelebihan kedua adalah efisiensi waktu. Fitur pencarian, filter, dan jadwal survei membantu pengguna mengambil keputusan awal sebelum datang ke lokasi. Hal ini penting bagi pelaku UMKM yang harus mengatur waktu antara produksi, pelayanan pelanggan, dan pencarian tempat usaha. 

Kelebihan ketiga adalah peningkatan kepercayaan. Data terverifikasi, dokumen legalitas, sistem escrow, dan kontrak digital memberi rasa aman bagi penyewa maupun pemilik ruko. Dalam konteks transaksi daring, kepercayaan berperan besar dalam keputusan pengguna untuk memakai platform (Gefen et al., 2003). 

Kelebihan keempat adalah dukungan terhadap literasi digital. RukoSpace dapat menjadi media edukasi bagi pengguna mengenai pencarian lokasi usaha, legalitas properti, pembayaran digital, dan arsip kontrak digital. Jika dirancang dengan bahasa sederhana, aplikasi ini dapat membantu masyarakat memahami proses sewa ruko secara lebih terstruktur. 

## **5.3 Kekurangan** 

Kekurangan pertama adalah ketergantungan terhadap kualitas data yang dimasukkan pemilik ruko atau agen. Jika foto, harga, lokasi, dan dokumen tidak diperbarui, aplikasi dapat kehilangan kepercayaan pengguna. Karena itu, RukoSpace memerlukan aturan pembaruan data, indikator listing aktif, dan proses 

12 

audit berkala. 

Kekurangan kedua adalah risiko kesenjangan literasi digital. Tidak semua pemilik ruko atau calon penyewa terbiasa mengelola listing, memindai QR Code, mengunggah dokumen, atau membaca kontrak digital. Aplikasi perlu menyediakan panduan singkat, bantuan pelanggan, dan desain antarmuka yang mudah dipahami. 

Kekurangan ketiga adalah kompleksitas hukum dan transaksi. Fitur escrow, kontrak digital, dan pembayaran membutuhkan integrasi dengan pihak berizin serta kebijakan operasional yang jelas. Tanpa prosedur yang kuat, fitur tersebut justru dapat menimbulkan masalah baru. 

Kekurangan keempat adalah risiko keamanan data. Aplikasi yang menyimpan data pribadi, dokumen properti, dan riwayat transaksi harus menerapkan prinsip minimisasi data, persetujuan pengguna, pembatasan akses, enkripsi, serta mekanisme penghapusan atau pembaruan data sesuai ketentuan yang berlaku (Republik Indonesia, 2022). 

13 

## **BAB VI KESIMPULAN DAN SARAN** 

## **6.1 Kesimpulan** 

RukoSpace merupakan rancangan aplikasi marketplace penyewaan ruko yang berangkat dari masalah nyata calon penyewa, pemilik ruko, agen, dan administrator. Masalah yang ingin diselesaikan meliputi informasi properti yang tidak lengkap, proses survei manual, komunikasi yang lambat, risiko legalitas, dan rendahnya kepercayaan dalam transaksi sewa. 

Dari sudut pandang literasi manusia, RukoSpace tidak hanya menawarkan fitur digital, tetapi juga berusaha memahami kebutuhan manusia di balik proses sewa ruko. Calon penyewa membutuhkan kepastian informasi dan efisiensi. Pemilik ruko membutuhkan promosi yang lebih luas dan terukur. Administrator membutuhkan sistem verifikasi agar data yang ditampilkan aman dan dapat dipercaya. 

Fitur seperti pencarian berbasis peta, filter spesifikasi, QR Code, booking survei, pembayaran digital, escrow, kontrak digital, dashboard pemilik, dan verifikasi admin dapat meningkatkan efisiensi serta transparansi. Namun, keberhasilan aplikasi tetap bergantung pada kualitas data, kemudahan penggunaan, keamanan informasi, kepatuhan hukum, dan layanan bantuan bagi pengguna. 

## **6.2 Saran** 

Pengembangan RukoSpace sebaiknya memprioritaskan antarmuka yang sederhana dan mudah dipahami. Pengguna harus dapat mencari ruko, melihat detail, memahami status legalitas, dan menjadwalkan survei tanpa langkah yang membingungkan. Panduan penggunaan perlu ditulis dengan bahasa yang singkat dan praktis. 

RukoSpace juga perlu memperkuat sistem verifikasi. Dokumen properti, alamat, foto, harga, dan status ketersediaan harus diperiksa sebelum listing tampil kepada publik. Aplikasi sebaiknya menyediakan fitur pelaporan listing mencurigakan agar pengguna dapat membantu menjaga kualitas data. 

Selain itu, aplikasi perlu menyediakan edukasi legalitas sewa ruko. Materi seperti SHM, HGB, PBB, zonasi usaha, masa sewa, deposit, dan klausul kontrak 

14 

perlu dijelaskan dalam bahasa yang mudah dipahami. Edukasi ini penting agar aplikasi tidak hanya menjadi tempat transaksi, tetapi juga meningkatkan literasi pengguna. 

Terakhir, fitur pembayaran digital, escrow, dan kontrak digital harus dikembangkan dengan memperhatikan regulasi transaksi elektronik dan pelindungan data pribadi. RukoSpace perlu bekerja sama dengan penyedia layanan berizin, menerapkan keamanan data, dan menyusun kebijakan privasi yang jelas agar kepercayaan pengguna dapat terjaga. 

15 

## **DAFTAR PUSTAKA** 

- Bank Indonesia (2025). Quick Response Code Indonesian Standard (QRIS). `https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/ritel/ kanal-layanan/QRIS/default.aspx` . Diakses pada 23 Juni 2026. 

- Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. _MIS Quarterly_ , 13(3):319–340. 

- DeLone, W. H. and McLean, E. R. (2003). The delone and mclean model of information systems success: A ten-year update. _Journal of Management Information Systems_ , 19(4):9–30. 

- Gefen, D., Karahanna, E., and Straub, D. W. (2003). Trust and tam in online shopping: An integrated model. _MIS Quarterly_ , 27(1):51–90. 

- International Organization for Standardization (2019). ISO 9241-210:2019 Ergonomics of Human-System Interaction – Part 210: Human-Centred Design for Interactive Systems. `https://www.iso.org/standard/77520.html` . Diakses pada 23 Juni 2026. 

- Law, N., Woo, D., de la Torre, J., and Wong, G. (2018). A Global Framework of Reference on Digital Literacy Skills for Indicator 4.4.2. Technical Report Information Paper No. 51, UNESCO Institute for Statistics. Diakses pada 23 Juni 2026. 

- Norman, D. A. (2013). _The Design of Everyday Things_ . Basic Books, New York. 

- Republik Indonesia (2019). Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik. `https://peraturan.bpk. go.id/Details/122030/pp-no-71-tahun-2019` . Diakses pada 23 Juni 2026. 

- Republik Indonesia (2022). Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi. `https://peraturan.bpk.go.id/Details/ 229798/uu-no-27-tahun-2022` . Diakses pada 23 Juni 2026. 

- Tim RukoSpace (2026). Product Requirements Document (PRD) RukoSpace: Aplikasi Marketplace Penyewaan Ruko. Dokumen internal mini proyek mata kuliah Literasi Manusia. 

16 

