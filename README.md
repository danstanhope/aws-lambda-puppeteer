### Generate .PDF and upload to S3 using AWS Lambda & Puppeteer

Link to blog post [here](https://dev.to/danstanhope/create-and-upload-pdf-to-s3-using-aws-lambda-puppeteer-219o)

Sample project to generate a PDF using AWS Lambda, Common Layers, Puppeteer & S3 for storage.

Make sure you have SAM CLI installed and configured. To run, use:

```sam local invoke PuppeteerFunction --no-event```

Also, make sure to run ```yarn``` inside /layers/shared/nodejs 