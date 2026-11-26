# Tuntas (React)

Versi React dari aplikasi to-do list Tuntas, dibuat untuk Praktikum 3B: komponen, props, state, dan `useEffect`.

## Fitur

- Tambah, ubah, hapus, dan tandai tugas tuntas
- Prioritas tugas, filter, dan cincin progres
- Mode terang dan gelap
- Data tersimpan otomatis di localStorage

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

## Struktur

```
src/
├── main.jsx
├── App.jsx                  # state utama dan useEffect
├── constants.js
├── index.css
└── components/
    ├── PanelProgres.jsx
    ├── FormTugas.jsx
    ├── FilterBar.jsx
    ├── DaftarTugas.jsx
    └── ItemTugas.jsx
```
