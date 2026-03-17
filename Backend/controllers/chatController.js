import OpenAI from "openai"

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
})

export const chat = async (req, res) => {
    try {
        const { message, products } = req.body

        const response = await client.chat.completions.create({
            model: "openrouter/hunter-alpha",  // FREE model! ✅
            messages: [
                {
                    role: "system",
                    content: `You are a helpful shopping assistant for an ecommerce store.
                Here are the available products:
                ${JSON.stringify(products)}
                Answer customer questions and recommend products.
                Keep responses short and friendly.`
                    },
                {
                    role: "user",
                    content: message
                }
            ]
        })

        const reply = response.choices[0].message.content

        res.json({ success: true, reply })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}