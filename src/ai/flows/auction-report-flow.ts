'use server';
/**
 * @fileOverview A Genkit flow for generating a professional auction activity report summary.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AuctionReportInputSchema = z.object({
  totalLots: z.number(),
  totalValue: z.number(),
  totalBids: z.number(),
  topCategory: z.string(),
  recentBids: z.array(z.object({
    participant: z.string(),
    amount: z.number(),
  })),
});
export type AuctionReportInput = z.infer<typeof AuctionReportInputSchema>;

const AuctionReportOutputSchema = z.object({
  summary: z.string().describe('A professional executive summary of the auction activity in Uzbek.'),
  marketSentiment: z.string().describe('Analysis of current buyer behavior and market trends in Uzbek.'),
  recommendations: z.array(z.string()).describe('List of 3 strategic recommendations for the platform.'),
});
export type AuctionReportOutput = z.infer<typeof AuctionReportOutputSchema>;

const auctionReportPrompt = ai.definePrompt({
  name: 'auctionReportPrompt',
  input: { schema: AuctionReportInputSchema },
  output: { schema: AuctionReportOutputSchema },
  prompt: `Siz professional auksion tahlilchisisiz. Quyidagi ma'lumotlar asosida auksion faoliyati bo'yicha hisobot tayyorlang:

Aktiv lotlar soni: {{{totalLots}}}
Umumiy aylanma qiymati: {{{totalValue}}} so'm
Jami takliflar soni: {{{totalBids}}}
Eng faol toifa: {{{topCategory}}}

So'nggi takliflar:
{{#each recentBids}}
- {{{participant}}}: {{{amount}}} so'm
{{/each}}

Vazifangiz:
1. Auksionning joriy holati haqida qisqa va londa "Executive Summary" tayyorlang.
2. Bozor kayfiyati (Market Sentiment) tahlilini yozing.
3. Kelgusi haftalar uchun 3 ta strategik tavsiya bering.

Barcha ma'lumotlar o'zbek tilida, rasmiy va professional uslubda bo'lishi shart.`,
});

const auctionReportFlow = ai.defineFlow(
  {
    name: 'auctionReportFlow',
    inputSchema: AuctionReportInputSchema,
    outputSchema: AuctionReportOutputSchema,
  },
  async (input) => {
    const { output } = await auctionReportPrompt(input);
    return output!;
  }
);

export async function generateAuctionReport(input: AuctionReportInput): Promise<AuctionReportOutput> {
  return auctionReportFlow(input);
}
