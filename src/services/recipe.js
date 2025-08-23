import { RecipesCollection } from "../db/models/recipe.js";
import { IngredientsCollection } from "../db/models/ingredient.js";
import { CategoriesCollection } from "../db/models/category.js";
import mongoose from "mongoose";

export const searchRecipesService = async ({ category, ingredients, title, skip = 0, limit = 12 }) => {
  const filter = {};

if (category) {
  const catDoc = await CategoriesCollection.findOne({ name: new RegExp(`${category}`, "i") });
  if (catDoc) filter.category = catDoc._id;
}
console.log("FILTER after category:", filter);
  if (ingredients) {
    const ingArray = ingredients.split(",").map(i => i.trim());
    const ingDocs = await IngredientsCollection.find({
      name: { $in: ingArray.map(i => new RegExp(`${i}`, "i")) },
    });
console.log("FILTER after ingredient:", filter);
    if (ingDocs.length > 0) {
      const ingIds = ingDocs.map(i => i._id);
      filter["ingredients.id"] = { $in: ingIds };
    } }

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  const totalResults = await RecipesCollection.countDocuments(filter);
  console.log("result", totalResults);
  try {
  const recipes = await RecipesCollection.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("category", "name")
    .populate("ingredients.id", "name");

  return { totalResults, recipes };} catch (err) {
    console.error("ERROR fetching", err);
    throw err;
  }
};
