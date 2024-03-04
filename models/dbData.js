const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    status_pintu: String,
    teks_asli: String,
    encryptedText: String,
    teks_dekripsi: String,
    riwayat_pin: String,
    pin_lama: String,
    encryptedText2: String,
    pin_baru: String,
    encryptedText3: String,
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;