'use strict';
const dispatch = require('./dispatch');

module.exports.intents = async (event, context) => {
  console.log(`event.bot.name= ${event.bot.name}`);
  var response = await dispatch(event).catch((err) => { 
      console.log(err); 
      return {
        statusCode: 500,
        message: "Error on the Lambda execution - " + err
      }
    });
  return {
      statusCode: 200,
      message: response
    };


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
