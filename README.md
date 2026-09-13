# Arief Hidayat Portfolio

Website Next.js dengan halaman Home, Skills, Story, dan Portfolio. HP menggunakan landscape; portrait menampilkan petunjuk putar layar.

## Menjalankan proyek

```sh
npm install
npm run dev
npm run build
npm start
```

## Struktur folder

- `app/`: route Next.js, layout, stylesheet global, dan manifest web app.
- `app/components/home/`: hero video, loading, dan tombol resume.
- `app/components/navigation/`: menu, tombol kembali, sound/settings/fullscreen.
- `app/components/skills/`: komponen dan CSS Skills.
- `app/components/story/`: latar Story, orbit surat, riwayat pendidikan, dan CSS.
- `app/components/portfolio/`: galeri proyek dan detailnya.
- `app/components/shared/`: pemutar video dan petunjuk rotasi layar.
- `app/components/visuals/`: shader ThreeUI beserta sumber dan dokumentasinya.
- `app/components/sections/`: komponen bagian tambahan/cadangan.
- `app/lib/`: logika browser yang dapat diuji terpisah.
- `public/documents/`: PDF resume yang diakses website.
- `public/videos/`: MP4 dan poster yang diputar browser.
- `public/images/`: gambar desain yang dipakai halaman.
- `assets/documents/`: dokumen sumber.
- `assets/videos/`: video sumber asli.
- `assets/sequences/`: frame sumber untuk membuat ulang video; tidak lagi disajikan dari public.
- `scripts/`: alat bantu konversi video dan capture proyek.
- `tests/`: pengujian perilaku browser.
- `docs/`: catatan implementasi.

File konfigurasi Next.js, TypeScript, npm, dan ESLint tetap di root agar ditemukan oleh alat build. Folder `.next`, `node_modules`, dan `.tmp-video-tools` adalah keluaran/dependensi lokal.

## Video

Hero memutar satu MP4 berisi idle, waving, dan finger heart secara berurutan. Loading menggunakan MP4 tersendiri. Untuk membuat ulang dari frame sumber dengan FFmpeg:

```sh
python scripts/build-animation-videos.py --ffmpeg path/to/ffmpeg
```

## Fullscreen dan iPhone

Browser yang mendukungnya memakai Fullscreen API standar atau WebKit. Penolakan dan API yang tidak tersedia menampilkan penjelasan, bukan gagal diam-diam.

Safari iPhone yang tidak mendukung fullscreen seluruh halaman menampilkan langkah Bagikan > Tambah ke Layar Utama > Buka sebagai App. Manifest `standalone` dan metadata Apple memungkinkan peluncuran dari Layar Utama tanpa bilah Safari. Website tidak dapat memaksa browser memasang aplikasi atau menyembunyikan UI sistem. Mode landscape tetap berlaku.

Rujukan: https://support.apple.com/en-mide/guide/iphone/iphea86e5236/ios

Uji logika fullscreen (Node.js 22.18+):

```sh
node --test tests/fullscreen.test.mjs
```
