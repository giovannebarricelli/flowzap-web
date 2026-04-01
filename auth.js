const API_URL = "https://evolution-api-latest-3pb6.onrender.com"; 
const GLOBAL_ADM_KEY = "vml2026"; 

async function verificarAcesso() {
    const instance = document.getElementById('instanceName').value.trim();
    const msg = document.getElementById('mensagem');
    const btn = document.getElementById('btn-login');

    if (!instance) {
        msg.innerText = ">> Digite o nome da instância!";
        return;
    }

    btn.innerText = "VERIFICANDO...";

    try {
        // Buscamos todas as instâncias usando sua chave de ADM
        const response = await fetch(`${API_URL}/instance/fetchInstances`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'apikey': GLOBAL_ADM_KEY 
            }
        });

        const data = await response.json();
        
        // Verificamos se a instância digitada está na lista (data pode ser Array ou Objeto)
        const lista = Array.isArray(data) ? data : [data];
        const encontrou = lista.find(i => i.instanceName === instance || i.name === instance);

        if (encontrou) {
            msg.innerText = ">> ACESSO LIBERADO!";
            sessionStorage.setItem('logado', 'true');
            sessionStorage.setItem('instancia_ativa', instance);
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            msg.innerText = ">> Instância não encontrada na sua API.";
            btn.innerText = "TENTAR NOVAMENTE";
        }
    } catch (error) {
        msg.innerText = ">> Erro de Conexão. Verifique o console.";
        console.error("Erro detalhado:", error);
        btn.innerText = "TENTAR NOVAMENTE";
    }
}