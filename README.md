# 🌍 Travel Destination Generator (React + AWS)

Este projeto é uma aplicação React que utiliza serviços da AWS para:

- 📧 Autenticação de usuários com e-mail e senha usando **Amazon Cognito** via AWS Amplify  
- 🧠 Geração de sugestões de destinos de viagem com base nos interesses do usuário usando **Amazon Bedrock** (Claude 3 Sonnet)

---

## 📦 Tecnologias Utilizadas

- [React + Vite](https://vitejs.dev/)
- [AWS Amplify](https://docs.amplify.aws/)
- [Amazon Cognito](https://aws.amazon.com/cognito/) (autenticação)
- [Amazon Bedrock](https://aws.amazon.com/bedrock/) (inteligência artificial)
- [Claude 3 Sonnet](https://docs.aws.amazon.com/bedrock/latest/userguide/model-anthropic-claude.html)
- TypeScript

---

## 🚀 Como Funciona

### 🔐 Autenticação

A autenticação é feita usando o método `defineAuth()` do Amplify, que internamente configura um **User Pool no Cognito**. Isso cuida automaticamente de:

- Registro de usuários com e-mail e senha  
- Verificação de e-mail via código  
- Login autenticado  
- Tokens e sessões válidas  

O trecho responsável por isso está em:

```ts
// amplify/auth/resource.ts
loginWith: {
  email: {
    verificationEmailStyle: "CODE",
    verificationEmailSubject: "Welcome to the Travel Destination App",
    verificationEmailBody: (createCode) => `Use this code to verify your email: ${createCode()}`,
  },
}
```

### 🧠 Geração de Destinos com Bedrock
Quando o usuário seleciona seus interesses (ex: natureza, cultura, praia), a aplicação envia esses dados para uma API customizada criada com o Amplify, que por sua vez invoca o modelo Claude 3 da Bedrock.

📍 O código que configura essa chamada está em:

amplify/data/resource.ts → define a função askBedrock()

amplify/bedrock.js → envia a requisição para o modelo

```
// Exemplo de uso
askBedrock({ interests: ["nature", "culture"] });
```

## 🛠️ Como Rodar o Projeto

1. Clone o repositório

```
git clone https://github.com/seu-usuario/travel-ai-app.git
cd travel-ai-app
```

2. Instale as dependências
```
npm install
```
3. Configure o Amplify

Se for a primeira vez:
```
npm create amplify@latest -y
```
Isso cria a estrutura /amplify.
