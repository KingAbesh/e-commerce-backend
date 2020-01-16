const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

// Instance method to add an item to user's cart

userSchema.methods.addToCart = function(item) {
  const cartProductIndex = this.cart.items.findIndex(cartProduct => {
    return cartProduct.itemId.toString() === item._id.toString();
  });

  let newQty = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQty = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQty;
  } else {
    updatedCartItems.push({
      itemId: item._id,
      quantity: newQty
    });
  }
  this.cart = {
    items: updatedCartItems
  };

  return this.save();
};

// Instance method to remove an item from user's cart

userSchema.methods.removeFromCart = function(id) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.itemId.toString() !== id.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

// Instance method to clear user's cart

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
