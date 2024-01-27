const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        feedback: {
            type: String,
            required: true
        }
    },
    {collection: "report-data"}
);

module.exports = mongoose.model('userReport', reportSchema )