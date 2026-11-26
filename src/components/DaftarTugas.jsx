import ItemTugas from "./ItemTugas.jsx";

export default function DaftarTugas({ tugas, totalSemua, onToggle, onUbahTeks, onHapus }) {
  if (tugas.length === 0) {
    return (
      <ul id="daftar-tugas">
        <li className="kosong">
          <strong>{totalSemua === 0 ? "Belum ada tugas" : "Tidak ada tugas di sini"}</strong>
          <span>
            {totalSemua === 0
              ? "Tulis tugas pertamamu di kolom atas, lalu tekan Tambah."
              : "Coba pilih filter lain."}
          </span>
        </li>
      </ul>
    );
  }

  return (
    <ul id="daftar-tugas" aria-live="polite">
      {tugas.map((t) => (
        <ItemTugas
          key={t.id}
          tugas={t}
          onToggle={onToggle}
          onUbahTeks={onUbahTeks}
          onHapus={onHapus}
        />
      ))}
    </ul>
  );
}
