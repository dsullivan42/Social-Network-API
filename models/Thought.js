const {Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought is required',
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: 'Username is required'
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;