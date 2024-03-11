const { Schema, Types } = require('mongoose');

const ideaSchema = new Schema(
  {
    ideaId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    ideaBody: {
      type: String,
      required: true,
      maxlength: 250,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ideaSchema;
