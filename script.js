/**
 * VERIFICADOR DE IP E REDE
 * ======================
 * 
 * Software acadêmico para análise de redes de computadores
 * Verifica se dois endereços IP estão na mesma rede com base na máscara CIDR
 * 
 * @author Anita, Guilherme, Karina e Lívia
 * @course Redes de Computadores - IESB
 * @version 1.0
 * @date 2025
 * 
 * Funcionalidades:
 * - Geração de IP aleatório para origem
 * - Validação em tempo real de entradas
 * - Conversão CIDR para máscara decimal
 * - Verificação de pertencimento à mesma rede
 * - Interface responsiva com feedback visual
 */

// ===================== Configuração =====================

/** @type {string} IP de origem padrão (pode ser alterado dinamicamente) */
let ipOrigem = "192.168.15.4";

/** @type {number} Valor mínimo permitido para CIDR */
const CIDR_MIN = 1;

/** @type {number} Valor máximo permitido para CIDR */
const CIDR_MAX = 32;

// ===================== Geração de IP Aleatório =====================

/**
 * Gera um octeto aleatório válido para endereço IPv4
 * @returns {number} Número entre 0 e 255
 * @example
 * const octeto = gerarOcteto(); // 192
 */
function gerarOcteto() {
    return Math.floor(Math.random() * 256);
}

/**
 * Gera um endereço IP aleatório válido, evitando ranges especiais
 * Evita: localhost (127.x), multicast (224.x-240.x), e endereços .0/.255
 * @returns {string} Endereço IP no formato "xxx.xxx.xxx.xxx"
 * @example
 * const ip = gerarIpAleatorio(); // "192.168.1.100"
 */
function gerarIpAleatorio() {
    let ip;
    do {
        // Primeiro octeto: 1-223 (evita ranges especiais)
        const octeto1 = Math.floor(Math.random() * 223) + 1;
        const octeto2 = gerarOcteto();
        const octeto3 = gerarOcteto();
        // Último octeto: 1-254 (evita .0 e .255)
        const octeto4 = Math.floor(Math.random() * 254) + 1;
        ip = `${octeto1}.${octeto2}.${octeto3}.${octeto4}`;
    } while (ip.startsWith('127.') || ip.startsWith('224.') || ip.startsWith('240.'));
    
    return ip;
}

/**
 * Atualiza o IP de origem na interface e limpa resultados anteriores
 * @param {string} novoIp - Novo endereço IP de origem
 * @example
 * atualizarIpOrigem("10.0.0.1");
 */
function atualizarIpOrigem(novoIp) {
    ipOrigem = novoIp;
    const lbl = document.getElementById("ipOrigem");
    if (lbl) lbl.textContent = `IP de Origem: ${ipOrigem}`;
    
    // Limpa resultados pois mudou o contexto
    limparResultados();
}

// ===================== Utilitários de UI =====================

/**
 * Exibe mensagem de ajuda abaixo de um elemento input
 * @param {string} id - ID do elemento de ajuda (formato: inputId + "-help")
 * @param {string} [msg=""] - Mensagem a exibir (vazio para limpar)
 * @param {string} [color="red"] - Cor do texto da mensagem
 * @example
 * setHelp("ip-help", "Formato inválido", "red");
 * setHelp("mask-help", ""); // limpa a mensagem
 */
function setHelp(id, msg = "", color = "red") {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.color = msg ? color : "";
}

/**
 * Aplica estilo visual de erro a um elemento input
 * @param {HTMLElement} inputEl - Elemento input a ser marcado
 * @param {boolean} isInvalid - Se true, aplica estilo de erro; se false, remove
 * @example
 * const input = document.getElementById("ip");
 * setInvalid(input, true); // marca como inválido
 * setInvalid(input, false); // remove marcação
 */
function setInvalid(inputEl, isInvalid) {
    if (!inputEl) return;
    inputEl.classList.toggle("input-error", !!isInvalid);
    inputEl.setAttribute("aria-invalid", isInvalid ? "true" : "false");
}

/**
 * Define texto e cor de um elemento de resultado
 * @param {string} id - ID do elemento
 * @param {string} texto - Texto a exibir
 * @param {string} [color=""] - Cor do texto (vazio para padrão)
 * @example
 * setTexto("mask-decimal", "255.255.255.0", "#059669");
 */
function setTexto(id, texto, color = "") {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = texto;
    el.style.color = color || "";
}

/**
 * Limpa todos os resultados e estados de validação da interface
 * Remove mensagens de erro, resultados anteriores e estilos visuais
 * @example
 * limparResultados(); // Limpa toda a interface
 */
function limparResultados() {
    setTexto("mask-decimal", "---");
    setTexto("same-network", "---");
    setHelp("mask-help", "");
    setHelp("ip-help", "");
    setInvalid(document.getElementById("mask"), false);
    setInvalid(document.getElementById("ip"), false);
}

