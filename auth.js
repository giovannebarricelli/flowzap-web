const API_URL = "https://evolution-api-latest-3pb6.onrender.com"; 
const GLOBAL_KEY = "vml2026"; 

// Nossa Cifra de Tradução
const cifra = {
    "10": "V", "20": "M", "30": "L", "40": "-", "50": "O", 
    "60": "f", "70": "i", "80": "c", "90": "a", "00": "l"
};

function traduzirToken(token) {
    let resultado = "";
    for (let i = 0; i < token.length; i += 2) {
        let par = token.substring(i, i + 2);
        resultado += cifra[par] || ""; 
    }
    return resultado;
}

async function verificarAcesso() {
    const token = document.getElementById('tokenInput')?.value || document.getElementById('instanceName')?.value;
    const msg = document.getElementById('mensagem');
    const btn = document.getElementById('btn-login');

    if (!token) {
        alert("Digite a Chave!");
        return;
    }

    const instanciaAlvo = traduzirToken(token.trim());
    console.log("Buscando instância:", instanciaAlvo);

    try {
        // Usando a lógica que funcionou no terminal
        const response = await fetch(`${API_URL}/instance/fetchInstances`, {
            method: 'GET',
            headers: { 'apikey': GLOBAL_KEY }
        });

        const data = await response.json();
        
        // Se a API mandar um objeto em vez de array, transformamos em array (Lógica do Node)
        const lista = Array.isArray(data) ? data : (data.instances || [data]);

        // Busca profunda: olha o nome em qualquer nível do objeto
        const encontrou = lista.find(i => {
            const nomeObj = i.instanceName || i.name || (i.instance && i.instance.instanceName);
            return nomeObj === instanciaAlvo;
        });

        if (encontrou) {
            sessionStorage.setItem('logado', 'true');
            sessionStorage.setItem('instancia_ativa', instanciaAlvo);
            window.location.href = "index.html";
        } else {
            // Se não achou, mostra o que a API devolveu no console para debug
            console.log("Resposta da API:", data);
            alert("CHAVE INVÁLIDA: Instância não encontrada no servidor.");
        }
    } catch (e) {
        console.error("Erro de conexão:", e);
        alert("ERRO DE REDE: Verifique se o Render está online.");
    }
}