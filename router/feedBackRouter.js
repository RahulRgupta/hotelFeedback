const express = require('express')
const feedBackController = require('../controller/feedbackController')
const app = express();

app.post('/user',feedBackController.postFeedBack)
app.patch('/feedback',feedBackController.patchFeedback)

module.exports =app
