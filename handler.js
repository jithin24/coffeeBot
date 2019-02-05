'use strict';
const moment = require('moment');
const dispatch = require('./dispatch');
const lexResponses = require('./lexResponses');

exports.intents = async (event, context) => {
  let today     = moment(new Date()).format("YYYY-MM-DD");
  console.log(`Start Intents Handler @ ${today}`);
  console.log(event);
  console.log(`event.bot.name= ${event.bot.name}`);
  try{
    let eventSource = await dispatch(event).catch((err) => { 
        console.log(err); 
        return {
          statusCode: 500,
          message: "Error on the Lambda execution at Dispatch module " + err
        };
      }); 

    switch(eventSource.type){
      case "Delegate":
            return await lexResponses.delegate(eventSource).catch((err) => { 
              console.log(err); 
              return {
                statusCode: 500,
                message: "Error on the Lambda execution at lexResponses module " + err
              };
            });           
      case "ElicitSlot":
          return await lexResponses.elicitSlot(eventSource).catch((err) => { 
            console.log(err); 
            return {
              statusCode: 500,
              message: "Error on the Lambda execution at lexResponses module " + err
            };
          }); 
      case "Close":
          return await lexResponses.close(eventSource).catch((err) => { 
            console.log(err); 
            return {
              statusCode: 500,
              message: "Error on the Lambda execution at lexResponses module " + err
            };
          });
      default:
          return {
            statusCode: 500,
            message: "Error on the Lambda execution at lexResponses module"
          };   
    }//End of SWITCH
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
