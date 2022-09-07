const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const numberToArray = (number: number) => Array.from(Array(number).keys());

const getInteger = (length: number) => Math.floor(Math.random() * length);

const getRandomNumber = (digits: number) =>
  numberToArray(digits).reduce((acc) => acc + getInteger(10), '');

const getRandomString = (length: number) =>
  numberToArray(length).reduce(
    (acc) => acc + ALPHABET[getInteger(ALPHABET.length)],
    ''
  );

export const generateSlug = () => `${getRandomString(2)}${getRandomNumber(4)}`;
