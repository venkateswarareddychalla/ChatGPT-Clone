import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    credits: {type: Number, default: 20}
})

// Hash password before saving to DB
userSchema.pre('save', async function(next){
    // If the password is new/modified → it gets hashed with bcrypt.
    if (!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const userModel = mongoose.model("User", userSchema);

export default userModel;