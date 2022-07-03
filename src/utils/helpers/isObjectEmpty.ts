const isObjectEmpty = (obj: any) => {
  for (let prop in obj) {
    console.log(prop);

    return false;
  }
  return true;
};

export default isObjectEmpty;
