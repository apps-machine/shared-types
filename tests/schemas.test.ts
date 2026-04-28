import { describe, expect, test } from "bun:test";
import {
  JudgeResultSchema,
  RawAppDataSchema,
  StoreSchema,
} from "../src/index.js";

describe("RawAppDataSchema", () => {
  const valid = {
    store: "apple" as const,
    appId: "123456789",
    market: "US",
    name: "Cal AI",
    developer: "Cal AI Inc.",
    category: "Health & Fitness",
    rank: 12,
    rating: 4.7,
    ratingsCount: 12345,
    priceUsd: 0,
    iapPresent: true,
    description: "AI calorie counter",
    screenshotUrls: ["https://example.com/s1.png"],
    iconUrl: "https://example.com/icon.png",
    releaseDate: "2023-01-01T00:00:00.000Z",
    lastUpdated: "2026-04-01T00:00:00.000Z",
    scrapedAt: "2026-04-28T00:00:00.000Z",
  };

  test("accepts valid data", () => {
    expect(() => RawAppDataSchema.parse(valid)).not.toThrow();
  });

  test("rejects market with wrong length", () => {
    expect(() => RawAppDataSchema.parse({ ...valid, market: "USA" })).toThrow();
  });

  test("rejects negative price", () => {
    expect(() => RawAppDataSchema.parse({ ...valid, priceUsd: -1 })).toThrow();
  });

  test("rejects rating > 5", () => {
    expect(() => RawAppDataSchema.parse({ ...valid, rating: 6 })).toThrow();
  });
});

describe("JudgeResultSchema", () => {
  test("clamps localizationGap range 0-10", () => {
    const base = {
      appId: "1",
      market: "BR",
      judgeKind: "text" as const,
      reasoning: "ok",
      modelId: "claude-sonnet-4-6",
      judgedAt: "2026-04-28T00:00:00.000Z",
    };
    expect(() =>
      JudgeResultSchema.parse({ ...base, localizationGap: 11 }),
    ).toThrow();
    expect(() =>
      JudgeResultSchema.parse({ ...base, localizationGap: -1 }),
    ).toThrow();
    expect(() =>
      JudgeResultSchema.parse({ ...base, localizationGap: 7 }),
    ).not.toThrow();
  });
});

describe("StoreSchema", () => {
  test("accepts apple and google", () => {
    expect(StoreSchema.parse("apple")).toBe("apple");
    expect(StoreSchema.parse("google")).toBe("google");
  });

  test("rejects unknown stores", () => {
    expect(() => StoreSchema.parse("amazon")).toThrow();
  });
});
