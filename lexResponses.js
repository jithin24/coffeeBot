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
        console.log(`Attributes: ${sessionAttributes} - slots: ${slots}`);
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
        console.log(`Attributes: ${sessionAttributes} - slots: ${slots}`);
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