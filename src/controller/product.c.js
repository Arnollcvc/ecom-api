import Service from "../service/product.s.js";
import { v4 as uuidV4, validate } from "uuid";

const getProducts = async (req, res) => res.json(await Service.getAllProducts());

const getProduct = async (req, res) => {
    if (!validate(req.params.id)) return res.status(400).json({ message: "Id de producto invalido" });
    let producto = await Service.getProduct(req.params.id);
    if (!producto) return res.status(400).json({ message: "Producto no encontrado" });
    res.json(producto);
}

const createProduct = async (req, res) => {
    const { name, description, price, category, tag, stock, img, images } = req.body;
    if (!name || !description || !price || !category || !stock || !img || !images) return res.status(400).json({ message: "Faltan datos" });

    let producto = {
        uuid: uuidV4(),
        name,
        description,
        price,
        category,
        stock,
        img,
        images,
    }

    let data = await Service.createProduct(producto);
    if (!data) return res.status(400).json({ message: "Error al crear producto" });
    res.json({ message: "Producto creado!" });
}

const deleteProduct = async (req, res) => {
    if (!validate(req.params.id)) return res.status(400).json({ message: "Id de producto invalido" });
    let producto = await Service.getProduct(req.params.id);
    if (!producto) return res.status(400).json({ message: "Producto no encontrado" });
    let data = await Service.deleteProduct(req.params.id);
    if (!data) return res.status(400).json({ message: "Error al eliminar producto" });
    res.json({ message: "Producto eliminado!" });
}

const updateProduct = async (req, res) => {
    if (!validate(req.params.id)) return res.status(400).json({ message: "Id de producto invalido" });
    const { _id, uuid, name, description, price, category, tag, stock, img, images } = req.body;
    if (!name || !description || !price || !category || !stock || !img || !images) return res.status(400).json({ message: "Faltan datos" });

    let producto = await Service.getProduct(req.params.id);
    if (!producto) return res.status(400).json({ message: "Producto no encontrado o invalido" });

    let data = await Service.updateProduct(req.params.id, { name, description, price, category, tag, stock, img, images });
    if (!data) return res.status(400).json({ message: "Error al actualizar producto" });
    res.json({ message: "Producto actualizado!", data });
    
}


export default {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
};