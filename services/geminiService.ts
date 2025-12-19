
import { GoogleGenAI } from "@google/genai";

// Initialization logic follows the @google/genai guidelines, using a new instance per call.

export const generateProjectSummary = async (title: string, category: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional, high-end 3-sentence construction project description for a project named "${title}" in the ${category} sector. Focus on quality, engineering excellence, and the Mithram brand values of "Constructing Confidence".`
    });
    return response.text || "Professional description coming soon.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Crafting excellence in every brick and beam.";
  }
};

export const getSmartEstimateChat = async (history: { role: 'user' | 'model', message: string }[], currentMessage: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Fix: Using gemini-3-pro-preview for complex reasoning tasks (engineering and cost estimation).
    // Correctly mapping history to ensure multi-turn conversation context.
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "You are an expert construction consultant for Mithram Constructions. Provide helpful, professional advice on construction projects, materials, and cost estimations in the Chennai market. Always suggest contacting the team for a detailed quote. Embody the slogan 'Constructing Confidence'. Be authoritative but encouraging."
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.message }]
      }))
    });

    // Send message using correct parameter structure.
    const response = await chat.sendMessage({ message: currentMessage });
    return response.text || "I'm sorry, I couldn't process that. Please contact our team directly.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Connection issues. Please try again later.";
  }
};
