# 🤝 Guia de Contribuição

**Verificador de Sub-redes IP** - *Projeto Acadêmico*

---

## 📘 **Sobre Este Projeto**

Este é um **projeto acadêmico** desenvolvido como trabalho da disciplina de Redes de Computadores do Centro Universitário IESB. Como tal, **contribuições externas não são aceitas** para manter a integridade acadêmica. No entanto, este documento serve como demonstração de boas práticas de desenvolvimento colaborativo.

---

## 👥 **Equipe de Desenvolvimento**

### **Membros Ativos**
- **Anita** - Frontend & Interface
- **Guilherme** - Algoritmos & Validações  
- **Karina** - Lógica de Rede & Documentação
- **Lívia** - UX/UI & Testes

### **Responsabilidades**
- **Code Review**: Todos os membros
- **Documentação**: Karina (lead), todos contribuem
- **Testes**: Lívia (lead), Guilherme (automação)
- **Deploy**: Rotativo semanal

---

## 🔧 **Padrões de Desenvolvimento**

### **Estrutura de Commits**
```
tipo(escopo): descrição

Tipos permitidos:
- feat: nova funcionalidade
- fix: correção de bug
- docs: documentação
- style: formatação
- refactor: refatoração
- test: testes
- chore: manutenção

Exemplos:
feat(validacao): adicionar validação de octetos IPv4
fix(ui): corrigir feedback visual em campos inválidos
docs(readme): atualizar instruções de instalação
```

### **Padrões de Código**

#### **JavaScript**
```javascript
// ✅ BOM
/**
 * Converte CIDR para máscara decimal
 * @param {number} cidr - Valor CIDR (1-32)
 * @returns {string} Máscara decimal
 */
function cidrParaDecimal(cidr) {
    // Implementação...
}

// ❌ RUIM
function conv(c) {
    // Sem documentação nem validação
}
```

#### **CSS**
```css
/* ✅ BOM - Nomenclatura BEM */
.input-section__field--error {
    border-color: #dc2626;
}

/* ❌ RUIM - Sem padrão */
.red {
    border: 1px solid red;
}
```

#### **HTML**
```html
<!-- ✅ BOM - Semântico e acessível -->
<label for="cidr-input">Máscara CIDR:</label>
<input 
    type="number" 
    id="cidr-input" 
    aria-describedby="cidr-help"
    min="1" 
    max="32"
>
<small id="cidr-help" class="help-text"></small>

<!-- ❌ RUIM - Sem semântica -->
<div>CIDR:</div>
<input type="text">
<div class="error"></div>
```

---

## 📝 **Workflow de Desenvolvimento**

### **Branches**
```
main          # Versão estável para apresentação
├── dev       # Desenvolvimento ativo
├── feat/*    # Novas funcionalidades
├── fix/*     # Correções de bugs
└── docs/*    # Atualizações de documentação
```

### **Processo de Review**

