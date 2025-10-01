// ===================== Configuração =====================

let ipOrigem = "192.168.15.4"; // IP dinâmico, pode ser alterado
const CIDR_MIN = 1;
const CIDR_MAX = 32;

// ===================== Geração de IP Aleatório =====================

// Gera um octeto aleatório (0-255)
function gerarOcteto() {
    return Math.floor(Math.random() * 256);
}

// Gera um IP aleatório válido (evita alguns ranges especiais)
function gerarIpAleatorio() {
    let ip;
    do {
        const octeto1 = Math.floor(Math.random() * 223) + 1; // 1-223 (evita 0.x.x.x e ranges altos)
        const octeto2 = gerarOcteto();
        const octeto3 = gerarOcteto();
        const octeto4 = Math.floor(Math.random() * 254) + 1; // 1-254 (evita .0 e .255)
        ip = `${octeto1}.${octeto2}.${octeto3}.${octeto4}`;
    } while (ip.startsWith('127.') || ip.startsWith('224.') || ip.startsWith('240.')); // Evita localhost e multicast
    
    return ip;
}

// Atualiza o IP de origem na interface e na variável
function atualizarIpOrigem(novoIp) {
    ipOrigem = novoIp;
    const lbl = document.getElementById("ipOrigem");
    if (lbl) lbl.textContent = `IP de Origem: ${ipOrigem}`;
    
    // Limpa resultados pois mudou o IP de origem
    limparResultados();
}

// ===================== Utilitários de UI =====================

// helptext abaixo do input
function setHelp(id, msg = "", color = "red") {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.color = msg ? color : "";
}

// tooltip no próprio input
function setTooltip(id, msg = "") {
    const el = document.getElementById(id);
    if (!el) return;
    el.title = msg;
}

// marca visual do input inválido (opcional)
function setInvalid(inputEl, isInvalid) {
    if (!inputEl) return;
    inputEl.classList.toggle("input-error", !!isInvalid);
    inputEl.setAttribute("aria-invalid", isInvalid ? "true" : "false");
}

function setTexto(id, texto, color = "") {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = texto;
    el.style.color = color || "";
}

function limparResultados() {
    setTexto("mask-decimal", "---");
    setTexto("same-network", "---");
    // limpa helptexts
    setHelp("mask-help", "");
    setHelp("ip-help", "");
    // limpa estados visuais
    setInvalid(document.getElementById("mask"), false);
    setInvalid(document.getElementById("ip"), false);
}

function mostrarResultados({ mascaraDecimal, mesmaRede }, ipDestino) {
    // limpa mensagens de erro de campos
    setHelp("mask-help", "");
    setHelp("ip-help", "");
    setInvalid(document.getElementById("mask"), false);
    setInvalid(document.getElementById("ip"), false);

    setTexto("mask-decimal", mascaraDecimal, "#059669"); // verde para resultado válido
    setTexto(
        "same-network",
        mesmaRede
        ? `O IP ${ipDestino} ESTÁ na mesma rede que ${ipOrigem}`
        : `O IP ${ipDestino} NÃO está na mesma rede que ${ipOrigem}`,
        mesmaRede ? "#059669" : "#dc2626" // verde para sucesso, vermelho apenas para "não está"
    );
}

// ===================== Validações & Lógica =====================

//Função para devolver o CIDR ou NaN se for inválido
function limparEConverterCidr(cidr) {
    if (cidr === null || cidr === undefined) return { valor: NaN, erro: "Informe a máscara CIDR." };

    const cidrLimpo = String(cidr).trim().replace(/^\s*\/?/, "");
    if (cidrLimpo === "") return { valor: NaN, erro: "Informe a máscara CIDR." };
    
    // Verifica se contém apenas dígitos (sem pontos, letras, símbolos)
    if (!/^\d+$/.test(cidrLimpo)) {
        return { valor: NaN, erro: "Máscara deve conter apenas números." };
    }
    
    const cidrNumero = Number(cidrLimpo);
    
    // Verifica se é um número válido (redundante, mas por segurança)
    if (isNaN(cidrNumero)) {
        return { valor: NaN, erro: "Máscara deve ser um número." };
    }
    
    // Verifica se é um número inteiro
    if (!Number.isInteger(cidrNumero)) {
        return { valor: NaN, erro: "Máscara deve ser um número inteiro." };
    }
    
    // Verifica o range
    if (cidrNumero < CIDR_MIN) {
        return { valor: NaN, erro: `Máscara deve ser maior ou igual a ${CIDR_MIN}.` };
    }
    
    if (cidrNumero > CIDR_MAX) {
        return { valor: NaN, erro: `Máscara deve ser menor ou igual a ${CIDR_MAX}.` };
    }

    return { valor: cidrNumero, erro: null };
}

