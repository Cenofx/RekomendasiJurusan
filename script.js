const jurusan = [
  {
    nama: "Teknik Informatika",
    mapel: { mtk: 1.4, komputer: 1.7, inggris: .7, fisika: .6 },
    minat: "Teknologi",
    gaya: ["Analitis", "Praktik"],
    kepribadian: ["Logis", "Teliti"]
  },
  {
    nama: "Kedokteran",
    mapel: { biologi: 1.7, kimia: 1.4, inggris: .6, mtk: .4 },
    minat: "Kesehatan",
    gaya: ["Analitis", "Praktik"],
    kepribadian: ["Empatis", "Teliti"]
  },
  {
    nama: "Manajemen",
    mapel: { ekonomi: 1.7, inggris: .9, indo: .6, mtk: .5 },
    minat: "Bisnis",
    gaya: ["Komunikatif", "Visual"],
    kepribadian: ["Pemimpin", "Kreatif"]
  },
  {
    nama: "Desain Komunikasi Visual",
    mapel: { seni: 1.8, komputer: .9, indo: .5, inggris: .4 },
    minat: "Seni",
    gaya: ["Visual", "Praktik"],
    kepribadian: ["Kreatif", "Teliti"]
  },
  {
    nama: "Teknik Industri",
    mapel: { mtk: 1.2, fisika: 1.1, komputer: .7, ekonomi: .5 },
    minat: "Sains",
    gaya: ["Analitis", "Praktik"],
    kepribadian: ["Logis", "Pemimpin"]
  }
];

const nilaiIds = ["mtk", "indo", "inggris", "fisika", "biologi", "kimia", "ekonomi", "seni", "komputer"];

function nilai(id) {
  const input = document.getElementById(id);
  const angka = Number(input.value || 0);
  if (angka < 0 || angka > 100) {
    input.focus();
    alert("Nilai harus berada di antara 0 sampai 100.");
    throw new Error("Nilai tidak valid");
  }
  return angka;
}

function hitungSkor(item, nilaiMap, minat, gaya, kepribadian) {
  let skor = 0;
  Object.entries(item.mapel).forEach(([mapel, bobot]) => {
    skor += (nilaiMap[mapel] || 0) * bobot;
  });
  if (minat && minat === item.minat) skor += 55;
  if (gaya && item.gaya.includes(gaya)) skor += 25;
  if (kepribadian && item.kepribadian.includes(kepribadian)) skor += 25;
  return Math.round(skor);
}

function proses(event) {
  if (event) event.preventDefault();

  const nilaiMap = Object.fromEntries(nilaiIds.map(id => [id, nilai(id)]));
  const minat = document.getElementById("minat").value;
  const gaya = document.getElementById("gaya").value;
  const kepribadian = document.getElementById("kepribadian").value;

  const hasil = jurusan
    .map(item => ({ ...item, skor: hitungSkor(item, nilaiMap, minat, gaya, kepribadian) }))
    .sort((a, b) => b.skor - a.skor);

  tampilkanHasil(hasil);
}

function tampilkanHasil(hasil) {
  for (let i = 0; i < 3; i++) {
    document.getElementById(`j${i + 1}`).textContent = hasil[i]?.nama || `Jurusan ${i + 1}`;
    document.getElementById(`s${i + 1}`).textContent = `Skor: ${hasil[i]?.skor || 0}`;
  }

  const body = document.getElementById("detail-body");
  body.innerHTML = hasil.slice(0, 5).map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.nama}</td>
      <td>${item.skor}</td>
    </tr>
  `).join("");
}

function resetForm() {
  document.querySelector(".form-panel").reset();
  tampilkanHasil([
    { nama: "-", skor: 0 },
    { nama: "-", skor: 0 },
    { nama: "-", skor: 0 },
    { nama: "-", skor: 0 },
    { nama: "-", skor: 0 }
  ]);
}

resetForm();
