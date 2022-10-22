const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const numberToArray = (number: number): number[] =>
  Array.from(Array(number).keys());

const getInteger = (length: number): number =>
  Math.floor(Math.random() * length);

const getRandomNumber = (digits: number): string =>
  numberToArray(digits).reduce((acc) => acc + getInteger(10), '');

const getRandomString = (length: number): string =>
  numberToArray(length).reduce(
    (acc) => acc + ALPHABET[getInteger(ALPHABET.length)],
    ''
  );

export const generateSlug = (): string =>
  `${getRandomString(2)}${getRandomNumber(4)}`;
