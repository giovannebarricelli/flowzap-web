const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_CONFIG = {
    url: "https://evolution-api-latest-3pb6.onrender.com",
    key: "vml2026"
};

// Cifra de tradução do Token para a Instância real
const cifra = { "10": "V", "20": "M", "30": "L", "40": "-", "50": "O", "60": "f", "70": "i", "80": "c", "90": "a", "00": "l" };

app.post('/verificar', async (req, res) => {
    const { token } = req.body;
    let instanciaAlvo = "";
    for (let i = 0; i < token.length; i += 2) {
        instanciaAlvo += cifra[token.substring(i, i + 2)] || "";
    }

    try {
        const response = await axios.get(`${API_CONFIG.url}/instance/fetchInstances`, {
            headers: { 'apikey': API_CONFIG.key }
        });

        const data = response.data;
        const lista = Array.isArray(data) ? data : (data.instances || []);
        
        // Procura se a instância traduzida existe na sua API
        const encontrado = lista.find(i => {
            const nome = i.instanceName || i.name || (i.instance && i.instance.instanceName);
            return nome === instanciaAlvo;
        });

        if (encontrado) {
            res.json({ liberado: true, instance: instanciaAlvo });
        } else {
            res.status(401).json({ liberado: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro na API Evolution" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Cérebro rodando na porta ${PORT}`));