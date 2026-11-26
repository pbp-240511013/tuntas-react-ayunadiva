import { useState } from "react";
import { LABEL_PRIORITAS } from "../constants.js";

export default function ItemTugas({ tugas, onToggle, onUbahTeks, onHapus }) {
  // State lokal: hanya relevan untuk satu item ini
  const [sedangEdit, setSedangEdit] = useState(false);
  const [teksEdit, setTeksEdit] = useState(tugas.teks);
  const [keluar, setKeluar] = useState(false);

  function mulaiEdit() {
    setTeksEdit(tugas.teks);
    setSedangEdit(true);
  }
  function simpanEdit() {
    const baru = teksEdit.trim();
    if (baru) onUbahTeks(tugas.id, baru);
    setSedangEdit(false);
  }
  function tekanKey(e) {
    if (e.key === "Enter") simpanEdit();
    if (e.key === "Escape") setSedangEdit(false);
  }
  function hapus() {
    setKeluar(true); // jalankan animasi keluar dulu
    setTimeout(() => onHapus(tugas.id), 220);
  }

  const kelas = "item" + (tugas.selesai ? " selesai" : "") + (keluar ? " keluar" : "");

  return (
    <li className={kelas} data-prioritas={tugas.prioritas}>
      <input
        type="checkbox"
        className="cek"
        checked={tugas.selesai}
        onChange={() => onToggle(tugas.id)}
        aria-label={"Tandai tuntas: " + tugas.teks}
      />

      <div className="badan">
        {sedangEdit ? (
          <input
            type="text"
            className="edit-input"
            value={teksEdit}
            maxLength={120}
            autoFocus
            aria-label="Ubah tugas"
            onChange={(e) => setTeksEdit(e.target.value)}
            onKeyDown={tekanKey}
          />
        ) : (
          <>
            <span className="teks">{tugas.teks}</span>
            <span className="chip">{LABEL_PRIORITAS[tugas.prioritas]}</span>
          </>
        )}
      </div>

      <div className="aksi">
        {sedangEdit ? (
          <button type="button" onClick={simpanEdit}>Simpan</button>
        ) : (
          <>
            <button type="button" onClick={mulaiEdit}>Ubah</button>
            <button type="button" className="hapus" onClick={hapus}>Hapus</button>
          </>
        )}
      </div>
    </li>
  );
}
