const express = require('express')
const crypto = require("crypto-js")
const app = express()
const port = 3000


app.get('/:filename', (req, res) => {


var filename=req.params.filename;
const azure_storage_account="middlewaremulesoftstore";
const azure_storage_key="dqnCabBGCRojPpwlhDr5Xq+pyrAv3TCqdTyCs4qdW+pyZ5/GTE82Wm0n7VHYORGW/wt09n1n3VjQZw/UPsXdYw==";


// Set Date header value for authorization
// Should be UTC GMT string
const header_date= new Date().toUTCString();
console.log(header_date);
// Sadness: https://github.com/postmanlabs/postman-app-support/issues/2922


// Get hash of all header-name:value
const headers = { ignoreCase: true, enabled: true };
console.log(headers);

// Construct Signature value for Authorization header

var signatureRaw = "put".toUpperCase() + "\n" +  
                "\n" +  
               "application/xml" + "\n" +  
               "\n" +  
             
               "x-ms-date:" + header_date+"\n" + 
               "/middlewaremulesoftstore/certificate-processed/"+filename;  

// Now, construct signature raw string

console.log("Signature String", JSON.stringify(signatureRaw));

// Hash it using HMAC-SHA256 and then encode using base64
//const storageKey = azure_storage_key;
const signatureBytes = crypto.HmacSHA256(signatureRaw, crypto.enc.Base64.parse(azure_storage_key));
const signatureEncoded = signatureBytes.toString(crypto.enc.Base64);

console.log("Storage Account", azure_storage_account);
console.log("Storage Key", azure_storage_key);

// Finally, make it available for headers
/*pm.variables.set("header_authorization", 
    `SharedKey ${azure_storage_account)}:${signatureEncoded}`);
  
})*/

const storageObj = { "date": header_date, "authorization": signatureEncoded};
console.log("storageOBj",storageObj);
 res.send(storageObj);
})

app.listen(3000);