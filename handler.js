'use strict';
const moment = require('moment');
const dispatch = require('./dispatch');
const orderCoffee = require('./orderCoffee');
const lexResponses = require('./lexResponses');

module.exports.intents = async (event, context) => {
  let today     = moment(new Date()).format("YYYY-MM-DD");
  console.log(`Start Handler @ ${today}`)
  console.log(`Context stored: ${JSON.stringify(context)}`);
  console.log(`event.bot.name= ${event.bot.name}`);
  try{
    let intentName = await dispatch(event).catch((err) => { 
        console.log(err); 
        return {
          statusCode: 500,
          message: "Error on the Lambda execution at Dispatch module " + err
        }
      });
    
    let eventSource = await orderCoffee(event).catch((err) => { 
      console.log(err); 
      return {
        statusCode: 500,
        message: "Error on the Lambda execution at orderCoffee module " + err
      }
    });

    return await lexResponses.delegate(eventSource.sessionAt, eventSource.slots).catch((err) => { 
      console.log(err); 
      return {
        statusCode: 500,
        message: "Error on the Lambda execution at lexResponses module " + err
      }
    });

  }
  catch(err){
    console.log(`Error: ${err}`);
    return {
      statusCode: 500,
      error: "Error in Lambda Execution " + err
    };
  }


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
