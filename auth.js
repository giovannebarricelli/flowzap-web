const API_URL = "https://evolution-api-latest-3pb6.onrender.com"; 
const GLOBAL_ADM_KEY = "vml2026"; 

async function verificarAcesso() {
    const instance = document.getElementById('instanceName').value.trim();
    const msg = document.getElementById('mensagem');
    const btn = document.getElementById('btn-login');

    if (!instance) {
        msg.innerText = ">> Digite a instância!";
        return;
    }

    btn.innerText = "VERIFICANDO...";
    msg.className = "text-yellow-500 text-center text-[10px]";

    try {
        // Buscamos todas as instâncias para garantir que não haverá erro de rota específica
        const response = await fetch(`${API_URL}/instance/fetchInstances`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'apikey': GLOBAL_ADM_KEY 
            }
        });

        const data = await response.json();
        
        // A lógica curinga: procuramos em qualquer lugar do JSON pelo nome da instância
        const lista = Array.isArray(data) ? data : (data.instances || [data]);
        const encontrou = lista.find(i => 
            (i.instanceName === instance) || 
            (i.name === instance) || 
            (i.instance?.instanceName === instance)
        );

        if (encontrou) {
            msg.innerText = ">> ACESSO LIBERADO!";
            msg.className = "text-green-500 text-center text-[10px]";
            
            sessionStorage.setItem('logado', 'true');
            sessionStorage.setItem('instancia_ativa', instance);

            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 1000);
        } else {
            msg.innerText = ">> Instância não encontrada na API.";
            msg.className = "text-red-500 text-center text-[10px]";
            btn.innerText = "TENTAR NOVAMENTE";
        }
    } catch (error) {
        msg.innerText = ">> Erro de comunicação com o Render.";
        msg.className = "text-red-600 text-center text-[10px]";
        console.error(error);
        btn.innerText = "TENTAR NOVAMENTE";
    }
}