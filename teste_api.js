const axios = require('axios');

const url = "https://evolution-api-latest-3pb6.onrender.com";
const key = "vml2026";

async function investigador() {
    try {
        console.log("> Consultando formato da API...");
        const res = await axios.get(`${url}/instance/fetchInstances`, {
            headers: { 'apikey': key }
        });

        console.log("--- ESTRUTURA REAL DA SUA API ---");
        console.log(JSON.stringify(res.data, null, 2)); // Isso vai mostrar tudo no terminal
        console.log("---------------------------------");

    } catch (e) {
        console.log("> Erro na consulta. Verifique se a KEY 'vml2026' é a Global API Key.");
    }
}

investigador();