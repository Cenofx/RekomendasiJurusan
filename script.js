const jurusan = [
  {
    nama: "Teknik Informatika",
    mapel: { mtk: 1.4, komputer: 1.7, inggris: 0.7, fisika: 0.6 },
    minat: "Teknologi",
    gaya: ["Analitis", "Praktik"],
    kepribadian: ["Logis", "Teliti"]
  },
  {
    nama: "Kedokteran",
    mapel: { biologi: 1.7, kimia: 1.4, inggris: 0.6, mtk: 0.4 },
    minat: "Kesehatan",
    gaya: ["Analitis", "Praktik"],
    kepribadian: ["Empatis", "Teliti"]
  },
  {
    nama: "Manajemen",
    mapel: { ekonomi: 1.7, inggris: 0.9, indo: 0.6, mtk: 0.5 },
    minat: "Bisnis",
    gaya: ["Komunikatif", "Visual"],
    kepribadian: ["Pemimpin", "Kreatif"]
  },
  {
    nama: "Desain Komunikasi Visual",
    mapel: { seni: 1.8, komputer: 0.9, indo: 0.5, inggris: 0.4 },
    minat: "Seni",
    gaya: ["Visual", "Praktik"],
    kepribadian: ["Kreatif", "Teliti"]
  },
  {
    nama: "Teknik Industri",
    mapel: { mtk: 1.2, fisika: 1.1, komputer: 0.7, ekonomi: 0.5 },
    minat: "Sains",
    gaya: ["Analitis", "Praktik"],
    kepribadian: ["Logis", "Pemimpin"]
  }
];

const nilaiIds = [
  "mtk", "indo", "inggris", "fisika", "biologi",
  "kimia", "ekonomi", "seni", "komputer"
];

function validasiForm() {
  const nama = document.getElementById("nama").value.trim();
  const minat = document.getElementById("minat").value;
  const gaya = document.getElementById("gaya").value;
  const kepribadian = document.getElementById("kepribadian").value;

  if (nama === "") {
    alert("Harap isi Nama Siswa terlebih dahulu.");
    document.getElementById("nama").focus();
    return false;
  }

  for (const id of nilaiIds) {
    const input = document.getElementById(id);

    if (input.value === "") {
      alert("Harap isi semua kolom nilai terlebih dahulu.");
      input.focus();
      return false;
    }

    const angka = Number(input.value);

    if (angka < 0 || angka > 100) {
      alert("Nilai harus berada di antara 0 sampai 100.");
      input.focus();
      return false;
    }
  }

  if (minat === "") {
    alert("Harap memilih Minat Utama terlebih dahulu.");
    document.getElementById("minat").focus();
    return false;
  }

  if (gaya === "") {
    alert("Harap memilih Gaya Belajar terlebih dahulu.");
    document.getElementById("gaya").focus();
    return false;
  }

  if (kepribadian === "") {
    alert("Harap memilih Kepribadian terlebih dahulu.");
    document.getElementById("kepribadian").focus();
    return false;
  }

  return true;
}

function ambilNilai(id) {
  return Number(document.getElementById(id).value);
}

function hitungSkor(item, nilaiMap, minat, gaya, kepribadian) {
  let skor = 0;

  Object.entries(item.mapel).forEach(([mapel, bobot]) => {
    skor += (nilaiMap[mapel] || 0) * bobot;
  });

  if (minat === item.minat) skor += 55;
  if (item.gaya.includes(gaya)) skor += 25;
  if (item.kepribadian.includes(kepribadian)) skor += 25;

  return Math.round(skor);
}

function proses(event) {
  if (event) event.preventDefault();

  if (!validasiForm()) {
    resetHasil();
    return;
  }

  const nilaiMap = Object.fromEntries(
    nilaiIds.map(id => [id, ambilNilai(id)])
  );

  const minat = document.getElementById("minat").value;
  const gaya = document.getElementById("gaya").value;
  const kepribadian = document.getElementById("kepribadian").value;

  const hasil = jurusan
    .map(item => ({
      ...item,
      skor: hitungSkor(item, nilaiMap, minat, gaya, kepribadian)
    }))
    .sort((a, b) => b.skor - a.skor);

  tampilkanHasil(hasil);
}

function tampilkanHasil(hasil) {
  for (let i = 0; i < 3; i++) {
    document.getElementById(`j${i + 1}`).textContent =
      hasil[i]?.nama || "-";

    document.getElementById(`s${i + 1}`).textContent =
      `Skor: ${hasil[i]?.skor || 0}`;
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

function resetHasil() {
  document.getElementById("j1").textContent = "Jurusan Terbaik";
  document.getElementById("s1").textContent = "Skor: 0";

  document.getElementById("j2").textContent = "Jurusan Kedua";
  document.getElementById("s2").textContent = "Skor: 0";

  document.getElementById("j3").textContent = "Jurusan Ketiga";
  document.getElementById("s3").textContent = "Skor: 0";

  document.getElementById("detail-body").innerHTML = `
    <tr><td>1</td><td>-</td><td>0</td></tr>
    <tr><td>2</td><td>-</td><td>0</td></tr>
    <tr><td>3</td><td>-</td><td>0</td></tr>
    <tr><td>4</td><td>-</td><td>0</td></tr>
    <tr><td>5</td><td>-</td><td>0</td></tr>
  `;
}

function resetForm() {
  document.querySelector(".form-panel").reset();
  resetHasil();
}

resetHasil();