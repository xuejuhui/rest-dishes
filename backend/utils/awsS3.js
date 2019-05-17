const config = require("config");
const aws = require("aws-sdk");
const awsConfig = config.get("app.awsConfig");

aws.config.update(awsConfig);
const s3 = new aws.S3();

async function uploadToS3({ imageName, buffer }, bucket) {
  const s3Params = {
    Bucket: bucket,
    Key: imageName,
    Body: buffer
  };
  try {
    return await s3.putObject(s3Params).promise();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

async function getUrlFromS3(imageName, bucket) {
  const s3Params = {
    Bucket: bucket,
    Key: imageName
  };
  try {
    const url = s3.getSignedUrl("getObject", s3Params);
    return url;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { uploadToS3, getUrlFromS3 };
