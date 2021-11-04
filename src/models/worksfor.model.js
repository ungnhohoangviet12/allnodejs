const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const worksforSchema = mongoose.Schema(
  {
    companies: {
      type: String,
      required: true,
      trim: true,
    },
    professional: {
      type: String,
      required: true,
      trim: true,
    },
    dateofjoining: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
      trim: true,
    },
   
    
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
worksforSchema.plugin(toJSON);
worksforSchema.plugin(paginate);



/**
 * @typedef Worksfor
 */
const Worksfor = mongoose.model('Worksfor', worksforSchema);

module.exports = Worksfor;
