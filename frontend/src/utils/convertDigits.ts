export const convertOneDigitStringToTwoDigits = (digit: number) => {
    return digit.toString().length === 1 ? `0${digit}` : digit;
};
