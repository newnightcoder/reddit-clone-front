const isObjectEmpty = (obj: any) => {
  for (let prop in obj) {
    return false;
  }
  return true;
};

export default isObjectEmpty;
