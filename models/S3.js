const AWS = require('aws-sdk');


class S3Helper{
    
    constructor(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, LocationConstraint){
        this.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
        this.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
        this.AWS_BUCKET_NAME = AWS_BUCKET_NAME;
        this.LocationConstraint = LocationConstraint;


        this.s3 = new AWS.S3({
            accessKeyId: this.AWS_ACCESS_KEY_ID,
            secretAccessKey: this.AWS_SECRET_ACCESS_KEY
        });

    }

    temporalUrl(fileName, signedUrlExpireSeconds =  60 * 5){    
        return this.s3.getSignedUrlPromise('getObject', {
            Bucket: this.AWS_BUCKET_NAME,
            Key: fileName,
            Expires: signedUrlExpireSeconds
        });
    }

    upload(fileName, fileContent) {
        const params = {
            Bucket: this.AWS_BUCKET_NAME,
            CreateBucketConfiguration: {
                LocationConstraint: this.LocationConstraint
            },
            Key: fileName,
            Body: fileContent
        }
    
        return new Promise((resolve, reject) => {
            this.s3.upload(params, (err, data) => {
                if (err) {
                  reject(err)
                }
                resolve(data.Location)
            });
        })
    }
}

module.exports = S3Helper;