/**
 * Exibe os resultados da verificação de rede na interface
 * @param {Object} resultado - Objeto com os resultados da verificação
 * @param {string} resultado.mascaraDecimal - Máscara em formato decimal
 * @param {boolean} resultado.mesmaRede - Se os IPs estão na mesma rede
 * @param {string} ipDestino - IP de destino para exibição
 * @example
 * const resultado = {mascaraDecimal: "255.255.255.0", mesmaRede: true};
 * mostrarResultados(resultado, "192.168.1.100");
 */
function mostrarResultados({ mascaraDecimal, mesmaRede }, ipDestino) {
    setHelp("mask-help", "");
    setHelp("ip-help", "");
    setInvalid(document.getElementById("mask"), false);
    setInvalid(document.getElementById("ip"), false);

    setTexto("mask-decimal", mascaraDecimal, "#059669"); 
    setTexto(
        "same-network",
        mesmaRede
        ? `O IP ${ipDestino} ESTÁ na mesma rede que ${ipOrigem}`
        : `O IP ${ipDestino} NÃO está na mesma rede que ${ipOrigem}`,
        mesmaRede ? "#059669" : "#dc2626"
    );
}

// ===================== Validações & Lógica =====================

/**
 * Valida e converte entrada CIDR para número inteiro
 * Remove espaços e barras, valida formato e range
 * @param {string|number} cidr - Valor CIDR a ser validado (pode incluir "/")
 * @returns {{valor: number, erro: string|null}} Objeto com valor numérico e possível erro
 * @example
 * limparEConverterCidr("24")     // {valor: 24, erro: null}
 * limparEConverterCidr("/16")    // {valor: 16, erro: null}
 * limparEConverterCidr("abc")    // {valor: NaN, erro: "Máscara deve conter apenas números."}
 * limparEConverterCidr("33")     // {valor: NaN, erro: "Máscara deve ser menor ou igual a 32."}
 */
function limparEConverterCidr(cidr) {
    if (cidr === null || cidr === undefined) return { valor: NaN, erro: "Informe a máscara CIDR." };

    const cidrLimpo = String(cidr).trim().replace(/^\s*\/?/, "");
    if (cidrLimpo === "") return { valor: NaN, erro: "Informe a máscara CIDR." };

    if (!/^\d+$/.test(cidrLimpo)) {
        return { valor: NaN, erro: "Máscara deve conter apenas números." };
    }
    
    const cidrNumero = Number(cidrLimpo);
    
    if (isNaN(cidrNumero)) {
        return { valor: NaN, erro: "Máscara deve ser um número." };
    }
    
    if (!Number.isInteger(cidrNumero)) {
        return { valor: NaN, erro: "Máscara deve ser um número inteiro." };
    }
    
    if (cidrNumero < CIDR_MIN) {
        return { valor: NaN, erro: `Máscara deve ser maior ou igual a ${CIDR_MIN}.` };
    }
    
    if (cidrNumero > CIDR_MAX) {
        return { valor: NaN, erro: `Máscara deve ser menor ou igual a ${CIDR_MAX}.` };
    }

    return { valor: cidrNumero, erro: null };
}

/**
 * Converte notação CIDR em máscara de sub-rede decimal
 * Algoritmo: Cria string binária com CIDR 1s seguidos de 0s, depois converte para decimal
 * @param {number} cidr - Número CIDR entre 1 e 32
 * @returns {string} Máscara no formato "xxx.xxx.xxx.xxx"
 * @throws {Error} Se CIDR estiver fora do range válido
 * @example
 * cidrParaDecimal(24)  // "255.255.255.0"
 * cidrParaDecimal(16)  // "255.255.0.0"
 * cidrParaDecimal(8)   // "255.0.0.0"
 */
function cidrParaDecimal(cidr) {
    if (!Number.isInteger(cidr) || cidr < CIDR_MIN || cidr > CIDR_MAX) {
        throw new Error(`CIDR inválido. Use um inteiro entre ${CIDR_MIN} e ${CIDR_MAX}.`);
    }

    const mascaraBin = "1".repeat(cidr).padEnd(32, "0");
    const octetos = mascaraBin.match(/.{1,8}/g);
    return octetos.map(octeto => parseInt(octeto, 2)).join(".");
}

/**
 * Converte endereço IP string em número inteiro de 32 bits
 * Algoritmo: Divide em octetos, valida cada um (0-255), e usa shift left + soma
 * @param {string} ip - Endereço IP no formato "xxx.xxx.xxx.xxx"
 * @returns {number} Representação numérica do IP (0 a 4.294.967.295)
 * @throws {Error} Se IP for inválido, mal formatado ou octetos fora do range
 * @example
 * ipParaInteiro("192.168.1.1")     // 3232235777
 * ipParaInteiro("10.0.0.1")        // 167772161
 * ipParaInteiro("255.255.255.255") // 4294967295
 */
