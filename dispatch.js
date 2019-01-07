
module.exports = (intentRequest) => {
    // Return new promise
    return new Promise((resolve, reject) => {
     // Do async job
     const intentName = intentRequest.currentIntent.name;
     const userID = intentRequest.userId; 
     console.log(`UserId: ${userID} intentName: ${intentName}`);
     if(intentName === 'placeNewOrder'){
         resolve(`Promise resolved ${intentName} was invoked`);

     }
     else{
         reject(err, `Intent ${intentName} is not supported yet`)
     }
    });
}