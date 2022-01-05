import chalk from "chalk";
export default class Logger {
  prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix || "LOG";
  }
  log(text: string) {
    console.log(`[${this.prefix}]`, chalk.white(text));
  }
  green(text: string) {
    console.log(`[${this.prefix}]`, chalk.green(text));
  }
  red(text: string) {
    console.log(`[${this.prefix}]`, chalk.red(text));
  }
  yellow(text: string) {
    console.log(`[${this.prefix}]`, chalk.yellow(text));
  }
}