//Função para converter CIDR (1-32) em máscara decimal ponto (Ex.: 255.255.255.0)
function cidrParaDecimal(cidr) {
    if (!Number.isInteger(cidr) || cidr < CIDR_MIN || cidr > CIDR_MAX) {
        throw new Error(`CIDR inválido. Use um inteiro entre ${CIDR_MIN} e ${CIDR_MAX}.`);
    } //Validação: só aceita inteiro entre 1 e 32. Se cidr for string, NaN, negativo ou > 32, lança erro.
    const mascaraBin = "1".repeat(cidr).padEnd(32, "0"); //Cria uma string binária com cidr vezes o número 1, e completa até 32 bits com zeros (Ex: /24 → "11111111111111111111111100000000")
    const octetos = mascaraBin.match(/.{1,8}/g); //Divide essa string em blocos de 8 bits (4 blocos = 4 octetos) (Ex: ["11111111","11111111","11111111","00000000"])
    return octetos.map(octeto => parseInt(octeto, 2)).join("."); //Converte cada bloco binário para decimal e junta com ponto (Ex.:"255.255.255.0") 
}

//Função para converter IP (Ex.: "192.168.1.10") em número inteiro de 32 bits(0 a 4.294.967.295)
function ipParaInteiro(ip) {

    if (typeof ip !== "string") throw new Error("IP inválido: valor não é texto.");
    const ipTrim = ip.trim();
    if (!ipTrim) throw new Error("Informe o IP de destino.");

    const octetos = ipTrim.split("."); //Divide o IP em 4 partes pelo ponto (Ex.: "192.168.1.10" → ["192","168","1","10"])
    if (octetos.length !== 4) throw new Error(`IP inválido: ${ip}`); //Garante que existem exatos 4 octetos. Se não, lança erro

    let acumulador = 0; //Acumulador que vai construir o inteiro de 32 bits
    for (const octeto of octetos) {
        if (!/^\d+$/.test(octeto)) throw new Error(`Octeto inválido`); //Valida que o octeto tem apenas dígitos (sem sinais, espaços, letras)
        const valorOcteto = parseInt(octeto, 10); //Converte para número em base 10
        if (valorOcteto < 0 || valorOcteto > 255) throw new Error(`Octeto fora do intervalo (0–255): ${octeto}`); //Checa o intervalo válido de um octeto IPv4 (0-255)
        acumulador = (acumulador << 8) + valorOcteto; //Desloca o acumulador 8 bits à esquerda (abre espaço para o próximo octeto) e soma o valor do octeto atual.
    }
    return acumulador >>> 0; //Retorna o acumulador convertido para inteiro de 32 bits sem sinal, garantindo que nunca fique negativo (Ex: "192.168.1.10" → 3232235786)
}

//Função principal
function verificarRede(ipDestino, cidrEntrada) {
    const resultadoCidr = typeof cidrEntrada === "number" ? { valor: cidrEntrada, erro: null } : limparEConverterCidr(cidrEntrada); //Se já for número, usa direto. Se for string, chama limparEConverterCidr para transformar em número inteiro
    
    if (Number.isNaN(resultadoCidr.valor)) {
        throw new Error(resultadoCidr.erro || "CIDR inválido.");
    }
    
    const cidrNumero = resultadoCidr.valor;
    const mascaraDecimal = cidrParaDecimal(cidrNumero); //Converte o CIDR em decimal (Ex: 24 → 255.255.255.0)
    const ipDestinoInt = ipParaInteiro(ipDestino); //Valida e converte o IP de destino para um inteiro de 32 bit
    const ipOrigemInt = ipParaInteiro(ipOrigem); //Valida e converte o IP de origem para um inteiro de 32 bit
    const mascaraInt = ipParaInteiro(mascaraDecimal); //Valida e converte a máscara em Decimal para um inteiro de 32 bit

    const redeDestino = ipDestinoInt & mascaraInt; //& é o operador AND bit a bit (Ex: 192.168.1.10 & 255.255.255.0 → 192.168.1.0)
    const redeOrigem = ipOrigemInt & mascaraInt;

    return {
        ipOrigem,
        mascaraDecimal,
        mesmaRede: redeDestino === redeOrigem
    };
}
 
// ===================== Integração com o HTML =====================

