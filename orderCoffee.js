'use strict';

module.exports = async (intentRequest) => {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        console.log(intentRequest);
        let coffeeType=null, coffeeSize=null;
        const source = intentRequest.invocationSource;
        let sourceDetails =  {
            "sessionAt": intentRequest.sessionAttributes,
            "slots": intentRequest.currentIntent.slots
        };
        /*
        coffeeType is set as Required on Console
        coffeeSize is optional hence set a default value
        */
        coffeeType = intentRequest.currentIntent.slots.coffeeType;
        coffeeSize = intentRequest.currentIntent.slots.size;
        if(coffeeSize==null){
            coffeeSize='medium';
            sourceDetails.slots.size=coffeeSize;
        }
        else{
            //pass - As coffeeSize is received via incoming Request
        }
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