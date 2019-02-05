'use strict';
const request = require('request');

module.exports = (intentRequest) => {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        let endpoint = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22";
        const source = intentRequest.invocationSource;
        const city=intentRequest.currentIntent.slots.location;
        let sourceDetails =  {
            "type": null,
            "sessionAttributes": intentRequest.sessionAttributes,
            "fulfillmentState": "Fulfilled or Failed",
            "message": {
                "contentType": "PlainText or SSML or CustomPayload",
                "content": "Message to convey to the user. For example, What size pizza would you like?"
                },
            "fulfillmentState": "Fulfilled or Failed"
        };
        request(endpoint, { json: true }, (err, res, body) => {
            if (err){ 
                    console.log(err); 
                    reject(`There is an error pn the API endpoint ${err}`);
                }
            else{
                let result=body;
                sourceDetails.type='Close';
                sourceDetails.fulfillmentState='Fulfilled';
                sourceDetails.message.contentType='PlainText';
                sourceDetails.message.content='The present weather conditions in ' + city + ': ' + JSON.stringify(result.main);
                console.log(result.weather);
                resolve(sourceDetails);
            }
        });//Request End
    });//Promise end
    
};