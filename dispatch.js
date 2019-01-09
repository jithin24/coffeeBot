'use strict';

module.exports = async (intentRequest) => {
    // Return new promise
    return new Promise((resolve, reject) => {
     // Do async job
     const intentName = intentRequest.currentIntent.name;
     const userID = intentRequest.userId; 
     console.log(`UserId: ${userID} intentName: ${intentName}`);
     if(intentName === 'placeNewOrder'){
        console.log(`Promise resolved ${intentName} was invoked`);
        resolve(intentName);
     }
     else{
        reject(err, `Intent ${intentName} is not supported yet`) 
     }
    });
}