function ipParaInteiro(ip) {
    if (typeof ip !== "string") throw new Error("IP inválido: valor não é texto.");
    const ipTrim = ip.trim();
    if (!ipTrim) throw new Error("Informe o IP de destino.");

    const octetos = ipTrim.split(".");
    if (octetos.length !== 4) throw new Error(`IP inválido: ${ip}`);

    let acumulador = 0;
    for (const octeto of octetos) {
        if (!/^\d+$/.test(octeto)) throw new Error(`Octeto inválido`);
        const valorOcteto = parseInt(octeto, 10);
        if (valorOcteto < 0 || valorOcteto > 255) throw new Error(`Octeto fora do intervalo (0–255): ${octeto}`);
        acumulador = (acumulador << 8) + valorOcteto;
    }
    return acumulador >>> 0;
}

/**
 * 🎯 FUNÇÃO PRINCIPAL: Verifica se dois IPs estão na mesma rede
 * 
 * Algoritmo de Verificação de Rede:
 * 1. Valida e converte CIDR de entrada
 * 2. Converte CIDR para máscara decimal (ex: 24 → 255.255.255.0)
 * 3. Converte IPs (origem e destino) para representação inteira de 32 bits
 * 4. Converte máscara decimal para inteiro
 * 5. Aplica operação AND bit a bit nos IPs com a máscara
 * 6. Compara os endereços de rede resultantes
 * 
 * @param {string} ipDestino - IP de destino no formato "xxx.xxx.xxx.xxx"
 * @param {string|number} cidrEntrada - Notação CIDR (1-32), aceita string ou número
 * @returns {{ipOrigem: string, mascaraDecimal: string, mesmaRede: boolean}} Resultado completo da verificação
 * @throws {Error} Se CIDR ou IP de destino forem inválidos
 * 
 * @example
 * // IPs na mesma rede /24
 * verificarRede("192.168.1.100", 24)
 * // Retorna: {
 * //   ipOrigem: "192.168.1.50",
 * //   mascaraDecimal: "255.255.255.0",
 * //   mesmaRede: true
 * // }
 * 
 * @example
 * // IPs em redes diferentes
 * verificarRede("10.0.0.1", "24")
 * // Retorna: {
 * //   ipOrigem: "192.168.1.50",
 * //   mascaraDecimal: "255.255.255.0",
 * //   mesmaRede: false
 * // }
 */
function verificarRede(ipDestino, cidrEntrada) {
    const resultadoCidr = typeof cidrEntrada === "number" ? { valor: cidrEntrada, erro: null } : limparEConverterCidr(cidrEntrada);
    
    if (Number.isNaN(resultadoCidr.valor)) {
        throw new Error(resultadoCidr.erro || "CIDR inválido.");
    }
    
    const cidrNumero = resultadoCidr.valor;
    const mascaraDecimal = cidrParaDecimal(cidrNumero);
    const ipDestinoInt = ipParaInteiro(ipDestino);
    const ipOrigemInt = ipParaInteiro(ipOrigem);
    const mascaraInt = ipParaInteiro(mascaraDecimal);

    const redeDestino = ipDestinoInt & mascaraInt;
    const redeOrigem = ipOrigemInt & mascaraInt;

    return {
        ipOrigem,
        mascaraDecimal,
        mesmaRede: redeDestino === redeOrigem
    };
}
 
// ===================== Integração com o HTML =====================

/**
 * 🎯 CONTROLADOR PRINCIPAL: Executa validação e cálculo quando usuário clica "Verificar"
 * 
 * Fluxo de Execução:
 * 1. Obtém valores dos campos de entrada (IP e CIDR)
 * 2. Limpa validações anteriores
 * 3. Valida CIDR em tempo real
 * 4. Valida formato do IP de destino
 * 5. Se válidos, executa verificação de rede
 * 6. Exibe resultados ou erros na interface
 * 
 * @example
 * // Chamada automática pelo evento de clique do botão "Verificar"
 * calcular();
 */
function calcular() {
    const ipInput = document.getElementById("ip");
    const maskInput = document.getElementById("mask");

    const ipDestino = ipInput?.value ?? "";
    const cidrRaw = maskInput?.value ?? "";

    setHelp("mask-help", "");
    setHelp("ip-help", "");
    setInvalid(maskInput, false);
    setInvalid(ipInput, false);

    const resultadoCidr = limparEConverterCidr(cidrRaw);
    if (Number.isNaN(resultadoCidr.valor)) {
        const msg = resultadoCidr.erro || "CIDR inválido.";
        setHelp("mask-help", msg);
        setInvalid(maskInput, true);

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

    try {
        const resultado = verificarRede(ipDestino, cidr);
        mostrarResultados(resultado, ipDestino.trim());
    } catch (e) {
        // fallback geral (não deve ocorrer com as validações acima)
        setHelp("ip-help", e.message || "Erro desconhecido.");
        setInvalid(ipInput, true);
    }
}

// ===================== INICIALIZAÇÃO DA APLICAÇÃO =====================

/**
 * 🚀 INICIALIZADOR: Configura todos os event listeners quando o DOM está pronto
 * 
 * Configurações realizadas:
 * - Exibe IP de origem inicial
 * - Configura clique do botão "Verificar"
 * - Configura geração de IP aleatório com feedback visual
 * - Configura validação em tempo real dos campos
 * - Configura tecla Enter para executar verificação
 * - Limpa interface inicial
 */
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