const mongoose = require("mongoose");

const riwayatpinSchema = new mongoose.Schema(
  {
    encryptedText2: String,
    encryptedText3: String,
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("RiwayatPin", riwayatpinSchema);

module.exports = Data;