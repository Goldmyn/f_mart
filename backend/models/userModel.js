import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    userType: {
      type: String,
      enum: {
        values: ["user", "Admin"],
      },
      default: "user",
    },
  },
  { timestamps: true }
);

const UserModel = new mongoose.model("users", userSchema);

export { UserModel };
