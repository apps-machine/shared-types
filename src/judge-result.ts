import { z } from "zod";

export const JudgeKindSchema = z.enum(["text", "vision"]);
export type JudgeKind = z.infer<typeof JudgeKindSchema>;

export const JudgeResultSchema = z.object({
  appId: z.string().min(1),
  market: z.string().length(2),
  judgeKind: JudgeKindSchema,
  localizationGap: z.number().min(0).max(10),
  reasoning: z.string(),
  modelId: z.string(),
  judgedAt: z.string().datetime(),
});

export type JudgeResult = z.infer<typeof JudgeResultSchema>;
