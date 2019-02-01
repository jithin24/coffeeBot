'use strict';

const coffeeList=['americano', 'expresso', 'Nescafe', 'latte', 'caffenia', 'plain', 'cappucino'];

module.exports = (intentRequest) => {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        let coffeeType, coffeeSize=null;
        let validateCoffeeType, isValidated=false;
        const source = intentRequest.invocationSource;
        let sourceDetails =  {
            "type": null,
            "sessionAttributes": intentRequest.sessionAttributes,
            "slots": intentRequest.currentIntent.slots,
            "message": {
                "contentType": "PlainText or SSML or CustomPayload",
                "content": "Message to convey to the user. For example, What size pizza would you like?"
                }, 
            "intentName": intentRequest.currentIntent.name, 
            "slotToElicit": "slot-name"
        };
        /*
        coffeeType is set as Required on Console
        The coffeeType can only be one that the restaurent can serve
        coffeeSize is optional hence set a default value
        */
        coffeeType = intentRequest.currentIntent.slots.coffeeType;
        if(coffeeType==null){
            //Cannot validate as Slot value isn't captured
            false;
        }
        else{
            isValidated=true;
            if(coffeeList.includes(coffeeType.toLowerCase())){
                //User provided CoffeeType is available for serving
                validateCoffeeType=true;
            }
            else{
                coffeeType=null;
            }
        } 
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
            if(validateCoffeeType && isValidated){
                sourceDetails.type='Delegate';
            }
            else if(!validateCoffeeType && isValidated){
                //Slot ellicitation needs to be triggered for retriving the correct values
                sourceDetails.type='ElicitSlot';
                sourceDetails.message.contentType='PlainText';
                sourceDetails.message.content='Sorry! I would need a proper Coffee type to complete your Order';
                sourceDetails.slotToElicit='coffeeType';
            }
            else{
                sourceDetails.type='Delegate';
            }
            console.log(`Promise resolved ${sourceDetails} have been found successfully`);
            resolve(sourceDetails);
        }
        else{
            reject(`Source ${source} is not supported yet`);
        }
    });
    
};