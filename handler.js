'use strict';
const moment = require('moment');
const dispatch = require('./dispatch');
const lexResponses = require('./lexResponses');

exports.intents = async (event, context) => {
  let today = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let errObj={};
  console.log('remaining time =', context.getRemainingTimeInMillis());
  console.log('functionName =', context.functionName);
  console.log('AWSrequestID =', context.awsRequestId);
  console.log(`Start Intents Handler @ ${today}`);
  console.log(event);
  console.log(`event.bot.name= ${event.bot.name}`);
  try{
    let eventSource = await dispatch(event).catch((err) => { 
        console.log("In main Error handler Function");
        console.log(err);
        errObj=err.errObj;
        throw new Error(err.errorMsg);
      }); 
    
    console.log(eventSource);
    switch(eventSource.type){
      case "Delegate":
            return await lexResponses.delegate(eventSource);           
      case "ElicitSlot":
          return await lexResponses.elicitSlot(eventSource); 
      case "Close":
          return await lexResponses.close(eventSource);
      default:
          console.log(`Error in Lambda Execution`);
          return {
            statusCode: 500,
            error: "Error in Lambda Execution "
            }    
    }//End of SWITCH
  }
  catch(err){
    console.log(err);
    return await lexResponses.close(errObj);
  }


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