1. **Criar Branch**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/nova-funcionalidade
   ```

2. **Desenvolver & Testar**
   - Implementar funcionalidade
   - Adicionar/atualizar testes
   - Atualizar documentação
   - Testar manualmente

3. **Pull Request**
   - Título descritivo
   - Descrição detalhada
   - Screenshots (se UI)
   - Checklist de validação

4. **Code Review**
   - Mínimo 2 aprovações
   - Verificar padrões
   - Testar localmente
   - Aprovar/solicitar mudanças

5. **Merge**
   - Squash commits se necessário
   - Atualizar CHANGELOG
   - Deploy em ambiente de teste

---

## ✅ **Checklist de Qualidade - Alinhado aos Critérios de Avaliação**

### **🔧 Critério 1: Rodar sem bugs (5 pontos) - ELIMINATÓRIO**
- [ ] **Sistema inicia sem erros** no console do navegador
- [ ] **Todos os campos funcionam** corretamente (IP, CIDR, botões)
- [ ] **Validações não travam** o sistema
- [ ] **Cálculos executam** sem falhas
- [ ] **Interface responde** a todas as interações
- [ ] **Compatibilidade testada** em múltiplos navegadores
- [ ] **Sem bugs críticos** que impeçam o funcionamento

### **📚 Critério 2: Código documentado (2 pontos)**
- [ ] **JSDoc completo** em todas as funções principais
- [ ] **Comentários explicativos** nos algoritmos complexos
- [ ] **README detalhado** com instruções de uso
- [ ] **Documentação inline** em trechos críticos
- [ ] **Nomes de variáveis** autodescritivos
- [ ] **Estrutura de código** clara e organizada

### **🧪 Critério 3: Entradas testadas (2 pontos)**
- [ ] **Validação de CIDR**: números 1-32, rejeita inválidos
- [ ] **Validação de IP**: formato xxx.xxx.xxx.xxx, octetos 0-255
- [ ] **Campos vazios** tratados adequadamente
- [ ] **Entradas maliciosas** (caracteres especiais, strings longas)
- [ ] **Casos extremos** (CIDR /1, /32, IP 0.0.0.0, 255.255.255.255)
- [ ] **Feedback de erro** claro para cada tipo de entrada inválida

### **🎯 Critério 4: Software intuitivo (1 ponto)**
- [ ] **Interface clara** e autoexplicativa
- [ ] **Mensagens de erro** compreensíveis
- [ ] **Feedback visual** em campos inválidos
- [ ] **Resultados bem formatados** e coloridos
- [ ] **Botões com tooltips** explicativos
- [ ] **Fluxo de uso** natural e óbvio

### **📈 Extra: Git história do projeto (+1 ponto)**
- [ ] **Commits descritivos** seguindo padrão conventional
- [ ] **Histórico evolutivo** mostra desenvolvimento incremental
- [ ] **Branches organizadas** (main, dev, features)
- [ ] **Tags de versão** marcando marcos importantes
- [ ] **Contribuições balanceadas** entre membros da equipe

### **🌐 Extra: Página WEB (+1 ponto)**
- [ ] **Tecnologias web** (HTML5, CSS3, JavaScript)
- [ ] **Interface responsiva** para diferentes dispositivos
- [ ] **Design profissional** e atrativo
- [ ] **Acessibilidade básica** (ARIA, semântica)
- [ ] **Performance otimizada** para web

---

## 🎯 **Estratégias para Maximizar Pontuação**

### **🔧 Para garantir "Rodar sem bugs" (5 pontos)**
```bash
# Teste em múltiplos navegadores
- Chrome (versão atual)
- Firefox (versão atual) 
- Safari (se disponível)
- Edge (versão atual)

# Teste casos extremos
- CIDR: 1, 32, 0, 33, -1, "abc", "", "/24"
- IP: "0.0.0.0", "255.255.255.255", "192.168.1.256", "192.168", "abc.def.ghi.jkl"
- Sequências: múltiplos cliques, tecla Enter, campos vazios
```

### **📚 Para maximizar "Código documentado" (2 pontos)**
```javascript
/**
 * ✅ EXEMPLO DE DOCUMENTAÇÃO COMPLETA
 * Converte notação CIDR em máscara de sub-rede decimal
 * 
 * Algoritmo: Cria string binária com N 1s seguidos de 0s,
 * divide em 4 octetos e converte cada um para decimal
 * 
 * @param {number} cidr - Número CIDR entre 1 e 32
 * @returns {string} Máscara no formato "xxx.xxx.xxx.xxx"
 * @throws {Error} Se CIDR estiver fora do range válido
 * 
 * @example
 * cidrParaDecimal(24)  // "255.255.255.0"
 * cidrParaDecimal(16)  // "255.255.0.0"
 */
function cidrParaDecimal(cidr) {
    // Validação de entrada com erro descritivo
    if (!Number.isInteger(cidr) || cidr < 1 || cidr > 32) {
        throw new Error(`CIDR inválido. Use um inteiro entre 1 e 32.`);
    }
    
    // Converte CIDR para máscara binária (24 → "11111111111111111111111100000000")
    const mascaraBin = "1".repeat(cidr).padEnd(32, "0");
    
    // Divide em 4 octetos de 8 bits cada
    const octetos = mascaraBin.match(/.{1,8}/g);
    
    // Converte cada octeto binário para decimal e junta com pontos
    return octetos.map(octeto => parseInt(octeto, 2)).join(".");
}
```

### **🧪 Para garantir "Entradas testadas" (2 pontos)**
```javascript
// ✅ EXEMPLO DE VALIDAÇÃO ROBUSTA
function validarEntradas() {
    const testesIP = [
        { input: "192.168.1.1", valid: true },
        { input: "0.0.0.0", valid: true },
        { input: "255.255.255.255", valid: true },
        { input: "192.168.1.256", valid: false, erro: "Octeto > 255" },
        { input: "192.168.1", valid: false, erro: "Menos de 4 octetos" },
        { input: "abc.def.ghi.jkl", valid: false, erro: "Caracteres inválidos" },
        { input: "", valid: false, erro: "Campo vazio" }
    ];
    
    const testesCIDR = [
        { input: "24", valid: true },
        { input: "/16", valid: true },
        { input: "1", valid: true },
        { input: "32", valid: true },
        { input: "0", valid: false, erro: "CIDR < 1" },
        { input: "33", valid: false, erro: "CIDR > 32" },
        { input: "abc", valid: false, erro: "Não é número" },
        { input: "", valid: false, erro: "Campo vazio" }
    ];
}
```

### **🎯 Para maximizar "Software intuitivo" (1 ponto)**
```css
/* ✅ EXEMPLO DE FEEDBACK VISUAL CLARO */
.input-error {
    border: 2px solid #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
}

