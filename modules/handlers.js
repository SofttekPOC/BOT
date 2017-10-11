"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter'),
    postbacks = require('./postbacks');

exports.hi = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Hello, ${response.first_name}!`}, sender);
    });
};

exports.help = (sender) => {
    messenger.send({text: `You can ask me questions like "H-E-B in Monterrey", "Stores in Monterrey"`}, sender);
};

exports.searchSucursal_City = (sender, values) => {        
    messenger.send({text: `Stores in ${values[1]}`}, sender);        
    salesforce.findSucursal({city: values[1]}).then(sucursal => {               
        messenger.send(formatter.formatSucursal(sucursal), sender);        
    });
}; 

exports.searchProducts_Offers = (sender) => {        
    messenger.send({text: `Products in Offer`}, sender);    
    salesforce.searchProducts().then(product => {               
        messenger.send(formatter.formatproduct(product), sender);        
    });
};
