import { Schema, model } from "mongoose";

const modelo = new Schema({
  uuid: {
    type: String,
    unique: true
  },
  name: String,
  description: String,
  tag: Array,
  price: Number,
  category: String,
  stock: Number,
  lot: Boolean,
  images: Array,
  img: String,
}, {
  versionKey: false,
  timestamps: true,
});

export default model("Product", modelo);