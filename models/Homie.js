const { Schema, model } = require('mongoose');


const homieSchema = new Schema(
  {
    homieName: {
      type: String,
      required: true,
    },
    networkers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Networker',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Homie = model('homie', homieSchema);

module.exports = Homie;
