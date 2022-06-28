const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const worklogSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
    },
    date: {
      type: Date,
    },
    hour: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("worklogs", worklogSchema);
