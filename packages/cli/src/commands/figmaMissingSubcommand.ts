export const FIGMA_MISSING_SUBCOMMAND = {
  kind: "usage_error",
  exitCode: 1,
} as const;

/** `hyperframes figma` with no asset|tokens|component is a usage error. */
export function missingFigmaSubcommand(): typeof FIGMA_MISSING_SUBCOMMAND {
  return FIGMA_MISSING_SUBCOMMAND;
}
