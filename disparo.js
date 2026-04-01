const API_URL = "https://evolution-api-latest-3pb6.onrender.com";
const GLOBAL_KEY = "vml2026";

async function iniciarDisparo() {
    const numerosRaw = document.getElementById('numeros').value;
    const msgTexto = document.getElementById('mensagem_texto').value;
    const instancia = sessionStorage.getItem('instancia_ativa');
    const logContainer = document.getElementById('logs');
    const btn = document.getElementById('btn-disparo');

    if (!numerosRaw || !msgTexto) {
        alert("Preencha os números e a mensagem!");
        return;
    }

    const listaNumeros = numerosRaw.split('\n').filter(n => n.trim() !== "");
    btn.disabled = true;
    btn.innerText = "DISPARANDO...";

    for (let numero of listaNumeros) {
        numero = numero.trim();
        const p = document.createElement('p');
        p.innerText = `> Enviando para ${numero}...`;
        logContainer.prepend(p);

        try {
            const response = await fetch(`${API_URL}/message/sendText/${instancia}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': GLOBAL_KEY
                },
                body: JSON.stringify({
                    number: numero,
                    text: msgTexto
                })
            });

            if (response.ok) {
                p.innerText = `> [OK] ${numero} enviado!`;
                p.className = "text-green-500";
            } else {
                p.innerText = `> [ERRO] ${numero} falhou.`;
                p.className = "text-red-500";
            }
        } catch (e) {
            p.innerText = `> [ERRO] Falha de conexão.`;
        }
        
        // Delay de 3 segundos entre envios para não tomar ban no WhatsApp
        await new Promise(r => setTimeout(r, 3000));
    }

    btn.disabled = false;
    btn.innerText = "INICIAR NOVO DISPARO";
}