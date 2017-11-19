// https://github.com/andrewrk/node-s3-client
const s3 = require('s3');

const DIRECTORY = 'build';

const client = s3.createClient({
  s3Options: {
    sslEnabled: true,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const params = {
  localDir: DIRECTORY,
  // remove s3 objects that have no corresponding local file.
  deleteRemoved: true,
  s3Params: {
    Bucket: process.env.AWS_BUCKET_NAME,
    ACL: 'public-read'
  }
};

const uploader = client.uploadDir(params);

uploader.on('error', function(err) {
  console.error('Upload failed:', err.stack);
});

uploader.on('progress', function() {
  console.log('Progress', uploader.progressAmount, uploader.progressTotal);
});

uploader.on('end', function() {
  console.log('Upload complete.');
});
