const express = require("express");
const router = express.Router();
const RiwayatPin = require("../models/dbRiwayatPin");

router.post("/kirimRiwayatPin", async (req, res) => {
  const {
    pinLama,
    encrypted2,
    pinBaru,
    encrypted3,
 } = req.body;

  const timestamp = new Date();

  const newRiwayatPin = new RiwayatPin({
    pin_lama: pinLama,
    encryptedText2: encrypted2,
    pin_baru: pinBaru,
    encryptedText3: encrypted3,
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

router.get("/getRiwayatPin", async (req, res) => {
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