'use strict';
const orderCoffee = require('./orderCoffee');

module.exports = (intentRequest) => {
   const intentName = intentRequest.currentIntent.name;
   const userID = intentRequest.userId; 
   console.log(`UserId: ${userID} intentName: ${intentName}`);
   // Return new promise
    return new Promise((resolve, reject) => {
     // Do async job
     //Invoke this block when a New Coffee order needs to be processed
     if(intentName === 'placeNewOrder'){
         orderCoffee(intentRequest).then((evSource)=> {
            console.log(`Promise resolved ${intentName} was invoked`);
            resolve(evSource);
         }).catch((err) => { 
            console.log(err); 
         });
     }
     else{
        reject(`Intent ${intentName} is not supported yet`); 
     }
    });
}