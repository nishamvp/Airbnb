import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required:true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required:true, ref: "User" },
  checkIn: { type: String, required:true },
  checkOut: { type: String, required:true },
  guests: { type: Number, required:true },
  name: { type: String, required:true },
  phone: { type: String, required:true },
  numberOfNights: { type: String, required:true },
  totalPrice: { type: String, required:true },
});
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
