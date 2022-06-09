const AWS = require('aws-sdk');

let s3;

class S3Adapter {
    constructor() {
        if (!s3) {
            s3 = new AWS.S3();
        }
    }
    async upload(params) {
        return new Promise((resolve, reject) => {
            s3.upload(params, {}, (err, data) => {
                if (err) reject(err);

                resolve(data);
            });
        });
    }
}

module.exports = S3Adapter;
