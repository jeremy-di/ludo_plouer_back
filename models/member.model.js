import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    town: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
