import { model, Schema } from 'mongoose';

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    area: {
      type: String,
      trim: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'ingredients',
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipes', recipesSchema);
