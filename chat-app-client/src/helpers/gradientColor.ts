const createHex = () => {
  let hexCode = "";
  const hexValues = "0123456789abcdef";

  for (let i = 0; i < 6; i++) {
    hexCode += hexValues.charAt(Math.floor(Math.random() * hexValues.length));
  }
  return hexCode;
};

const generateGradient = () => {
  const deg = Math.floor(Math.random() * 360);
  const color1 = createHex();
  const color2 = createHex();
  const gradient = `linear-gradient(${deg}deg, #${color1}, #${color2})`;
  return gradient;
};

export default generateGradient;
