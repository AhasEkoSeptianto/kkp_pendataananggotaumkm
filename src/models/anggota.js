import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var anggota = new Schema({
  nama: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  noTelp: {
    type: String,
    require: true
  },
  alamat: {
    type: String,
    require: true
  },
  tanggal_lahir: {
    type: String,
    require: true
  },
  toko: {
    type: String,
    require: true
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
});

mongoose.models = {};

var Anggota = mongoose.model('anggota', anggota);

export default Anggota;