const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: {
          type: Object,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    user: {
      email: {
        type: String,
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
