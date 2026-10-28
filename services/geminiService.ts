import { aiRequest } from './aiClient';
import { MOCK_PRODUCTS } from '../constants';
import type { Product } from '../types';
interface Filters { category: string; activity: string; gender: string; maxPrice: number; keywords: string[] }
export const analyzeSearchQuery = (query: string) => aiRequest<Filters>('search', { query });
export const searchByImage = (base64Image: string, mimeType = 'image/jpeg') => aiRequest<Filters>('image', { data: base64Image, mimeType });
export async function getStylistResponse(history: { role: string; text: string }[]): Promise<{ text: string; products: Product[]; suggestions: string[] }> {
  try {
    const result = await aiRequest<{ text: string; recommendedProductIds: string[]; suggestions: string[] }>('stylist', { history: history.slice(-20) });
    return { text: result.text, products: result.recommendedProductIds.map(id => MOCK_PRODUCTS.find(p => p.id === id)).filter((p): p is Product => Boolean(p)), suggestions: result.suggestions };
  } catch (error) { return { text: error instanceof Error ? error.message : 'AI is unavailable.', products: [], suggestions: [] }; }
}
