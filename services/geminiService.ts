
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";
import { Product } from "../types";

// NOTE: In a real app, strict error handling for missing API keys is essential.
// For this demo, we assume the environment variable is set as per instructions.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

/**
 * Smart Search: Analyzes a natural language query and extracts structured filters.
 */
export const analyzeSearchQuery = async (query: string) => {
  if (!apiKey) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this search query for a sports equipment store: "${query}".
      Extract the user's intent into structured filters.
      Map sports to 'activity': Cricket, Soccer, Tennis, Pickleball, Badminton, Football, Racquetball.
      Map items to 'category':
      - 'Equipment': Bats, rackets, paddles, sticks, clubs.
      - 'Balls': Balls, shuttlecocks.
      - 'Protective Gear': Pads, helmets, guards, gloves, eyewear.
      - 'Accessories': Bags, grips, nets, pumps.
      
      Map demographic to 'gender' (AgeGroup): Adult, Junior, Unisex.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, enum: ['Equipment', 'Balls', 'Protective Gear', 'Accessories', 'Any'], description: "The product category" },
            activity: { type: Type.STRING, enum: ['Cricket', 'Soccer', 'Tennis', 'Pickleball', 'Badminton', 'Football', 'Racquetball', 'Any'], description: "The sport" },
            gender: { type: Type.STRING, enum: ['Adult', 'Junior', 'Unisex', 'Any'], description: "Target age group/sizing" },
            maxPrice: { type: Type.NUMBER, description: "Maximum price mentioned, or 0 if none" },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key descriptive words (material, weight, brand)" }
          },
          required: ["category", "activity", "gender"]
        }
      }
    });

    return response.text ? JSON.parse(response.text) : null;
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return null;
  }
};

/**
 * Visual Search: Analyzes an image to find matching products.
 */
export const searchByImage = async (base64Image: string) => {
  if (!apiKey) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: `Analyze this image and extract product search filters for a sports store.
                   Identify the sport (Activity), the type of item (Category), and the likely target audience (Gender).` }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, enum: ['Equipment', 'Balls', 'Protective Gear', 'Accessories', 'Any'] },
            activity: { type: Type.STRING, enum: ['Cricket', 'Soccer', 'Tennis', 'Pickleball', 'Badminton', 'Football', 'Racquetball', 'Any'] },
            gender: { type: Type.STRING, enum: ['Adult', 'Junior', 'Unisex', 'Any'] },
          },
          required: ["category", "activity"]
        }
      }
    });
    return response.text ? JSON.parse(response.text) : null;
  } catch (error) {
    console.error("Visual Search Error:", error);
    return null;
  }
};

/**
 * Generates a single image based on a prompt.
 */
const generateImage = async (prompt: string): Promise<string | null> => {
    if (!apiKey) return null;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Image Gen Error:", error);
        return null;
    }
}

/**
 * Generates 3 distinct product images (Studio, Detail, Action)
 */
export const generateProductGallery = async (productName: string, category: string, activity: string, description: string): Promise<string[]> => {
    const prompts = [
        // 1. Studio Shot (Clean)
        `A high-end e-commerce product photograph of ${productName} (${category} for ${activity}) isolated on a pure white background. Professional studio lighting, sharp focus, 4k resolution, minimalism.`,
        
        // 2. Detail Shot (Texture/Feature)
        `A macro close-up photography shot of ${productName} (${category}), focusing on the texture and build quality. Shallow depth of field, dramatic lighting, highlighting the material details.`,
        
        // 3. Action/Context Shot (Lifestyle)
        `A cinematic lifestyle photograph of ${productName} (${category}) being used on a ${activity} field/court. Dynamic motion blur, dramatic sunlight, photorealistic sports photography.`
    ];

    try {
        // Run requests in parallel for speed
        const promises = prompts.map(p => generateImage(p));
        const results = await Promise.all(promises);
        
        // Filter out any nulls if a generation failed
        return results.filter((img): img is string => img !== null);
    } catch (e) {
        console.error("Gallery Generation Error", e);
        return [];
    }
};

/**
 * Generates a lifestyle scene for a product using AI (Legacy/Single use)
 */
export const generateProductScene = async (productName: string, category: string, activity: string): Promise<string | null> => {
  return generateImage(`A professional, high-definition advertising photograph of a ${productName} (${category}) used for ${activity}. The product should be in a dramatic, cinematic sports environment with dynamic lighting. Photorealistic, 4k quality.`);
};

interface AIResponse {
  text: string;
  recommendedProductIds: string[];
  suggestions: string[];
}

/**
 * AI Stylist: Chat functionality with product context.
 */
export const getStylistResponse = async (history: { role: string, text: string }[]): Promise<{ text: string, products: Product[], suggestions: string[] }> => {
  if (!apiKey) return { text: "I'm currently offline (API Key missing). Please browse our catalog manually!", products: [], suggestions: [] };

  // Create a condensed product context string with IDs
  const productContext = MOCK_PRODUCTS.map(p => 
    `- ID: ${p.id} | Name: ${p.name} | Price: $${p.price} | Type: ${p.category} | Sport: ${p.activity} | Features: ${p.features.join(', ')}`
  ).join('\n');

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `### 1. ROLE
Act as "StrideAI", a Senior Technical Equipment Specialist at Stride. You are an expert in biomechanics and sports gear.

### 2. CONTEXT
You are assisting a customer. They need help choosing specific equipment from our catalog.
Catalog Data:
${productContext}

### 3. TASK
Analyze the user's needs and recommend equipment.
1. Identify the sport and intent.
2. Select 1-3 most relevant Product IDs from the Catalog Data.
3. Explain technically why these products fit.
4. Generate 2-3 short, relevant follow-up questions the user might ask next (e.g., "What about stability?", "Is this good for beginners?").

### 4. GUIDELINES
- Tone: Professional, concise, helpful.
- Do not recommend products not in the catalog.
- We only sell hard goods (bats, balls, rackets), no shoes/clothes.

### 5. FORMAT
You MUST return a JSON object.
Schema:
{
  "text": string, // The conversational response (keep it under 50 words)
  "recommendedProductIds": string[], // Array of exact Product IDs from catalog (max 3)
  "suggestions": string[] // 2-3 short follow-up questions (max 5 words each)
}
`,
        responseMimeType: "application/json"
      }
    });

    const prompt = `
    Conversation History:
    ${history.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n')}
    
    User's Latest Input: (Respond in JSON)`;

    const response = await chat.sendMessage({ message: prompt });
    
    if (response.text) {
      const data = JSON.parse(response.text) as AIResponse;
      
      // Hydrate products
      const products = data.recommendedProductIds
        .map(id => MOCK_PRODUCTS.find(p => p.id === id))
        .filter((p): p is Product => !!p);

      return {
        text: data.text,
        products: products,
        suggestions: data.suggestions || []
      };
    }
    
    return { text: "I couldn't process that request.", products: [], suggestions: [] };

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return { text: "I'm having trouble connecting to the equipment server right now.", products: [], suggestions: [] };
  }
};
