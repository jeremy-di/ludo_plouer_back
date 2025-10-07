import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true
    },
    nbOfChildrens: {
      type: Number,
      required: true
    }
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
