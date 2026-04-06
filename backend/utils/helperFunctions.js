//Case number generation function

export const generateCaseNumber = () => {
  const paddedNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const caseNumber = `CMP-${paddedNumber}-${Math.random()
    .toString(36)
    .substring(3, 6)}`;
  return caseNumber.toUpperCase();
};

export const generateAccessKey = () => {
  const accessKey = `${Math.random()
    .toString(36)
    .substring(2, 12)
    .toUpperCase()}`;
  return accessKey;
};
