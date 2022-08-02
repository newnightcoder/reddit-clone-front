const cdnDeliveryAddress = "https://q4hi9b8q.cdn.imgeng.in/";
const fromCDN = (imgUrl: string) => {
  return imgUrl.replace(`${imgUrl}`, `${cdnDeliveryAddress}/${imgUrl}`);
};

export default fromCDN;
