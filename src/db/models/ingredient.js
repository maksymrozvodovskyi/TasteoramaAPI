import { model, Schema } from 'mongoose';

const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
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
