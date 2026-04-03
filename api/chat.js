export default async function handler(req, res) {
    const { mensajeUsuario } = req.body;
    const API_KEY = process.env.API_KEY; // Vercel la inyectará aquí

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "Eres un Dungeon Master experto para una Maga y un Caballero." },
                    { role: "user", content: mensajeUsuario }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}