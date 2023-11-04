import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
    // math
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes!. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled"
                },
                {
                    role: "user",
                    content: `Please generate a thumbail description for my notebook titled ${name}`
                }
            ],
        });
        const data = await response.json()
        const imageDescription = data.choices[0].message.content
        return imageDescription as string

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function generateImage() {

}