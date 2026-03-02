'use server';
/**
 * @fileOverview A Genkit flow for generating detailed information about an auction lot.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LotDetailsInputSchema = z.object({
  title: z.string().describe('The title of the lot.'),
  category: z.string().describe('The category of the lot.'),
  price: z.number().describe('The current price of the lot.'),
  quantity: z.string().describe('The quantity of items in the lot.'),
});
export type LotDetailsInput = z.infer<typeof LotDetailsInputSchema>;

const LotDetailsOutputSchema = z.object({
  description: z.string().describe('A detailed professional description of the lot in Uzbek.'),
  marketAnalysis: z.string().describe('AI market analysis for this type of product in Uzbekistan/Central Asia.'),
  strategy: z.string().describe('Recommended bidding strategy for this lot.'),
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('Calculated risk level for this investment.'),
});
export type LotDetailsOutput = z.infer<typeof LotDetailsOutputSchema>;

const lotDetailsPrompt = ai.definePrompt({
  name: 'lotDetailsPrompt',
  input: { schema: LotDetailsInputSchema },
  output: { schema: LotDetailsOutputSchema },
  prompt: `Siz professional auksion tahlilchisisiz. Quyidagi lot haqida batafsil ma'lumot tayyorlang:

Lot nomi: {{{title}}}
Toifa: {{{category}}}
Joriy narx: {{{price}}} so'm
Miqdor: {{{quantity}}}

Vazifangiz:
1. Lot uchun jozibador va professional tavsif (description) yozing.
2. O'zbekiston va Markaziy Osiyo bozori uchun ushbu mahsulotning dolzarbligini tahlil qiling (marketAnalysis).
3. Ushbu lotni yutib olish uchun eng yaxshi savdo strategiyasini taklif qiling (strategy).
4. Lotning narxi va bozor holatidan kelib chiqib xavf darajasini (Low, Medium, High) belgilang.

Barcha ma'lumotlar o'zbek tilida bo'lishi shart.`,
});

const lotDetailsFlow = ai.defineFlow(
  {
    name: 'lotDetailsFlow',
    inputSchema: LotDetailsInputSchema,
    outputSchema: LotDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await lotDetailsPrompt(input);
    return output!;
  }
);

export async function getLotAiDetails(input: LotDetailsInput): Promise<LotDetailsOutput> {
  return lotDetailsFlow(input);
}
