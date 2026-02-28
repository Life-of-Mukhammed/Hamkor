'use server';
/**
 * @fileOverview This file implements a Genkit flow for assessing the security risk of a company based on its INN (Individual Taxpayer Identification Number).
 *
 * - assessAiRiskScore - A function that initiates the AI risk score assessment.
 * - AiRiskScoreAssessmentInput - The input type for the assessAiRiskScore function.
 * - AiRiskScoreAssessmentOutput - The return type for the assessAiRiskScore function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiRiskScoreAssessmentInputSchema = z.object({
  inn: z.string().describe('Individual Taxpayer Identification Number (INN) to search for.'),
});
export type AiRiskScoreAssessmentInput = z.infer<typeof AiRiskScoreAssessmentInputSchema>;

const AiRiskScoreAssessmentOutputSchema = z.object({
  riskScore: z.number().describe('An AI-generated risk score for the INN, ranging from 0 to 100.'),
  riskLevel: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The calculated risk level based on the risk score.'),
  blacklistMatch: z.boolean().describe('True if the INN is found in the simulated blacklist.'),
  blacklistDetails: z.string().optional().describe('Details from the simulated blacklist if a match is found.'),
  recommendation: z.string().describe('AI\'s recommendation based on the risk assessment.'),
});
export type AiRiskScoreAssessmentOutput = z.infer<typeof AiRiskScoreAssessmentOutputSchema>;

const checkBlacklistTool = ai.defineTool(
  {
    name: 'checkBlacklist',
    description: 'Checks if an INN is present in the simulated blacklist database.',
    inputSchema: z.object({
      inn: z.string().describe('The INN to check against the blacklist.'),
    }),
    outputSchema: z.object({
      isOnBlacklist: z.boolean(),
      details: z.string().optional(),
    }),
  },
  async (input) => {
    // Simulate a blacklist check
    const blacklistedInns = {
      '1234567890': 'Company involved in fraudulent activities and money laundering.',
      '9876543210': 'Company has a history of financial irregularities and tax evasion.',
      '1122334455': 'Identified as a shell company in a recent investigation.',
    };
    if (blacklistedInns[input.inn]) {
      return { isOnBlacklist: true, details: blacklistedInns[input.inn] };
    }
    return { isOnBlacklist: false };
  }
);

const aiRiskScoreAssessmentPrompt = ai.definePrompt({
  name: 'aiRiskScoreAssessmentPrompt',
  input: { schema: AiRiskScoreAssessmentInputSchema.extend({ blacklistResult: checkBlacklistTool.outputSchema }) },
  output: { schema: AiRiskScoreAssessmentOutputSchema },
  tools: [checkBlacklistTool],
  prompt: `You are an AI security analyst for a B2B enterprise platform. Your task is to assess the security risk of a company based on its Individual Taxpayer Identification Number (INN).

INN provided: {{{inn}}}

Based on the provided INN and the blacklist check result, determine an appropriate risk score from 0 (no risk) to 100 (critical risk), a risk level (Low, Medium, High, Critical), whether the INN matched the blacklist, detailed information from the blacklist if applicable, and a comprehensive recommendation.

Blacklist Check Result:
{{#if blacklistResult.isOnBlacklist}}
  Match Found: Yes
  Blacklist Details: {{{blacklistResult.details}}}
{{else}}
  Match Found: No
{{/if}}

Consider all factors when generating the risk score and recommendation. If no blacklist match is found, assume a lower risk unless other hypothetical factors suggest otherwise, always prioritizing a balanced and professional assessment.`,
});

const aiRiskScoreAssessmentFlow = ai.defineFlow(
  {
    name: 'aiRiskScoreAssessmentFlow',
    inputSchema: AiRiskScoreAssessmentInputSchema,
    outputSchema: AiRiskScoreAssessmentOutputSchema,
  },
  async (input) => {
    const blacklistResult = await checkBlacklistTool(input);
    const { output } = await aiRiskScoreAssessmentPrompt({ ...input, blacklistResult });
    return output!;
  }
);

export async function assessAiRiskScore(input: AiRiskScoreAssessmentInput): Promise<AiRiskScoreAssessmentOutput> {
  return aiRiskScoreAssessmentFlow(input);
}
