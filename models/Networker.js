const { Schema, model } = require('mongoose');
const ideaSchema = require('./Idea');


const networkerSchema = new Schema(
  {
    NetworkerName: {
      type: String,
      required: true,
      trimmed: true,
    },
    Email: {
      type: String,
      required: true,
      max_length: 50,
    },
    Thoughts: {
      type: String,
      required: false,
      max_length: 50,
    },
    ideas: [ideaSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Networker = model('networker', networkerSchema);

module.exports = Networker;
