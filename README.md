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

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design**: CSS Grid, Flexbox
- **Validação**: Regex e validações customizadas
- **Acessibilidade**: ARIA labels e semântica HTML

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

![Screenshot da aplicação](docs/screenshot.png)

A interface foi projetada com foco na usabilidade e aprendizado:

- **Feedback Visual**: Campos ficam vermelhos quando inválidos
- **Mensagens de Ajuda**: Explicações claras sobre erros
- **Botão Gerador**: Cria IPs aleatórios para experimentação
- **Resultados Destacados**: Cores verde/vermelho para fácil interpretação

## 🧪 Casos de Teste

### Testes Básicos
- ✅ IPs na mesma rede: `192.168.1.10` e `192.168.1.50` com `/24`
- ❌ IPs em redes diferentes: `192.168.1.10` e `192.168.2.10` com `/24`

### Validações
- Números CIDR inválidos (0, 33, texto)
- IPs malformados (octetos > 255, menos de 4 octetos)
- Campos vazios

## 📁 Estrutura do Projeto

```
verificador-ip-rede/
├── index.html          # Página principal
├── script.js           # Lógica da aplicação
├── styles/
│   ├── style.css       # Estilos CSS
│   └── logo.png        # Logo do IESB
├── README.md           # Documentação
└── docs/
    └── screenshot.png  # Imagem da interface
```

## 👥 Equipe de Desenvolvimento

Este projeto foi desenvolvido por estudantes do curso de **Análise e Desenvolvimento de Sistemas** do **Centro Universitário IESB**:

- **Anita** - Desenvolvimento Frontend
- **Guilherme** - Algoritmos, Validações e Testes
- **Karina** - Lógica de Rede
- **Lívia** - Interface e Experiência do Usuário

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

- KUROSE, James F.; ROSS, Keith W. **Redes de Computadores e a Internet**: Uma Abordagem Top-Down. 6ª ed. São Paulo: Pearson, 2013.
- TANENBAUM, Andrew S.; WETHERALL, David J. **Redes de Computadores**. 5ª ed. São Paulo: Pearson, 2011.
- CISCO. **Networking Basics**: Understanding IP Addressing and Subnetting. Cisco Press, 2023.

---

<div align="center">

**[⬆ Voltar ao topo](#-verificador-de-ip-e-rede)**

Desenvolvido com ❤️ por estudantes do IESB

</div>
