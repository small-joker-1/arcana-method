#!/usr/bin/env node
import { birthCard, lifePath, yearCard } from "../src/method.mjs";

function printUsage() {
  console.log(`Usage: arcana-method <YYYY-MM-DD> [--year <YYYY>]

Print the birth card, year card, and life path for one birth date.
The year card defaults to the current calendar year.

Full multilingual calculators:
  https://arcanacalculator.com/tarot-birth-card-calculator
  https://arcanacalculator.com/year-card-calculator
  https://arcanacalculator.com/life-number-calculator`);
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
  printUsage();
  process.exit(args.length === 0 ? 1 : 0);
}

const birthDate = args[0];
const yearFlag = args.indexOf("--year");
const year =
  yearFlag === -1 ? new Date().getFullYear() : Number(args[yearFlag + 1]);

try {
  const birth = birthCard(birthDate);
  const yearResult = yearCard(birthDate, year);
  const life = lifePath(birthDate);

  console.log(`Birth date: ${birth.birthDate}`);
  console.log(
    `Birth card: ${birth.number} ${birth.card.name} (${birth.digits} → ${birth.steps.join(" → ")})`,
  );
  console.log(
    `Year card ${yearResult.year}: ${yearResult.number} ${yearResult.card.name} (${yearResult.month} + ${yearResult.day} + ${yearResult.yearDigits} = ${yearResult.total})`,
  );
  console.log(`Personal year ${yearResult.year}: ${yearResult.personalYear}`);
  console.log(
    `Life path: ${life.number} (month ${life.month} + day ${life.day} + year ${life.year})`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
