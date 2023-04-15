import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  airport: {
    type: String,
    default: "DEN",
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: String,
    default: function() {
      return (new Date().getFullYear() + 1)
    },
  },

})

const Flight = mongoose.model("Flight", flightSchema)

export{
  Flight,
}