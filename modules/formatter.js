"use strict";

let moment = require("moment"),
    numeral = require("numeral");

exports.formatSucursal = sucursal => {    
    let elements = [];	
    sucursal.forEach(sucursal => {            
	    elements.push({                
                title: sucursal.get("Name"),                
                subtitle: `${sucursal.get("BillingCity")}, ${sucursal.get("BillingStreet")}`,
		"image_url": sucursal.get("HEB_Front_Picture__c"),
                "buttons":[{
                    "type":"web_url",
                    "url": sucursal.get("HEB_Location__c"),
                    "title":"View Location",
                    "webview_height_ratio": "compact"
                },
		{
                    "type": "postback",
                    "title": "Survey",
                    "payload": "contact_quiz," + sucursal.getId()
                }]
            })       
        }    
    );    
     return {        
         "attachment": {            
             "type": "template",            
             "payload": {                
                 "template_type": "generic",                
                 "elements": elements            
             }        
         }    
     };
};

exports.formaProduct = product => {    
    let elements = [];	
    product.forEach(product => {            
	    elements.push({                
                title: product.get("Name"),                
                subtitle: `${product.get("Name")}`,
            })       
        }    
    );    
     return {        
         "attachment": {            
             "type": "template",            
             "payload": {                
                 "template_type": "generic",                
                 "elements": elements            
             }        
         }    
     };
};

exports.question_1 = sucursal => { 
    	let elements = []; 
	elements.push({ 
		title: "What do you think about our Customer Service?",
		subtitle: "1st Question",
		"buttons": [ 
			{ 
				"type": "postback", 
				 "title": "Good", 
				 "payload": "quiz_1," + "Good"
			},
			{ 
				"type": "postback", 
				 "title": "Regular", 
				 "payload": "quiz_1," + "Regular"
				},
			{ 
				"type": "postback", 
				 "title": "Bad", 
				 "payload": "quiz_1," + "Bad"
			}
		] 
    	}); 
    return { 
        "attachment": { 
             "type": "template", 
             "payload": { 
                "template_type": "generic", 
                "elements": elements 
            } 
        } 
    }; 
};

exports.question_2 = sucursal => { 
	let elements = []; 
	elements.push({ 
		title: "How do you rate our Store's costs?",
		subtitle: "2nd Question",
		"buttons": [ 
				{ 
					"type": "postback", 
					 "title": "High", 
					 "payload": "quiz_2," + "High"
				},
				{ 
					"type": "postback", 
					 "title": "Regular", 
					 "payload": "quiz_2," + "Regular"
				},
				{ 
					"type": "postback", 
					 "title": "Low", 
					 "payload": "quiz_2," + "Low"
				}
			]  
    }); 
    return { 
        "attachment": { 
             "type": "template", 
             "payload": { 
                "template_type": "generic", 
                "elements": elements 
            } 
        } 
    }; 
};

exports.question_3 = sucursal => { 
	let elements = []; 
	elements.push({ 
		title: "Will you continue visiting us for future purchases?",
		subtitle: "3rd Question",
		"buttons": [ 
				{ 
					"type": "postback", 
					 "title": "Yes", 
					 "payload": "quiz," + "Yes"
				},
				{ 
					"type": "postback", 
					 "title": "No", 
					 "payload": "quiz," + "No"
				}
			]  
    }); 
    return { 
        "attachment": { 
             "type": "template", 
             "payload": { 
                "template_type": "generic", 
                "elements": elements 
            } 
        } 
    }; 
};
