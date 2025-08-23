export const parseNumber = (value, defaultValue) => {
  const number = Number(value);
  return isNaN(number) || number < 1 ? defaultValue : number;
};