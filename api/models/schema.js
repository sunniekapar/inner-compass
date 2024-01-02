const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  subCategory: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

const categorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  questions: [subCategorySchema]
}, );

const createModelForCollection = (collectionName) => {
  return mongoose.model(collectionName, categorySchema, collectionName);
}


module.exports = createModelForCollection;
