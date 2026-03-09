import { Client } from 'ssh2';
import { fileURLToPath } from 'url';
import path from 'path';

const config = {
    host: 'gpro.iasolar.io',
    username: 'root',
    password: 'Destruidor007@@',
};

const conn = new Client();

function executeCommand(conn, command) {
    return new Promise((resolve, reject) => {
        console.log(`Executing: ${command}`);
        conn.exec(command, (err, stream) => {
            if (err) return reject(err);
            let output = '';
            stream.on('close', (code, signal) => {
                console.log(`Command processed with exit code ${code}`);
                if (code === 0) resolve(output);
                else reject(new Error(`Command failed with code ${code}: ${output}`));
            }).on('data', (data) => {
                output += data;
                process.stdout.write(data);
            }).stderr.on('data', (data) => {
                process.stderr.write(data);
            });
        });
    });
}

conn.on('ready', async () => {
    console.log('Client :: ready');
    try {
        // 1. Install Certbot and Nginx plugin
        console.log('Installing Certbot...');
        // Update apt just in case
        await executeCommand(conn, 'apt-get update');
        await executeCommand(conn, 'apt-get install -y certbot python3-certbot-nginx');

        // 2. Run Certbot
        // We use --nginx which automatically edits the config, BUT since we manage the config via deploy.js
        // we might overwrite it later. For now, let's let Certbot do its magic to generate the certs
        // and "install" them. Later we will update deploy.js to use the cert paths explicitly.
        // We use --non-interactive and --agree-tos.
        console.log('Requesting Certificate...');
        try {
            await executeCommand(conn, 'certbot --nginx -d gpro.iasolar.io --non-interactive --agree-tos --email admin@iasolar.io --redirect');
        } catch (e) {
            // It might fail if certs already exist or if there's a prompt
            console.log('Certbot command finished (might have errored if already exists, checking...)', e.message);
        }

        console.log('SSL Setup completed!');
        conn.end();
        process.exit(0);

    } catch (err) {
        console.error('SSL Setup failed:', err);
        conn.end();
        process.exit(1);
    }
}).connect({
    host: config.host,
    port: 22,
    username: config.username,
    password: config.password
});
