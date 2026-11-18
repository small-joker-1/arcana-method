# Arcana method

Open formulas for three calculations on [Arcana Calculator](https://arcanacalculator.com): the tarot birth card, the year card, and the life path number.

This repository is the math, the 22 major-arcana names, and a small command-line program. Readings, accounts, and the website itself stay on the site.

## Try it

Requires Node.js 18 or newer.

```bash
node bin/arcana.mjs 1990-03-15 --year 2027
```

```text
Birth date: 1990-03-15
Birth card: 10 Wheel of Fortune (19900315 → 28 → 10)
Year card 2027: 7 The Chariot (3 + 15 + 11 = 29)
Personal year 2027: 2
Life path: 1 (month 3 + day 6 + year 1)
```

```bash
npm test
```

## Birth card

Add every digit of the birth date written as `YYYYMMDD`. While the total is above 22, replace it with the sum of its digits. A result of 22 is shown as **0, The Fool**.

March 15, 1990:

```text
1 + 9 + 9 + 0 + 0 + 3 + 1 + 5 = 28
2 + 8 = 10
```

10 is Wheel of Fortune.

July 18, 1996, the example from the site's calculation notes:

```text
1 + 9 + 9 + 6 + 0 + 7 + 1 + 8 = 41
4 + 1 = 5
```

5 is The Hierophant.

January 29, 1900 sums to 22 and is shown as The Fool.

The interactive version: <https://arcanacalculator.com/tarot-birth-card-calculator>

## Year card

Add the birth month, the birth day, and the digits of the target year. Wrap the total onto the 22 cards with `((total - 1) % 22) + 1`. A wrapped 22 is shown as **0, The Fool**.

The personal year uses the same total, reduced until it is a single digit from 1 to 9. This reduction does not keep 11 or 22.

March 15, for 2027 (`2 + 0 + 2 + 7 = 11`):

```text
3 + 15 + 11 = 29
((29 - 1) % 22) + 1 = 7
```

7 is The Chariot. The personal year is `2 + 9 = 11`, then `1 + 1 = 2`.

This wrap is not the birth-card digit sum. A total of 23 is birth-card 5 (`2 + 3`) and year-card 1 (`((23 - 1) % 22) + 1`).

The interactive version: <https://arcanacalculator.com/year-card-calculator>

## Life path

Reduce the month, the day, and the year separately. Keep 11, 22, and 33 when they appear. Add the three results and reduce that sum the same way.

March 15, 1990:

```text
month 3
day 15 → 6
year 1990 → 19 → 10 → 1
3 + 6 + 1 = 10 → 1
```

November 2, 1998 stays at master number 22: month 11, day 2, year `1 + 9 + 9 + 8 = 27 → 9`, then `11 + 2 + 9 = 22`.

November 11, 2009 is 33: month 11, day 11, year `2 + 0 + 0 + 9 = 11`, then `11 + 11 + 11 = 33`.

The interactive version: <https://arcanacalculator.com/life-number-calculator>

## Cards

`data/major-arcana.json` lists the 22 major arcana in Rider–Waite–Smith order: Strength is 8, Justice is 11. Each entry has a name and three short keywords. The keywords name the common theme of the card. They are not a reading.

## 中文说明

这是 [Arcana Calculator](https://arcanacalculator.com) 三套计算器的公开算法，不含解读文案、账号和网站源码。

- 出生牌：把 `YYYYMMDD` 的每位数字相加，大于 22 就继续相加；得到 22 时显示为 0，愚者。
- 年运牌：出生月 + 出生日 + 目标年各位数字之和，再用 `((总数 - 1) % 22) + 1` 折进 22 张牌；22 显示为 0。个人年把同一个总数约成 1–9。
- 生命灵数：月、日、年分别约简，保留 11、22、33，三者相加后再约简一次。

## License

[MIT](LICENSE)
