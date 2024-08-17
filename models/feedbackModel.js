const {mongoose} =require('mongoose')
const Schema = mongoose.Schema
require('../db/db.js')
const feedback = new mongoose.Schema({
name:{
    type:String,
    default:""
},
email:{
    type:String,
    default:""
},
phone:{
    type:Number,
    default:""
},

feedBack:[{
    question:{
        type:String
    },
    answer:{
        type:String
    }
}]
})

const feedbackSchema = mongoose.model("feedBack", feedback)
module.exports = feedbackSchema