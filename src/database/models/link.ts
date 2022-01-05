import mongoose from "mongoose";

const scheme = new mongoose.Schema({
  short: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 15,
    validate: {
      validator: (value: string) => /^[a-zA-Z0-9]{1,15}$/.test(value),
      message: "invalid short",
    },
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) =>
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
          value
        ),
      message: "invalid url",
    },
  },
});

export default mongoose.model("link", scheme);
