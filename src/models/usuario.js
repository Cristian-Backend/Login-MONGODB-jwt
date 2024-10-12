import { model, Schema } from 'mongoose';

const usuarioSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Usuario = model('Usuario', usuarioSchema);

export default Usuario;
