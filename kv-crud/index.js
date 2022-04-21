module.exports = async function (context, req) {
    context.log('get key vault secrete');
    
    const { SecretClient } = require("@azure/keyvault-secrets");
    const { DefaultAzureCredential } = require("@azure/identity");

    const credential = new DefaultAzureCredential();

    const keyVaultName = process.env["kv-name"];
    const secretName = process.env["kv-sec-name"];

    const url = "https://" + keyVaultName + ".vault.azure.net";

    const client = new SecretClient(url, credential);

    // Read the secret we created
    const secret = await client.getSecret(secretName);

    context.log("secret: ", secret.value);
}