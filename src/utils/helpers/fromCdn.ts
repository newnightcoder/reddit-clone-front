const cdnDeliveryAddress = "https://q4hi9b8q.cdn.imgeng.in/";
const fromCDN = (imgUrl: string) => {
  if (imgUrl.includes("forum-s3-bucket")) return imgUrl.replace(`${imgUrl}`, `${cdnDeliveryAddress}/${imgUrl}`);
};

export default fromCDN;
