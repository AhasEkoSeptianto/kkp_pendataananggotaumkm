import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ttd = new Schema({
  img_base64: {
    type: String,
    required: true
  },
  nama: {
    type: String,
    require: true
  }
});

mongoose.models = {};

var Tdd = mongoose.model('ttd', ttd);

export default Tdd;