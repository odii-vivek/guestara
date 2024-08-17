const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Category model
const categorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, required: true },
  tax: {
    type: Number,
    required: function() { return this.taxApplicability; }
  },
  taxType: { type: String },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }] // Array of item IDs associated with this category
});


// Create the Category model from the schema
const Category = mongoose.model('Category', categorySchema);

// Export the Category model for use in other parts of the application
module.exports = Category;