.help-text {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.result-success {
    color: #059669;
    font-weight: 600;
}

.result-error {
    color: #dc2626;
    font-weight: 600;
}
```

---

## 🧪 **Padrões de Teste**

### **Testes Funcionais**
```javascript
// Exemplo de caso de teste
const testCase = {
    name: "Deve verificar IPs na mesma rede",
    input: {
        ipOrigem: "192.168.1.10",
        ipDestino: "192.168.1.50", 
        cidr: 24
    },
    expected: {
        mesmaRede: true,
        mascaraDecimal: "255.255.255.0"
    }
};
```

### **Testes de Validação**
```javascript
const validationTests = [
    { input: "33", expected: "Máscara deve ser menor ou igual a 32" },
    { input: "abc", expected: "Máscara deve conter apenas números" },
    { input: "", expected: "Informe a máscara CIDR" }
];
```

---

## 📚 **Recursos e Referências**

### **Documentação Técnica**
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript/HTML/CSS
- [JSDoc](https://jsdoc.app/) - Documentação de código
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Acessibilidade

### **Redes de Computadores**
- RFC 791 - Internet Protocol (IP)
- RFC 950 - Internet Standard Subnetting Procedure
- CIDR (Classless Inter-Domain Routing)

### **Ferramentas**
- **Editor**: VS Code com extensões ESLint, Prettier
- **Browser**: Chrome DevTools para debug
- **Git**: Controle de versão
- **Deploy**: GitHub Pages (para demonstração)

---

## 🎓 **Contexto Acadêmico**

### **Objetivos de Aprendizagem**
- [x] Aplicar conceitos de sub-redes na prática
- [x] Desenvolver interface web responsiva
- [x] Implementar validações robustas
- [x] Documentar software adequadamente
- [x] Trabalhar em equipe efetivamente

### **Critérios de Avaliação**

#### **📊 Critérios Principais (10 pontos)**
1. **🔧 Rodar sem bugs** - **5 pontos**
   - Sistema funciona corretamente sem travamentos
   - Não apresenta erros críticos ou falhas
   - ⚠️ **Critério eliminatório**: Se der pau, travou ou não rodou → **nota 0**

2. **📚 Código documentado** - **2 pontos**
   - Comentários explicativos no código
   - Documentação JSDoc nas funções principais
   - README com instruções claras

3. **🧪 Entradas testadas** - **2 pontos**
   - Validação de inputs do usuário
   - Tratamento de casos extremos
   - Testes com entradas inválidas

4. **🎯 Software intuitivo** - **1 ponto**
   - Interface amigável e clara
   - Mensagens de feedback adequadas
   - Usabilidade para o usuário final

#### **🏆 Pontos Extras (2 pontos)**
5. **📈 Git contar a história do projeto** - **+1 ponto**
   - Commits organizados e descritivos
   - Histórico que demonstra evolução do projeto
   - Uso adequado de branches e versionamento

6. **🌐 Página WEB** - **+1 ponto**  
   - Implementação em tecnologias web
   - Interface acessível via navegador
   - Design responsivo e profissional

#### **💯 Pontuação Total Máxima: 12 pontos**

---

## 📄 **Licença Acadêmica**

Este projeto é desenvolvido exclusivamente para fins educacionais como parte do curso de Análise e Desenvolvimento de Sistemas do Centro Universitário IESB. O código é disponibilizado sob licença MIT para demonstração de boas práticas, mas as contribuições são restritas aos membros da equipe acadêmica.

---

**Última Atualização**: Outubro 2025  
**Versão**: 1.0  
**Status**: Em desenvolvimento ativo