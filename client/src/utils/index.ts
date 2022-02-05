const getRandomString = (length: number) => {
  let result = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
};

const getRandomNumber = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

const generateSlug = () => {
  const characters = getRandomString(2);
  const number = getRandomNumber(4);
  return `${characters}${number}`;
};

export { generateSlug };
