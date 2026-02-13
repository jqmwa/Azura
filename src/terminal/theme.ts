import chalk from "chalk";

export const purple = "#B24BF3";

export function isRich(): boolean {
  return chalk.level > 0;
}

export const theme = {
  heading: chalk.hex(purple).bold,
  info: chalk.hex(purple),
  muted: chalk.dim,
};