function calcular() {
    const ipInput = document.getElementById("ip");
    const maskInput = document.getElementById("mask");

    const ipDestino = ipInput?.value ?? "";
    const cidrRaw = maskInput?.value ?? "";

    // limpa mensagens anteriores para recalcular
    setHelp("mask-help", "");
    setHelp("ip-help", "");
    setInvalid(maskInput, false);
    setInvalid(ipInput, false);

    // validação do CIDR (helptext + visual)
    const resultadoCidr = limparEConverterCidr(cidrRaw);
    if (Number.isNaN(resultadoCidr.valor)) {
        const msg = resultadoCidr.erro || "CIDR inválido.";
        setHelp("mask-help", msg);
        setInvalid(maskInput, true);
        // não prossegue até o usuário corrigir
        return;
    }
    
    const cidr = resultadoCidr.valor;

    // validação do IP (helptext + visual)
    try {
        ipParaInteiro(ipDestino);
    } catch (e) {
        const msg = e.message || "IP inválido.";
        setHelp("ip-help", msg);
        setInvalid(ipInput, true);
        return;
    }

    // se chegou aqui, entradas válidas → calcula e mostra resultados
    try {
        const resultado = verificarRede(ipDestino, cidr);
        mostrarResultados(resultado, ipDestino.trim());
    } catch (e) {
        // fallback geral (não deve ocorrer com as validações acima)
        setHelp("ip-help", e.message || "Erro desconhecido.");
        setInvalid(ipInput, true);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const lbl = document.getElementById("ipOrigem");
    if (lbl) lbl.textContent = `IP de Origem: ${ipOrigem}`;

    const btn = document.getElementById("calculate");
    if (btn) btn.addEventListener("click", calcular);
    
    // Botão para gerar IP aleatório
    const generateBtn = document.getElementById("generateIp");
    if (generateBtn) {
        generateBtn.addEventListener("click", () => {
            const novoIp = gerarIpAleatorio();
            atualizarIpOrigem(novoIp);
            
            // Efeito visual de “carregando”
            generateBtn.textContent = "🔄 Gerando...";
            generateBtn.disabled = true;
            
            setTimeout(() => {
                generateBtn.textContent = "🎲 Gerar";
                generateBtn.disabled = false;
            }, 300);
        });
    }

    const ipInput = document.getElementById("ip");
    const maskInput = document.getElementById("mask");
    
    // Validação em tempo real para o campo CIDR
    if (maskInput) {
        maskInput.addEventListener("input", () => {
            const cidrRaw = maskInput.value;
            
            // Limpa validações anteriores
            setHelp("mask-help", "");
            setInvalid(maskInput, false);
            
            // Se o campo não está vazio, valida
            if (cidrRaw.trim() !== "") {
                const resultadoCidr = limparEConverterCidr(cidrRaw);
                if (Number.isNaN(resultadoCidr.valor)) {
                    const msg = resultadoCidr.erro || "CIDR inválido.";
                    setHelp("mask-help", msg);
                    setInvalid(maskInput, true);
                }
            }
        });
        
        // Validação quando o campo perde o foco
        maskInput.addEventListener("blur", () => {
            const cidrRaw = maskInput.value;
            
            if (cidrRaw.trim() !== "") {
                const resultadoCidr = limparEConverterCidr(cidrRaw);
                if (Number.isNaN(resultadoCidr.valor)) {
                    const msg = resultadoCidr.erro || "CIDR inválido.";
                    setHelp("mask-help", msg);
                    setInvalid(maskInput, true);
                }
            }
        });
    }
    
    // Validação em tempo real para o campo IP
    if (ipInput) {
        ipInput.addEventListener("input", () => {
            const ipDestino = ipInput.value;
            
            // Limpa validações anteriores
            setHelp("ip-help", "");
            setInvalid(ipInput, false);
            
            // Se o campo não está vazio, valida
            if (ipDestino.trim() !== "") {
                try {
                    ipParaInteiro(ipDestino);
                } catch (e) {
                    const msg = e.message || "IP inválido.";
                    setHelp("ip-help", msg);
                    setInvalid(ipInput, true);
                }
            }
        });
        
        // Validação quando o campo perde o foco
        ipInput.addEventListener("blur", () => {
            const ipDestino = ipInput.value;
            
            if (ipDestino.trim() !== "") {
                try {
                    ipParaInteiro(ipDestino);
                } catch (e) {
                    const msg = e.message || "IP inválido.";
                    setHelp("ip-help", msg);
                    setInvalid(ipInput, true);
                }
            }
        });
    }
    
    // Event listeners para Enter nos campos
    [ipInput, maskInput].forEach(el => {
        if (!el) return;
        el.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter") {
                ev.preventDefault();
                calcular();
            }
        });
    });

    limparResultados();
});