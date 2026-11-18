import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MASTER_NUMBERS = new Set([11, 22, 33]);

const deck = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../data/major-arcana.json"),
    "utf8",
  ),
);

const cardsByNumber = new Map(deck.cards.map((card) => [card.number, card]));

export function sumDigits(value) {
  return String(Math.abs(value))
    .split("")
    .reduce((total, digit) => total + Number(digit), 0);
}

export function parseBirthDate(birthDate) {
  const match = String(birthDate).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error("birthDate must be YYYY-MM-DD");
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error("birthDate must be a real calendar date");
  }

  return { year, month, day };
}

function cardFor(number) {
  const card = cardsByNumber.get(number);
  if (!card) {
    throw new Error(`no major arcana card for ${number}`);
  }
  return card;
}

/**
 * Birth card. Add every digit of YYYYMMDD. While the total is above 22,
 * replace it with the sum of its digits. 22 is shown as 0, The Fool.
 */
export function birthCard(birthDate) {
  const { year, month, day } = parseBirthDate(birthDate);
  const digits = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  let total = digits.split("").reduce((sum, digit) => sum + Number(digit), 0);
  const steps = [total];

  while (total > 22) {
    total = sumDigits(total);
    steps.push(total);
  }

  const number = total === 22 ? 0 : total;
  return {
    birthDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    digits,
    steps,
    number,
    card: cardFor(number),
  };
}

/**
 * Year card. Add the birth month, birth day, and the digit sum of the
 * target year. Wrap with ((total - 1) % 22) + 1. 22 is shown as 0, The Fool.
 * The personal year is that same total reduced to a single digit.
 */
export function yearCard(birthDate, year) {
  if (!Number.isInteger(year) || year < 1) {
    throw new Error("year must be a positive integer");
  }

  const { month, day } = parseBirthDate(birthDate);
  const yearDigits = sumDigits(year);
  const total = month + day + yearDigits;
  const wrapped = ((total - 1) % 22) + 1;
  const number = wrapped === 22 ? 0 : wrapped;
  let personalYear = total;

  while (personalYear > 9) {
    personalYear = sumDigits(personalYear);
  }

  return {
    year,
    month,
    day,
    yearDigits,
    total,
    number,
    personalYear: personalYear || 1,
    card: cardFor(number),
  };
}

function reduceKeepingMasters(value) {
  let current = value;
  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    current = sumDigits(current);
  }
  return current;
}

/**
 * Life path. Reduce the month, day, and year on their own, keeping 11, 22,
 * and 33. Add those three results and reduce the same way.
 */
export function lifePath(birthDate) {
  const { year, month, day } = parseBirthDate(birthDate);
  const parts = {
    month: reduceKeepingMasters(month),
    day: reduceKeepingMasters(day),
    year: reduceKeepingMasters(year),
  };

  return {
    ...parts,
    number: reduceKeepingMasters(parts.month + parts.day + parts.year),
  };
}

export function readCards() {
  return deck.cards;
}
