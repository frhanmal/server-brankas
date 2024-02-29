const express = require("express");
const router = express.Router();
const Data = require("../models/dbData");

router.post("/kirimData", async (req, res) => {
  const { status_pintu, teks_asli, teks_dekripsi, riwayat_pin, encrypted } =
    req.body;

  const timestamp = new Date();

  const newData = new Data({
    status_pintu: status_pintu,
    teks_asli: teks_asli,
    encryptedText: encrypted,
    teks_dekripsi: teks_dekripsi,
    riwayat_pin: riwayat_pin,
  });

  try {
    const result = await newData.save();
    console.log("Berhasil menyimpan data semua:", result);
    res.status(200).json({ message: "Berhasil menyimpan data semua" });
  } catch (err) {
    console.log("Gagal menyimpan data semua:", err);
    res.status(500).json({ message: "Gagal menyimpan data semua" });
  }
});

router.get("/getDataAll", async (req, res) => {
  try {
    const data = await Data.find({});
    console.log("Berhasil mengambil data all");
    res.status(200).json(data);
  } catch (err) {
    console.log("Gagal mengambil data all:", err);
    res.status(500).json({ message: "Gagal mengambil data all" });
  }
});

module.exports = router;
