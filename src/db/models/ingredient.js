import { model, Schema } from 'mongoose';

const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const IngredientsCollection = model('ingredients', ingredientsSchema);
