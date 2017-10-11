"use strict";

let nforce = require('nforce'),
    SF_CLIENT_ID = process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
    SF_USER_NAME = process.env.SF_USER_NAME,
    SF_PASSWORD = process.env.SF_PASSWORD;

let org = nforce.createConnection({
    clientId: SF_CLIENT_ID,
    clientSecret: SF_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/oauth/_callback',
    mode: 'single',
    autoRefresh: true
});

let login = () => {
    org.authenticate({username: SF_USER_NAME, password: SF_PASSWORD}, err => {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
            console.log("Authentication successful");
        }
    });
};

let createCase2 = (customerName, customerId) => {
    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Case');
        c.set('subject', `Queja de usuario ${customerName} (Facebook Customer)`);
        c.set('description', "Facebook id: " + customerId);
        c.set('origin', 'Facebook Bot');
        c.set('status', 'New');

        org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a case");
            } else {
                resolve(c);
            }
        });
    });
};

let findSucursal = (params) => {   
    let where = "";
    if (params) {
        let parts = [];
        if (params.id) parts.push(`id='${params.id}'`);
        if (params.city) parts.push(`Billingcity='${params.city}'`);
        if (parts.length>0) {
            where = "WHERE " + parts.join(' AND ');
        }
    } 
    return new Promise((resolve, reject) => {        
        let q = `SELECT id,                    
                Name,
		BillingCity,
		BillingStreet,
		Phone,
                HEB_Front_Picture__c,
                HEB_Location__c,
		HEB_City__c
                FROM Account                
                ${where}
                LIMIT 5`;        
        org.query({query: q}, (err, resp) => {            
            if (err) {               
                reject("An error as occurred");            
            } else {               
                resolve(resp.records);            
            }        
        });    
    });
};

let searchProducts = (params) => {   
    let where = "";
    if (params) {
        let parts = [];
        if (params.id) parts.push(`id='${params.id}'`);
        //if (params.offer) parts.push(`HEB_In_Offer__c='${params.offer}'`);
        if (parts.length>0) {
            where = "WHERE " + parts.join(' AND ');
        }
    } 
    return new Promise((resolve, reject) => {        
        let q = `SELECT id,                    
                Name,
		HEB_In_Offer__c,
		HEB_Product_Name__c,
                FROM HEB_Products__c                
                ${where}
                LIMIT 5`;        
        org.query({query: q}, (err, resp) => {            
            if (err) {               
                reject("An error as occurred");            
            } else {               
                resolve(resp.records);            
            }        
        });    
    });
};

let createQuiz = (answers, customerName, customerId) => {
    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Quiz__c');
	c.set('facebook_username__c', customerName);
	c.set('question_1__c', answers[1]);
	c.set('question_2__c', answers[2]);
	c.set('question_3__c', answers[3]);
	c.set('AccountId__c', answers[0]);		

        org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a survey");
            } else {
                resolve(c);
            }
        });
    });
};

login();

exports.org = org;
exports.createCase2 = createCase2;
exports.createQuiz = createQuiz;
exports.findSucursal = findSucursal;
exports.searchProducts = searchProducts;
