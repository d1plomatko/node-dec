import { model, Schema } from "mongoose";

import { EGender } from "../enums/gender.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Min value is 1"],
      max: [199, "Max value is 199"],
    },
    gender: {
      type: String,
      enum: EGender,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("users", userSchema);
