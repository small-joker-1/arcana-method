import assert from "node:assert/strict";
import test from "node:test";

import { birthCard, lifePath, parseBirthDate, yearCard } from "../src/method.mjs";

test("birth card adds every digit and folds 22 to The Fool", () => {
  const born = birthCard("1990-03-15");
  assert.equal(born.number, 10);
  assert.equal(born.card.name, "Wheel of Fortune");
  assert.deepEqual(born.steps, [28, 10]);

  const fool = birthCard("1900-01-29");
  assert.equal(fool.number, 0);
  assert.equal(fool.card.name, "The Fool");
  assert.deepEqual(fool.steps, [22]);
});

test("published July 18 1996 example reduces 41 to 5", () => {
  const born = birthCard("1996-07-18");
  assert.deepEqual(born.steps, [41, 5]);
  assert.equal(born.card.name, "The Hierophant");
});

test("year card wraps month + day + year digits, and the personal year is a single digit", () => {
  const card = yearCard("1990-03-15", 2027);
  assert.equal(card.yearDigits, 11);
  assert.equal(card.total, 29);
  assert.equal(card.number, 7);
  assert.equal(card.card.name, "The Chariot");
  assert.equal(card.personalYear, 2);
});

test("a year-card total of 22 is The Fool", () => {
  const card = yearCard("2027-01-10", 2027);
  assert.equal(card.total, 22);
  assert.equal(card.number, 0);
  assert.equal(card.personalYear, 4);
});

test("life path reduces month, day, and year before the final sum", () => {
  assert.equal(lifePath("1990-03-15").number, 1);
  assert.equal(lifePath("1998-11-02").number, 22);
  assert.deepEqual(lifePath("2009-11-11"), {
    month: 11,
    day: 11,
    year: 11,
    number: 33,
  });
});

test("rejects dates the calendar does not contain", () => {
  assert.throws(() => parseBirthDate("2025-02-30"), /real calendar date/);
  assert.throws(() => parseBirthDate("1900-02-29"), /real calendar date/);
  assert.throws(() => yearCard("1990-03-15", 0), /positive integer/);
});
