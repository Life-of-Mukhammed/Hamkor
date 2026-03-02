'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating a business contract based on INN and specific requirements.
 *
 * - generateContract - A function that generates the contract text.
 * - ContractGenerationInput - The input type for the generateContract function.
 * - ContractGenerationOutput - The return type for the generateContract function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContractGenerationInputSchema = z.object({
  inn: z.string().describe('Individual Taxpayer Identification Number (INN) of the party.'),
  additionalTerms: z.string().describe('Additional terms or description of the goods/services.'),
  buyerName: z.string().describe('Full name of the person signing the contract.'),
});
export type ContractGenerationInput = z.infer<typeof ContractGenerationInputSchema>;

const ContractGenerationOutputSchema = z.object({
  contractId: z.string().describe('A generated unique contract identifier.'),
  title: z.string().describe('The title of the contract.'),
  content: z.string().describe('The full generated contract text in Uzbek.'),
  date: z.string().describe('The current date of the contract.'),
});
export type ContractGenerationOutput = z.infer<typeof ContractGenerationOutputSchema>;

const contractPrompt = ai.definePrompt({
  name: 'contractPrompt',
  input: { schema: ContractGenerationInputSchema },
  output: { schema: ContractGenerationOutputSchema },
  prompt: `Siz professional huquqshunos va O'zbekiston qonunchiligi bo'yicha mutaxassissiz. 
Sizga quyidagi ma'lumotlar asosida B2B shartnomasi loyihasini tayyorlash topshirildi:

Xaridor (INN): {{{inn}}}
Mas'ul shaxs: {{{buyerName}}}
Qo'shimcha shartlar va mahsulot tavsifi: {{{additionalTerms}}}

Vazifangiz:
1. O'zbekiston Respublikasi Fuqarolik kodeksiga muvofiq rasmiy va yuridik jihatdan mukammal shartnoma matnini generatsiya qiling.
2. Shartnoma sarlavhasi (TITLE) aniq va londa bo'lsin.
3. Matnda "O'zbekiston" konteksti, valyuta (so'm) va INN ko'rsatilgan bo'lishi shart.
4. Shartnomada "Etkazib berish shartlari", "To'lov tartibi", "Tomonlarning majburiyatlari" kabi standart bandlar bo'lsin.
5. {{{additionalTerms}}} bandini shartnoma predmetiga mahorat bilan singdiring.

Faqat o'zbek tilida javob bering.`,
});

const contractGenerationFlow = ai.defineFlow(
  {
    name: 'contractGenerationFlow',
    inputSchema: ContractGenerationInputSchema,
    outputSchema: ContractGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await contractPrompt(input);
    return {
      ...output!,
      contractId: `SH-${Math.floor(Math.random() * 900000 + 100000)}`,
      date: new Date().toLocaleDateString('uz-UZ'),
    };
  }
);

export async function generateContract(input: ContractGenerationInput): Promise<ContractGenerationOutput> {
  return contractGenerationFlow(input);
}
