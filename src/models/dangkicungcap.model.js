const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const dangkicungcapSchema = mongoose.Schema(
  {
    madkcc: {
      type: String,
      required: true,
      trim: true,
      seq: { type: Number, default: 0 }
    },
   
    manhacc: {
      type: String,
      required: true,
      trim: true,
    
    },
    maloaidv: {
      type: String,
      required: true,
      trim: true,
    },
    dongxe: {
      type: String,
      required: true,
      trim: true,
    },
    ngaybatdaucungcap: {
      type: Date,
      required: true,
      trim: true,
    },
    ngayketthuccungcap: {
      type: Date,
      required: true,
      trim: true,
    },
    mamp: {
      type: String,
      required: true,
      trim: true,
    },
    soluongxedangky: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dangkicungcapSchema.plugin(toJSON);
dangkicungcapSchema.plugin(paginate);



/**
 * @typedef Dangkicungcap
 */
const Dangkicungcap = mongoose.model('Dangkicungcap', dangkicungcapSchema);

module.exports = Dangkicungcap;
// ung nho hoang viet