const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const loaidichvutSchema = mongoose.Schema(
  {
    maloaidv: {
      type: String,
      required: true,
      trim: true,
    },
    tenloaidv: {
      type: String,
      trim: true
    },
   
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
loaidichvutSchema.plugin(toJSON);
loaidichvutSchema.plugin(paginate);



/**
 * @typedef Loaidichvut
 */
const Loaidichvut = mongoose.model('Loaidichvut', loaidichvutSchema);

module.exports = Loaidichvut;
