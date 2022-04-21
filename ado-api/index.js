module.exports = async function (context, req) {

    const { SecretClient } = require("@azure/keyvault-secrets");
    const { DefaultAzureCredential } = require("@azure/identity");

    const credential = new DefaultAzureCredential();

    const keyVaultName = process.env["kv-name"];
    const secretName = process.env["kv-sec-name"];
    const fetch = require('node-fetch');


    const url = "https://" + keyVaultName + ".vault.azure.net";

    const client = new SecretClient(url, credential);

    // Read the secret we created
    const secret = await client.getSecret(secretName);
    
    const authheaders = {
        'Bearer' : secret.value
    };

        
    var responseMessage = "none";

    const response = await fetch('https://dev.azure.com/vuvasira/adms-samples/_apis/policy/configurations?api-version=7.1-preview.1', { method : 'GET' , headers : authheaders});
    

    context.log('status:' + response.status);

    try {
        responseMessage  = await response.body;
        context.log('response body:' + responseMessage);
    } catch (error) {
        
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
  
}