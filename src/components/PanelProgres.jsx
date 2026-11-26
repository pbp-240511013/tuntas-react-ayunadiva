const KELILING_RING = 2 * Math.PI * 52; // keliling lingkaran dengan r = 52

function sapaanSekarang() {
  const jam = new Date().getHours();
  if (jam >= 4 && jam < 11) return "Selamat pagi";
  if (jam >= 11 && jam < 15) return "Selamat siang";
  if (jam >= 15 && jam < 18) return "Selamat sore";
  return "Selamat malam";
}

export default function PanelProgres({ total, tuntas, tema, onGantiTema }) {
  const persen = total === 0 ? 0 : Math.round((tuntas / total) * 100);

  let ringkasan = "Belum ada tugas. Mulai dari yang kecil dulu.";
  if (total > 0 && tuntas === total) ringkasan = "Semua tugas tuntas. Kerja bagus!";
  else if (total > 0) ringkasan = total - tuntas + " tugas lagi, " + tuntas + " sudah tuntas.";

  const tanggal = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <aside className="panel">
      <div className="brand">
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <rect width="28" height="28" rx="9" fill="currentColor" opacity=".18" />
          <path d="M8 14.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Tuntas</span>
      </div>

      <div className="sapa">
        <h1>{sapaanSekarang()}</h1>
        <p>{tanggal}</p>
      </div>

      <div className="ring" role="img" aria-label={"Progres " + persen + " persen"}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className="ring-track" cx="60" cy="60" r="52" />
          <circle
            className="ring-isi"
            cx="60" cy="60" r="52"
            style={{ strokeDashoffset: KELILING_RING * (1 - persen / 100) }}
          />
        </svg>
        <div className="ring-teks">
          <strong>{persen}%</strong>
          <span>selesai</span>
        </div>
      </div>

      <p className="ringkasan">{ringkasan}</p>

      <button type="button" className="tema" onClick={onGantiTema} aria-label="Ganti tema">
        {tema === "dark" ? "Mode terang" : "Mode gelap"}
      </button>
    </aside>
  );
}
