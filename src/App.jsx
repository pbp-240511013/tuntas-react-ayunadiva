import { useState, useEffect } from "react";
import PanelProgres from "./components/PanelProgres.jsx";
import FormTugas from "./components/FormTugas.jsx";
import FilterBar from "./components/FilterBar.jsx";
import DaftarTugas from "./components/DaftarTugas.jsx";
import { KUNCI_TUGAS, KUNCI_TEMA, URUTAN_PRIORITAS, TUGAS_AWAL } from "./constants.js";

// Membaca data dari localStorage (dipanggil sekali saat komponen pertama dibuat)
function muatTugas() {
  try {
    const mentah = localStorage.getItem(KUNCI_TUGAS);
    if (mentah === null) return TUGAS_AWAL;
    const data = JSON.parse(mentah);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function bacaTemaAwal() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

export default function App() {
  // ----- State -----
  const [tugas, setTugas] = useState(muatTugas);
  const [filter, setFilter] = useState("semua");
  const [tema, setTema] = useState(bacaTemaAwal);

  // ----- Nilai turunan dari state -----
  const total = tugas.length;
  const tuntas = tugas.filter((t) => t.selesai).length;
  const sisa = total - tuntas;

  const tugasTampil = tugas
    .filter((t) => {
      if (filter === "aktif") return !t.selesai;
      if (filter === "selesai") return t.selesai;
      return true;
    })
    .sort((a, b) => {
      if (a.selesai !== b.selesai) return a.selesai ? 1 : -1;
      return URUTAN_PRIORITAS[a.prioritas] - URUTAN_PRIORITAS[b.prioritas];
    });

  // ----- useEffect -----
  // 1) Simpan tugas ke localStorage setiap kali daftar tugas berubah
  useEffect(() => {
    try {
      localStorage.setItem(KUNCI_TUGAS, JSON.stringify(tugas));
    } catch (e) {
      console.warn("Gagal menyimpan ke localStorage:", e);
    }
  }, [tugas]);

  // 2) Terapkan dan simpan tema setiap kali tema berubah
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    try {
      localStorage.setItem(KUNCI_TEMA, tema);
    } catch (e) {
      /* abaikan */
    }
  }, [tema]);

  // 3) Tampilkan jumlah tugas yang tersisa pada judul tab browser
  useEffect(() => {
    document.title = sisa > 0 ? "(" + sisa + ") Tuntas" : "Tuntas – Selesaikan satu per satu";
  }, [sisa]);

  // ----- Aksi (diteruskan ke komponen anak lewat props) -----
  function tambahTugas(teks, prioritas) {
    setTugas((lama) => [...lama, { id: Date.now(), teks, prioritas, selesai: false }]);
  }
  function ubahStatus(id) {
    setTugas((lama) => lama.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));
  }
  function ubahTeks(id, teksBaru) {
    setTugas((lama) => lama.map((t) => (t.id === id ? { ...t, teks: teksBaru } : t)));
  }
  function hapusTugas(id) {
    setTugas((lama) => lama.filter((t) => t.id !== id));
  }
  function bersihkanTuntas() {
    setTugas((lama) => lama.filter((t) => !t.selesai));
  }
  function gantiTema() {
    setTema((sekarang) => (sekarang === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app">
      <PanelProgres total={total} tuntas={tuntas} tema={tema} onGantiTema={gantiTema} />

      <main className="isi">
        <FormTugas onTambah={tambahTugas} />
        <FilterBar
          filter={filter}
          onUbahFilter={setFilter}
          adaTuntas={tuntas > 0}
          onBersihkan={bersihkanTuntas}
        />
        <DaftarTugas
          tugas={tugasTampil}
          totalSemua={total}
          onToggle={ubahStatus}
          onUbahTeks={ubahTeks}
          onHapus={hapusTugas}
        />
      </main>
    </div>
  );
}
