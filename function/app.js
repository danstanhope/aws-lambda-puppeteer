const fs = require('fs');
const _ = require('lodash');
const chromium = require('chrome-aws-lambda');
const S3Adapter = require('/opt/nodejs/helpers/S3');
const { fetchPosts } = require('/opt/nodejs/helpers/Api');

exports.lambdaHandler = async (event, context) => {
    const s3 = new S3Adapter();
    const html = fs.readFileSync(`/opt/nodejs/html_templates/example.html`, "utf-8");    
    const bucket = `danstanhope`;
    const filename = `my-posts.pdf`;
    let template = _.template(html);


    const posts = await fetchPosts('danstanhope');
    
    template = template({
        posts
    });
    
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();

    await page.setContent(template, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const buffer = await page.pdf({
        format: 'A4',
        margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" }
    });

    await browser.close();
    
    let params = {
        Bucket: bucket,
        Body: buffer,
        Key: filename,
        ContentType: 'application/pdf'
    };

    await s3.upload(params);
};
