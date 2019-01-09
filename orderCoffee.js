'use strict';

module.exports = async (intentRequest) => {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        console.log(intentRequest);
        const source = intentRequest.invocationSource;
        const sourceDetails =  {
            "sessionAt": intentRequest.sessionAttributes,
            "slots": intentRequest.currentIntent.slots
        };
        let coffeeType = intentRequest.currentIntent.slots.coffeeType;
        let coffeeSize = intentRequest.currentIntent.slots.size;
        console.log(`Slots captured  coffeeType: ${coffeeType} - coffeeSize: ${coffeeSize}`);

        if(source === 'DialogCodeHook'){
            console.log(`Promise resolved ${sourceDetails} have been found successfully`);
            resolve(sourceDetails);
        }
        else{
            reject(err, `Source ${source} is not supported yet`);
        }
    });
    
    //if(source === 'DialogCodeHook'){
    //    return callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    //}
}