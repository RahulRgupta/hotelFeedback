const { mongoose } = require('mongoose');
const feedBackModel = require('../models/feedbackModel');

const postFeedBack = async (req, res) => {
  try {
    const { Name, email,phone} = req.body;

    // Validate request body
    if (!Name || !email || !phone) {
      return res.status(400).json({ message: 'Name email and phone are required' });
    }

    // Create a new feedback document
    const newData = new feedBackModel({
      Name,
      email,
      phone
    });

    // Save the feedback document
    const userData = await newData.save();
    return res.status(201).json({ message: 'user data saved',_id:userData._id });
  } catch (err) {
    console.error('Error saving feedback:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


//patch api
const patchFeedback = async (req,res)=>{
  try {
    const { _id } = req.query;
    const { question, answer } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send({ message: 'Invalid user ID' });
  }
      const feedback = await feedBackModel.findById(_id);
      if (!feedback) {
          return res.status(404).send({ message: 'user not found' });
      }

      feedback.feedBack.push({ question, answer });
      await feedback.save();

      res.status(200).json({message:"feedback saved successfully"});
  } catch (error) {
      res.status(500).send({ message: 'Server error', error });
  }

}
module.exports = {
  postFeedBack,
  patchFeedback
};
