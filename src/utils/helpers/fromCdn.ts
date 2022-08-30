const cdnDeliveryAddress = "https://forum-network.mo.cloudinary.net";
const fromCDN = (imgUrl: string) => {
  let path;
  if (imgUrl.includes("forum-s3-bucket")) {
    path = imgUrl.split("/").pop();
  }
  return `${cdnDeliveryAddress}/${path}`;
};

export default fromCDN;
