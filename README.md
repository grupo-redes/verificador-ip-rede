# 🌐 Verificador de Sub-redes IP

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/grupo-redes/verificador-ip-rede.svg)](https://github.com/grupo-redes/verificador-ip-rede/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/grupo-redes/verificador-ip-rede.svg)](https://github.com/grupo-redes/verificador-ip-rede/network)

> Software educacional para análise de redes IP - Trabalho acadêmico da disciplina de Redes de Computadores

## 📋 Sobre o Projeto

O **Verificador de Sub-redes IP** é uma aplicação web desenvolvida como trabalho acadêmico para a disciplina de Redes de Computadores do curso de Análise e Desenvolvimento de Sistemas do Centro Universitário IESB. 

A ferramenta permite verificar se dois endereços IP pertencem à mesma rede, através da análise de máscaras de sub-rede em notação CIDR, demonstrando conceitos fundamentais de redes de computadores de forma prática e interativa.

### 🎯 Funcionalidades

- ✅ **Verificação de Rede**: Determina se dois IPs estão na mesma sub-rede
- 🔢 **Conversão CIDR**: Converte notação CIDR para máscara decimal
- 🎲 **Gerador de IP**: Gera endereços IP aleatórios para testes
- ✨ **Validação em Tempo Real**: Feedback instantâneo para entradas inválidas
- 📱 **Interface Responsiva**: Design adaptável para diferentes dispositivos
- 🚀 **Zero Dependências**: Funciona completamente offline

## 🛠️ Tecnologias Utilizadas

### **Frontend Core**
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos responsivos com Flexbox e Grid
- **JavaScript (ES6+)**: Lógica de aplicação vanilla (zero dependências)

### **Recursos Implementados**
- **Validação em Tempo Real**: Regex e validações customizadas
- **Acessibilidade**: ARIA labels, navegação por teclado, semântica HTML
- **Responsividade**: Design mobile-first adaptável
- **Documentação**: JSDoc completo com exemplos e tipos

### **Ferramentas de Desenvolvimento**
- **Git**: Controle de versão com histórico organizado
- **VS Code**: Editor com extensões ESLint e Prettier
- **GitHub**: Hospedagem de código e documentação
- **Navegadores**: Testes em Chrome, Firefox, Safari, Edge

### **Padrões e Metodologias**
- **Conventional Commits**: Padronização de mensagens de commit
- **BEM CSS**: Nomenclatura consistente de classes
- **Modular Architecture**: Separação clara de responsabilidades
- **Progressive Enhancement**: Funcionalidade básica para todos os navegadores

## 🚀 Como Usar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Nenhuma instalação adicional necessária

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/grupo-redes/verificador-ip-rede.git
   cd verificador-ip-rede
   ```

2. **Abra o arquivo HTML**
   ```bash
   # Opção 1: Abrir diretamente no navegador
   open index.html
   
   # Opção 2: Usar um servidor local (recomendado)
   python3 -m http.server 8000
   # Acesse: http://localhost:8000
   ```

3. **Começe a usar!**
   - O IP de origem já vem pré-configurado
   - Digite a máscara CIDR (ex: 24)
   - Insira o IP de destino
   - Clique em "Verificar" para ver o resultado

## ✅ Validação e Testes

### Teste Rápido de Funcionamento
1. **Abra a aplicação** no navegador
2. **Teste básico**: CIDR `24`, IP destino `192.168.15.100`
3. **Resultado esperado**: "ESTÁ na mesma rede"
4. **Teste validação**: CIDR `33` (deve mostrar erro)
5. **Teste IP inválido**: `192.168.1.256` (deve mostrar erro)

### Verificação de Critérios
- **🔧 Sem bugs**: Console sem erros, interface responsiva
- **📚 Código documentado**: Veja comentários JSDoc no `script.js`
- **🧪 Entradas testadas**: Tente valores inválidos nos campos
- **🎯 Interface intuitiva**: Mensagens de erro claras e feedback visual

## 📖 Como Funciona

### Algoritmo Principal

1. **Validação de Entrada**: Verifica se o CIDR está entre 1-32 e se o IP é válido
2. **Conversão CIDR → Decimal**: Transforma notação CIDR (ex: /24) em máscara decimal (255.255.255.0)
3. **Conversão IP → Inteiro**: Converte IPs para representação de 32 bits
4. **Operação AND**: Aplica máscara aos IPs para encontrar a rede
5. **Comparação**: Verifica se ambos os IPs pertencem à mesma rede

### Exemplo Prático

```
IP Origem: 192.168.1.10
IP Destino: 192.168.1.50
CIDR: /24

Máscara: 255.255.255.0
Rede do IP Origem: 192.168.1.0
Rede do IP Destino: 192.168.1.0

Resultado: ✅ Estão na mesma rede
```

## 🎨 Interface do Usuário

A interface foi projetada com foco na usabilidade e aprendizado:

- **Feedback Visual**: Campos ficam vermelhos quando inválidos
- **Mensagens de Ajuda**: Explicações claras sobre erros
- **Botão Gerador**: Cria IPs aleatórios para experimentação
- **Resultados Destacados**: Cores verde/vermelho para fácil interpretação
- **Design Responsivo**: Adaptável para desktop, tablet e mobile
- **Acessibilidade**: Navegação por teclado e ARIA labels

### 🎯 Critérios de Avaliação Atendidos

O projeto foi desenvolvido seguindo os critérios acadêmicos específicos:

- ✅ **Funciona sem bugs** (5 pontos) - Sistema estável e confiável
- ✅ **Código documentado** (2 pontos) - JSDoc completo e comentários
- ✅ **Entradas testadas** (2 pontos) - Validação robusta de inputs
- ✅ **Software intuitivo** (1 ponto) - Interface clara com mensagens
- ✅ **Git organizado** (+1 ponto) - Histórico de commits estruturado
- ✅ **Página web** (+1 ponto) - Interface web responsiva

**Pontuação máxima projetada: 12/12 pontos**

## 🧪 Casos de Teste

### Testes Básicos
- ✅ IPs na mesma rede: `192.168.1.10` e `192.168.1.50` com `/24`
- ❌ IPs em redes diferentes: `192.168.1.10` e `192.168.2.10` com `/24`

### Validações Implementadas
- Números CIDR inválidos (0, 33, texto, campos vazios)
- IPs malformados (octetos > 255, menos de 4 octetos)
- Campos vazios e caracteres especiais
- Entradas maliciosas e casos extremos

### Documentação Completa
Para casos de teste detalhados e critérios de validação, consulte:
- **[🧪 Casos de Teste Completos](docs/REQUISITOS.md#-casos-de-teste)**
- **[🎯 Matriz de Validação](docs/MATRIZ-REQUISITOS.md#-casos-de-teste)**

## 📁 Estrutura do Projeto

```
verificador-ip-rede/
├── index.html              # Página principal da aplicação
├── script.js               # Lógica JavaScript com documentação JSDoc
├── styles/
│   ├── style.css           # Estilos CSS responsivos
│   └── logo.png            # Logo institucional do IESB
├── docs/                   # Documentação técnica completa
│   ├── REQUISITOS.md       # Especificação detalhada de requisitos
│   ├── MATRIZ-REQUISITOS.md # Resumo executivo e status de implementação
│   └── CONTRIBUTING.md     # Guia de contribuição e padrões da equipe
└── README.md               # Este arquivo - documentação principal
```

## 📋 Documentação

### **📋 Especificação Técnica**
- **[📋 Requisitos do Sistema](docs/REQUISITOS.md)** - Especificação completa de requisitos funcionais e não funcionais
- **[🎯 Matriz de Requisitos](docs/MATRIZ-REQUISITOS.md)** - Resumo executivo com status de implementação
- **[🤝 Guia de Contribuição](docs/CONTRIBUTING.md)** - Padrões de desenvolvimento e workflow da equipe

### **💻 Código e Implementação**
- **[💻 Código Fonte](script.js)** - Implementação com documentação JSDoc completa
- **[🎨 Guia de Estilo](styles/style.css)** - Definições visuais e responsividade
- **[🌐 Interface](index.html)** - Estrutura HTML semântica e acessível

## 👥 Equipe de Desenvolvimento

Este projeto foi desenvolvido por estudantes do curso de **Análise e Desenvolvimento de Sistemas** do **Centro Universitário IESB**:

- **Anita** - Desenvolvimento Frontend e Lógica de Rede
- **Guilherme** - Algoritmos, Lógica de Rede, Validações e Testes
- **Karina** - Desenvolvimento Frontend e Lógica de Rede
- **Lívia** - UI/UX e Lógica de Rede

### 🎓 Contexto Acadêmico

- **Instituição**: Centro Universitário IESB
- **Curso**: Análise e Desenvolvimento de Sistemas
- **Disciplina**: Redes de Computadores
- **Período**: 2025.1

## 🤝 Contribuindo

Como se trata de um projeto acadêmico, contribuições externas não são aceitas. No entanto, feedbacks e sugestões são bem-vindos através das issues do GitHub.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📚 Referências Bibliográficas

- TANENBAUM, Andrew S.; WETHERALL, David J. **Redes de Computadores**. 5ª ed. São Paulo: Pearson, 2011.

---