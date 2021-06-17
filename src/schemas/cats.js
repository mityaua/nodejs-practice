const mongoose = require('mongoose');
const { Schema } = mongoose;

// Схема для документа котов
const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Cats name is required'],
    },
    age: {
      type: Number,
      min: 1,
      max: 45,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: data => (!data ? [] : data),
    },
    owner: {
      name: String,
      age: Number,
      adress: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const Cat = mongoose.model('cat', catSchema);

module.exports = Cat;
