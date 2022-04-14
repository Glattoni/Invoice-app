enum Time {
  Hours = 24,
  Minutes = 60,
  Seconds = 60,
  Milliseconds = 1000,
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const numToArr = (n: number) => Array.from(Array(n));

const msInDays = (amount: number) =>
  amount * Time.Hours * Time.Minutes * Time.Seconds * Time.Milliseconds;

const getInteger = (length: number) => Math.floor(Math.random() * length);

const getRandomNumber = (digits: number) =>
  numToArr(digits).reduce((a) => a + getInteger(10), '');

const getRandomString = (length: number) =>
  numToArr(length).reduce((a) => a + ALPHABET[getInteger(ALPHABET.length)], '');

export const generateSlug = () => `${getRandomString(2)}${getRandomNumber(4)}`;

export const addDays = (date: string, amount: string) => {
  if (!date) return false;
  const time = new Date(date).getTime();
  const milliseconds = time + msInDays(+amount);

  return new Date(milliseconds).toISOString().slice(0, 10);
};
