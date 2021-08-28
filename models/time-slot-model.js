const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeSlotModel = new Schema({
  providerId: mongoose.ObjectId,
  date: Date,
  startTime: String,
  endTime: String,
})

const TimeSlot = mongoose.model('timeSlot', timeSlotModel)

module.exports = TimeSlot
