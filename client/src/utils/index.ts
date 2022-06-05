enum TimeUnits {
  Hours = 24,
  Minutes = 60,
  Seconds = 60,
  Milliseconds = 1000,
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const numberToArray = (number: number) => Array.from(Array(number));

const msInDays = (amount: number) =>
  amount *
  TimeUnits.Hours *
  TimeUnits.Minutes *
  TimeUnits.Seconds *
  TimeUnits.Milliseconds;

const getInteger = (length: number) => Math.floor(Math.random() * length);

const getRandomNumber = (digits: number) =>
  numberToArray(digits).reduce((acc) => acc + getInteger(10), '');

const getRandomString = (length: number) =>
  numberToArray(length).reduce(
    (acc) => acc + ALPHABET[getInteger(ALPHABET.length)],
    ''
  );

export const generateSlug = () => `${getRandomString(2)}${getRandomNumber(4)}`;

export const addDays = (date: string, amount: number) => {
  const time = new Date(date).getTime();
  const milliseconds = time + msInDays(amount);

  return new Date(milliseconds).toISOString().slice(0, 10);
};
