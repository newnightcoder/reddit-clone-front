const cloudinaryCdn = "https://my-cloud-cdn.mo.cloudinary.net/forum";
const fromCDN = (imgUrl: string) => {
  let path;
  if (imgUrl.includes("forum-s3-bucket")) {
    path = imgUrl.split("/").pop();
  }
  return `${cloudinaryCdn}/${path}`;
};

export default fromCDN;
