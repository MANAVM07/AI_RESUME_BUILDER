import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
  privateKey: process.env.IMAGE_API_KEY // This is the default and can be omitted
});



export default imageKit;
