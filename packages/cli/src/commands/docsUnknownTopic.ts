/** Copyable next steps after an unknown `hyperframes docs` topic. */
export function unknownTopicNextSteps(
  topic: string,
  firstTopic?: string,
): { unknown: string; tryCmd: string | undefined; listCmd: string } {
  return {
    unknown: `Unknown topic: ${topic}`,
    tryCmd: firstTopic === undefined ? undefined : `Try: hyperframes docs ${firstTopic}`,
    listCmd: "Run hyperframes docs to list topics.",
  };
}
