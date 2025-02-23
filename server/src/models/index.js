import sequelize from "../config/database.js";
import Category from "./category.model.js";

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

export { sequelize, Category, syncDB };
