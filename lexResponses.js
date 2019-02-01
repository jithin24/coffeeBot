'use strict';

module.exports.delegate = (sessionAttributes, slots) => {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        console.log(`Attributes: ${sessionAttributes} - slots: ${slots}`);
        resolve ({
            sessionAttributes,
            dialogAction: {
                type: 'Delegate',
                slots
            }
        });
    });
}