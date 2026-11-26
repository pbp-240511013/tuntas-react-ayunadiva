export const KUNCI_TUGAS = "tuntas-react-tugas";
export const KUNCI_TEMA = "tuntas-react-tema";

export const URUTAN_PRIORITAS = { tinggi: 0, sedang: 1, rendah: 2 };
export const LABEL_PRIORITAS = {
  tinggi: "Prioritas tinggi",
  sedang: "Prioritas sedang",
  rendah: "Prioritas rendah",
};

// Tugas contoh yang muncul saat aplikasi pertama kali dibuka
export const TUGAS_AWAL = [
  { id: 1, teks: "Kerjakan laporan praktikum 3B", prioritas: "tinggi", selesai: false },
  { id: 2, teks: "Push proyek React ke GitHub", prioritas: "sedang", selesai: false },
  { id: 3, teks: "Minum air putih", prioritas: "rendah", selesai: true },
];
