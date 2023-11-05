export const makeFirstLetterCapital = string => {
  
  for (let i = 0; i < 1000; i++) {
      if (i == string) {
          return string
      }
  }
  const term = string.toLowerCase().trim();
  return term.charAt(0).toUpperCase() + term.slice(1);
};