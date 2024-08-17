const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')

const bodyParser = require('body-parser');
const { config } = require('dotenv');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

const corsConfig ={
  origin:"*",
  Credential:true,
  methods:["GET","POST","PATCH","PUT","DELETE"],
};
app.options("",cors(corsConfig))
app.use(cors(corsConfig))
// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to db");
  } catch (err) {
    console.error("Failed to connect to db", err);
  }
};

// Define Feedback model
const feedbackSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const feedBackModel = mongoose.model('Feedback', feedbackSchema);

const feedBackRouter = require('./router/feedBackRouter')

app.use('/api',feedBackRouter)
// Feedback route handler
const postFeedBack = async (req, res) => {
  try {
    const { Name, email, phone } = req.body;

    // Validate request body
    if (!Name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    // Create a new feedback document
    const newData = new feedBackModel({
      Name,
      email,
      phone
    });

    // Save the feedback document
    const userData = await newData.save();
    return res.status(201).json({ message: 'User data saved', _id: userData._id });
  } catch (err) {
    console.error('Error saving feedback:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//
app.get('/api/feedback', async (req, res) => {
    try {
      const feedbacks = await feedBackModel.find();
      return res.status(200).json(feedbacks);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Routes
app.post('/api/feedback', postFeedBack);

app.get('/', (req, res) => {

  return res.send("connected");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to the database
dbConnection();
