const mongoose = require("mongoose");
var Employee = mongoose.model('Employee', {
    name: {type: String},
    position: {type: String},
    office: {type: String},
    salary: {type: Number}
});

module.exports = { Employee };

// const mongoose = require("mongoose");
// const ProductSchema =new mongoose.Schema({
//     name: String,
//     price: Number,
//     brand: String,
//     category: String
// })

// module.exports = mongoose.model('products',ProductSchema)