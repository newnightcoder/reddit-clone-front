export const isObjectEmpty = (obj) => {
  for (let prop in obj) {
    return false;
  }
  return true;
};
