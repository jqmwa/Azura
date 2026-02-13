import { ascii } from "../ascii.js";
import { purple, isRich, theme } from "../terminal/theme.js";
import chalk from "chalk";

let emitted = false;

export function emitCliBanner(version: string): void {
  if (emitted) return;
  if (!process.stdout.isTTY) return;
  if (process.argv.includes("--json")) return;
  if (process.argv.includes("--version")) return;

  emitted = true;

  const colorize = isRich() ? chalk.hex(purple) : (s: string) => s;

  const lines = ascii.split("\n");
  for (const line of lines) {
    console.log(colorize(line));
  }

  const commit = process.env.AZURA_COMMIT?.slice(0, 7) ?? "dev";
  console.log(
    theme.heading(`  Azura `) +
      theme.info(`v${version}`) +
      theme.muted(` (${commit})`)
  );
  console.log();
}
