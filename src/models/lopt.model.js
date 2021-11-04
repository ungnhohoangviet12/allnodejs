const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const loptSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    numberStudent: {
      type: Number,
      trim: true
    },
   
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
loptSchema.plugin(toJSON);
loptSchema.plugin(paginate);



/**
 * @typedef Lopt
 */
const Lopt = mongoose.model('Lopt', loptSchema);

module.exports = Lopt;
