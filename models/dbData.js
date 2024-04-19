const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    teks_enkripsi: String,
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;