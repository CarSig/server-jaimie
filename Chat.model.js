const { Schema, model } = require('mongoose');


const chatSchema = new Schema({
    messages: {
        type: Array,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },

    members: {
        type: Array,
    },
    admin: {
        type: Object,
    },
    private: {
        type: Boolean,
    },
}
);

const Chat = model('Chat', chatSchema);
module.exports = Chat;