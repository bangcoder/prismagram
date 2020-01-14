import "./env";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});
// console.log(s3);
// const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "bangprismagram",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
export const uploadMiddleWare = upload.single("file");
export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  //   console.log(file`);
  res.json({ location });
  //   console.log(file);
  //   res.end();
};
