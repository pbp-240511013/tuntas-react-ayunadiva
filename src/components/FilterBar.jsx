const PILIHAN = [
  { nilai: "semua", label: "Semua" },
  { nilai: "aktif", label: "Berjalan" },
  { nilai: "selesai", label: "Tuntas" },
];

export default function FilterBar({ filter, onUbahFilter, adaTuntas, onBersihkan }) {
  return (
    <div className="bar">
      <div className="filter" role="group" aria-label="Filter tugas">
        {PILIHAN.map((p) => (
          <button
            key={p.nilai}
            type="button"
            aria-pressed={filter === p.nilai}
            onClick={() => onUbahFilter(p.nilai)}
          >
            {p.label}
          </button>
        ))}
      </div>
      {adaTuntas && (
        <button type="button" className="bersih" onClick={onBersihkan}>
          Bersihkan yang tuntas
        </button>
      )}
    </div>
  );
}
