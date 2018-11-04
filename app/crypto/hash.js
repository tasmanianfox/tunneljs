import md5 from 'md5';

// [min, max)
const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const generateRandomMd5 = () => {
  const random = getRandomArbitrary(0, 99999999);
  const time = new Date().getTime();

  return md5(`${time}_${random}`);
};

export default {
  generateRandomMd5
};
