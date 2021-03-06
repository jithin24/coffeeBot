'use strict';

function getResponseCard(title, imageUrl, buttons) {
    return {
      contentType: 'application/vnd.amazonaws.card.generic',
      genericAttachments: [
        {
          title,
          imageUrl,
          buttons
        }
      ]
    };
  }


module.exports.delegate = (event) => {
    // Return new promise
    let sessionAttributes=event.sessionAttributes;
    let slots=event.slots;
    let type=event.type;
    return new Promise((resolve, reject) => {
        //Assign and use the ES6 de-spread operator syntax
        resolve ({
            sessionAttributes,
            dialogAction: {
                type,
                slots
            }
        });
    });
};

module.exports.elicitSlot = (event) => {
    // Return new promise
    let sessionAttributes=event.sessionAttributes; 
    let intentName=event.intentName; 
    let slots=event.slots; 
    let slotToElicit=event.slotToElicit; 
    let message=event.message;
    return new Promise((resolve, reject) => {
        let type='ElicitSlot';
        resolve ({
            sessionAttributes,
            dialogAction: {
                type,
                intentName,
                slots, 
                slotToElicit, 
                message
            }
        });
    });
};


module.exports.close = (event) => {
    // Return new promise
    let sessionAttributes=event.sessionAttributes;
    let type=event.type;
    let fulfillmentState=event.fulfillmentState;
    let message=event.message;
    return new Promise((resolve, reject) => {
        //Assign and use the ES6 de-spread operator syntax
        resolve ({
            sessionAttributes,
            dialogAction: {
                type,
                fulfillmentState,
                message
            }
        });
    });
};