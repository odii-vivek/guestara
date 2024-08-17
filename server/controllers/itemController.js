const Item = require('../models/Item');
const SubCategory = require('../models/Subcategory');
const Category = require('../models/Category');

// CREATE Item
// This function handles the creation of a new item
exports.createItem = async (req, res) => {
  try {
    // Destructure subcategoryId and categoryId from the request parameters
    const { subcategoryId, categoryId } = req.params;
    let parent;
    
    // Determine the parent (SubCategory or Category) based on the provided IDs
    if (subcategoryId) {
      parent = await SubCategory.findById(subcategoryId);
      if (!parent) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
    } else if (categoryId) {
      parent = await Category.findById(categoryId);
      if (!parent) {
        return res.status(404).json({ error: 'Category not found' });
      }
    } else {
      return res.status(400).json({ error: 'Either subcategoryId or categoryId is required' });
    }

    // Destructure the required properties from the request body
    const { name, image, description, taxApplicability, tax: taxValue, baseAmount: baseAmountValue, discount: discountValue } = req.body;

    // Convert baseAmount, discount, and tax to numbers
    const baseAmount = parseFloat(baseAmountValue);
    const discount = parseFloat(discountValue);
    const tax = parseFloat(taxValue);

    // Validate if baseAmount, discount, and tax are valid numbers
    if (isNaN(baseAmount) || isNaN(discount) || (taxApplicability && isNaN(tax))) {
      return res.status(400).json({ error: 'Base amount, discount, and tax must be valid numbers' });
    }

    // Calculate the total amount
    const totalAmount = baseAmount - discount;

    // Prepare tax fields based on taxApplicability
    const taxData = taxApplicability ? { tax, taxType: req.body.taxType || '' } : { tax: 0, taxType: '' };

    // Create a new item instance using the Item model
    const item = new Item({
      name,
      image,
      description,
      taxApplicability,
      tax: taxData.tax,
      taxType: taxData.taxType,
      baseAmount,
      discount,
      totalAmount,
      category: categoryId || null,
      subcategory: subcategoryId || null
    });

    // Save the new item to the database
    await item.save();

    // Add the item to the parent entity's items array
    if (subcategoryId) {
      if (!parent.items) {
        parent.items = [];
      }
      parent.items.push(item._id);
      await parent.save();
    } else if (categoryId) {
      if (!parent.items) {
        parent.items = [];
      }
      parent.items.push(item._id);
      await parent.save();
      console.log("coming here");
      
    }

    // Return the created item with a 201 (Created) status code
    res.status(201).json(item);
  } catch (err) {
    // If an error occurs during item creation, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};



// GET all items
// This function retrieves all items from the database
exports.getAllItems = async (req, res) => {
  try {
    // Find all items using the Item model
    const items = await Item.find();

    // Return the fetched items as the response
    res.json(items);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET items by category
// This function retrieves all items under a specific category
exports.getItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find the category by its ID and populate its subcategories
    const category = await Category.findById(categoryId).populate('subcategories');

    // If the category is not found, return a 404 status code with an error message
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // If there are subcategories, get the items from the first subcategory
    if (category.subcategories && category.subcategories.length > 0) {
      const subcategory = await SubCategory.findById(category.subcategories[0]._id).populate('items');
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      return res.json(subcategory.items);
    }

    // If no subcategories exist, return the items directly associated with the category
    const items = await Item.find({ category: categoryId });
    return res.json(items);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};


// GET items by subcategory
// This function retrieves all items under a specific subcategory
exports.getItemsBySubCategory = async (req, res) => {
  try {
    // Find the subcategory by its ID using the SubCategory model and populate the 'items' field
    const subcategoryId = req.params.subcategoryId;
    const subcategory = await SubCategory.findById(subcategoryId).populate('items');

    // If the subcategory is not found, return a 404 (Not Found) status code with an error message
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    // Return the fetched items as the response
    res.json(subcategory.items);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET item by ID
// This function retrieves a specific item by its ID
exports.getItemById = async (req, res) => {
  try {
    // Find the item by its ID using the Item model
    const item = await Item.findById(req.params.id);

    // If the item is not found, return a 404 (Not Found) status code with an error message
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Return the fetched item as the response
    res.json(item);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET item by Name
// This function retrieves an item by its name

exports.getItemByName = async (req, res) => {
  try {
    // Get the name from the request parameters
    const name = req.params.name;

    // Find items by name using the Item model
    const items = await Item.find({ name: new RegExp(name, 'i') }); // Case-insensitive search

    // If no items are found, return a 404 (Not Found) status code with an error message
    if (items.length === 0) {
      return res.status(404).json({ error: 'No items found' });
    }

    // Return the fetched items as the response
    res.json(items);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// UPDATE item
// This function updates an existing item by its ID
exports.updateItem = async (req, res) => {
  try {
    // Destructure the properties to be updated from the request body
    const { name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

    // Find the item by its ID and update its properties using the Item model
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, image, description, taxApplicability, tax, baseAmount, discount },
      { new: true } // Return the updated document instead of the original
    );

    // If the item is not found, return a 404 (Not Found) status code with an error message
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Return the updated item as the response
    res.json(item);
  } catch (err) {
    // If an error occurs during item update, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};