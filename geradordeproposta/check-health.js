import https from 'https';

function checkURL(url) {
    return new Promise((resolve, reject) => {
        console.log(`\nChecking: ${url}`);
        https.get(url, (res) => {
            console.log(`Status: ${res.statusCode}`);
            console.log(`Headers:`, res.headers);

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('✅ OK');
                    resolve(true);
                } else {
                    console.log(`❌ Failed with status ${res.statusCode}`);
                    resolve(false);
                }
            });
        }).on('error', (err) => {
            console.log(`❌ Error: ${err.message}`);
            resolve(false);
        });
    });
}

async function main() {
    console.log('=== GPRO Health Check ===');

    await checkURL('https://gpro.iasolar.io');
    await checkURL('https://gpro.iasolar.io/api/settings');

    console.log('\n=== Health check completed ===');
}

main();
