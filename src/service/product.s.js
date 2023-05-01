import Product from "../models/Product.js";

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
}

const getProduct = async (uuid) => {
  const product = await Product.find({ uuid });
  if (!product || product.length === 0) return false;
  return product;
}

const createProduct = async (product) => {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
  } catch (e) {
    console.log(e.stack);
    return false;
  }
}

const updateProduct = async (id, product) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate({ uuid: id }, product, { new: true });
    return updatedProduct;
  } catch (e) {
    console.log(e.stack);
    return false;
  }
}

const deleteProduct = async (uuid) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ uuid });
    return deletedProduct;
  } catch (e) {
    console.log(e.stack);
    return false;
  }
}

const getProductsByCategory = async (category) => {
  const products = await Product.find({ category });
  return products;
}

const getProductsByTag = async (tag) => {
  const products = await Product.find({ tag });
  return products;
}

const getProductsByName = async (name) => {
  const products = await Product.find({ name });
  return products;
}

export default {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByName,
  getProductsByTag,
}