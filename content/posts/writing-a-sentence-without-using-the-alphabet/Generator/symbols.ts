const numberToSymbol_A = (() => {
  const ZERO = '+[]';
  const ONE = '+!![]';
  const TWO = '!+[] + !![]';
  const THREE = '!+[] + !![] + !![]';
  const TEN = `${ONE} + [${ZERO}]`;

  const digits: any = [
    ZERO,
    ONE,
    TWO,
    THREE,
    `(${TWO}) * (${TWO})`, // 4
    `(${TEN}) / (${TWO})`, // 5
    `(${TWO}) * (${THREE})`, // 6
    `(${TEN}) - (${THREE})`, // 7
    `(${TWO}) ** (${THREE})`, // 8
    `(${TEN}) - ${ONE}`, // 9
  ];

  const cache: any = {};
  return (number: any) => {
    if (!cache[number]) {
      cache[number] = number
        .toString()
        .split('')
        .map((n: string, i: number) => (i === 0 ? digits[n] : `[${digits[n]}]`))
        .join(' + ');
    }
    return cache[number];
  };
})();

const infinity_A = '+!![] / +![]';

const numberToSymbol_B = (() => {
  const ZERO = '+[]';
  const ONE = ' + !![]';
  const digits: any = [
    ZERO,
    ONE.replace(/\s/g, ''),
    ...Array(8)
      .fill(true)
      .map((e, i) => `!${ZERO}${ONE.repeat(i + 1)}`),
  ];
  const cache: any = {};
  return (number: any) => {
    if (!cache[number]) {
      cache[number] = number
        .toString()
        .split('')
        .map((n: string, i: number) => (i === 0 ? digits[n] : `[${digits[n]}]`))
        .join(' + ');
    }
    return cache[number];
  };
})();

const infinity_B = (() => {
  const e = `(!![]+[])[${numberToSymbol_B(3)}]`; // "true"[3]
  return `+(${numberToSymbol_B(1)} + ${e} + (${numberToSymbol_B(1000)}))`; // 1e1000
})();

const get = (operators = true) => {
  const numberToSymbol = operators ? numberToSymbol_A : numberToSymbol_B;
  const symbols = [
    '!![]', // true
    '![]', // false
    '[][[]]', // undefined
    '{}', // [object Object]
    '+{}', // NaN
    operators ? infinity_A : infinity_B, // Infinity
  ];
  return {
    symbols,
    numberToSymbol,
  };
};

export default get;
