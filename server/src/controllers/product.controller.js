import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { uploadImage, deleteImage } from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category_id, description, price, stock } = req.body;

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    let imageData = null;

    if (req.file) {
      const data = req.file.buffer.toString("base64");
      const base64 = `data:${req.file.mimetype};base64,${data}`;
      const result = await uploadImage(base64, "products");

      imageData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const product = await Product.create({
      name,
      category_id,
      description,
      image: imageData,
      price,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: { model: Category, as: "category", attributes: ["name"] },
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: { model: Category, as: "category", attributes: ["name"] },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const { name, category_id, description, price, stock } = req.body;

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (req.file) {
      if (product.image.public_id) {
        await deleteImage(product.image.public_id);
      }
      const data = req.file.buffer.toString("base64");
      const base64 = `data:${req.file.mimetype};base64,${data}`;
      const result = await uploadImage(base64, "products");
      product.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await product.update({
      name,
      category_id,
      description,
      image: product.image,
      price,
      stock,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.image.public_id) {
      await deleteImage(product.image.public_id);
    }

    await product.destroy();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
