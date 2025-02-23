import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (category) {
      res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        category,
      });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ where: { name } });

    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    const { name } = req.body;

    const existingCategory = await Category.findOne({ where: { name } });

    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    if (category) {
      await category.update({ name });

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category,
      });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (category) {
      await category.destroy();
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
