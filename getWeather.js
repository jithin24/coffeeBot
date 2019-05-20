'use strict';
const request = require('request');

module.exports = (intentRequest) => {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        let endpoint = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22";
        //Error Testing
        //let endpoint = "https://samples.openweather.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22";
        const source = intentRequest.invocationSource;
        const city=intentRequest.currentIntent.slots.location;
        let sourceDetails =  {
            "type": null,
            "sessionAttributes": intentRequest.sessionAttributes,
            "fulfillmentState": "Fulfilled or Failed",
            "slots": intentRequest.currentIntent.slots,
            "message": {
                "contentType": "PlainText or SSML or CustomPayload",
                "content": "Message to convey to the user. For example, What size pizza would you like?"
                },
            "fulfillmentState": "Fulfilled or Failed",
            "intentName": intentRequest.currentIntent.name
        };
        request(endpoint, { json: true }, (err, res, body) => {
            if (err){ 
                    console.log(err); 
                    sourceDetails.type='Close';
                    sourceDetails.fulfillmentState='Failed';
                    sourceDetails.message.contentType='PlainText';
                    sourceDetails.message.content = `Error on the API endpoint ${err}`;
                    reject({errObj: sourceDetails, errorMsg:`Error on the API endpoint ${err}`});
                }
            else{
                let result=body;
                let appContext = { altMessages: 
                    { html: 
                        "<h1>hello!</h1>"+ 
                        "into your living room with some text<br>" + 
                        "<img src=\"https://www.w3schools.com/images/picture.jpg\" alt=\"Mountain\" style=\"width:300px\">"
                    } 
                };
                sourceDetails.type='Close';
                sourceDetails.fulfillmentState='Fulfilled';
                sourceDetails.message.contentType='CustomPayload';
                sourceDetails.sessionAttributes.appContext=JSON.stringify(appContext);
                //sourceDetails.message.content='The present weather conditions in ' + city + ': ' + JSON.stringify(result.main);
                //sourceDetails.message.content='# QnaBot\nThe Q and A Bot uses [Amazon Lex](https://aws.amazon.com/lex) and [Alexa](https://developer.amazon.com/alexa) to provide a natural language interface for your FAQ knowledge base.'
                console.log(result.weather);
                resolve(sourceDetails);
            }
        });//Request End
    });//Promise end
    
};