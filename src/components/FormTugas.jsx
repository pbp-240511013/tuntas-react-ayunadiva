import { useState } from "react";

export default function FormTugas({ onTambah }) {
  const [teks, setTeks] = useState("");
  const [prioritas, setPrioritas] = useState("sedang");
  const [error, setError] = useState("");

  function kirim(e) {
    e.preventDefault();
    const bersih = teks.trim();
    if (bersih === "") {
      setError("Tugas masih kosong. Tulis dulu, baru tekan Tambah.");
      return;
    }
    setError("");
    onTambah(bersih, prioritas);
    setTeks("");
  }

  return (
    <>
      <form id="form-tugas" onSubmit={kirim} autoComplete="off">
        <input
          type="text"
          id="input-tugas"
          placeholder="Apa yang mau kamu tuntaskan hari ini?"
          aria-label="Tugas baru"
          maxLength={120}
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
        />
        <select
          id="pilih-prioritas"
          aria-label="Prioritas"
          value={prioritas}
          onChange={(e) => setPrioritas(e.target.value)}
        >
          <option value="rendah">Rendah</option>
          <option value="sedang">Sedang</option>
          <option value="tinggi">Tinggi</option>
        </select>
        <button type="submit" className="tambah">Tambah</button>
      </form>
      <p className="error" role="alert">{error}</p>
    </>
  );
}
