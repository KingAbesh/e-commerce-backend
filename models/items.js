const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
