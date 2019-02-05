'use strict';
const orderCoffee = require('./orderCoffee');
const getWeather = require('./getWeather');

module.exports = (intentRequest) => {
   const intentName = intentRequest.currentIntent.name;
   const userID = intentRequest.userId; 
   console.log(`UserId: ${userID} intentName: ${intentName}`);
   // Return new promise
   return new Promise((resolve, reject) => {
   // Do async job
     //Invoke this block when a New Coffee order needs to be processed
   switch(intentName){ 
      case 'placeNewOrder': 
         orderCoffee(intentRequest).then((evSource)=> {
            console.log(`Promise resolved ${intentName} was invoked`);
            resolve(evSource);
         }).catch((err) => { 
            console.log(err); 
         });
         break;
      case 'getWeather':
         getWeather(intentRequest).then((evSource)=> {
            console.log(`Promise resolved ${intentName} was invoked`);
            resolve(evSource);
         }).catch((err) => { 
            console.log(err); 
         });
         break;
     default:
        reject(`Intent ${intentName} is not supported yet`); 
      }
    });
};