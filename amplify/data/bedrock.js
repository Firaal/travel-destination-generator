//A função request monta uma requisição HTTP para a IA Claude 3 Sonnet via Amazon Bedrock, recebendo os interesses do usuário como argumento. Ela constrói um prompt com esses interesses e envia uma solicitação POST para o endpoint apropriado, incluindo cabeçalhos e corpo da requisição.

export function request(ctx) {
    const { interests = [] } = ctx.args;

    const prompt = `Suggest a travel destination using these interests: ${interests.join(", ")}.`;

    return {
        resourcePath: "/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke",
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `\n\nHuman: ${prompt}\n\nAssistant:`,
                            },
                        ],
                    },
                ],
            }),
        },
    };
}

// A função response analisa a resposta recebida, extraindo o conteúdo gerado pela IA e retornando-o em um formato legível. O código utiliza a biblioteca AWS Amplify para facilitar a integração com os serviços da Amazon.
export function response(ctx) {
    const parsedBody = JSON.parse(ctx.result.body);
    const res = {
        body: parsedBody.content[0].text,
    };
    return res;
}
