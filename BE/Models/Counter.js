const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "id is required"],
    },
    seq: {
        type: Number,
        default: 1,
    },
}, { timestamps: true, });
const CounterModel = mongoose.model('Counter', schema);

const increment = (id) => {
    return new Promise(
        async (res, rej) => {
            let counter = await CounterModel.findByIdAndUpdate(id, {
                $inc: { seq: 1 }
            }, { new: true });

            if (counter == null) {
                counter = await CounterModel.create({
                    _id: id,

                });
            }
            return res(counter.seq);
        }
    );
}
const decrement = (id) => {
    return new Promise(
        async (res, rej) => {
            let counter = await CounterModel.updateOne({
                _id: id,
            },{ $inc: { seq: -1 }});
            
            return res(counter);
        }
    );
}
module.exports = {
    Counter: mongoose.model('Counter', schema),
    decrement, 
    increment
};