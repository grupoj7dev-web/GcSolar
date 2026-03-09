import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    host: 'kit.iasolar.io',
    username: 'root',
    password: 'Destruidor007@@',
    remoteDir: '/root/geradordeproposta',
};

const IGNORE_LIST = [
    'node_modules',
    '.git',
    '.vscode',
    'deploy.js',
    'deploy-docker.js',
    'setup_ssl.js',
    'gpro_nginx.conf'
];

const conn = new Client();

function shouldIgnore(filePath) {
    return IGNORE_LIST.some(ignore => filePath.includes(ignore));
}

async function uploadDirectory(sftp, localDir, remoteDir, basePath = '') {
    const items = fs.readdirSync(localDir);

    // Create remote directory
    await new Promise((resolve, reject) => {
        sftp.mkdir(remoteDir, (err) => {
            if (err && err.code !== 4) console.error(`mkdir error: ${err.message}`);
            resolve();
        });
    });

    for (const item of items) {
        const localPath = path.join(localDir, item);
        const relativePath = path.join(basePath, item);

        if (shouldIgnore(relativePath)) {
            console.log(`Skipping: ${relativePath}`);
            continue;
        }

        const remotePath = `${remoteDir}/${item}`;
        const stats = fs.statSync(localPath);

        if (stats.isDirectory()) {
            await uploadDirectory(sftp, localPath, remotePath, relativePath);
        } else {
            await new Promise((resolve, reject) => {
                console.log(`Uploading: ${relativePath}`);
                sftp.fastPut(localPath, remotePath, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
    }
}

conn.on('ready', async () => {
    console.log('Connected to VPS for DEPLOY...');

    try {
        await new Promise((resolve, reject) => {
            conn.sftp(async (err, sftp) => {
                if (err) return reject(err);

                console.log(`Starting upload to ${config.remoteDir}...`);
                await uploadDirectory(sftp, __dirname, config.remoteDir);
                console.log('Upload completed!');
                resolve();
            });
        });

        // Execute Docker commands
        await new Promise((resolve, reject) => {
            conn.shell((err, stream) => {
                if (err) return reject(err);

                let output = '';
                stream.on('close', () => {
                    console.log('Deploy commands finished.');
                    resolve();
                }).on('data', (data) => {
                    output += data.toString();
                    process.stdout.write(data);
                });

                const commands = [
                    `cd ${config.remoteDir}`,
                    'docker-compose down --remove-orphans',
                    'docker-compose up -d',
                    'echo "Waiting for health check..."',
                    'sleep 10',
                    'docker-compose ps',
                    'exit'
                ];

                commands.forEach(cmd => stream.write(cmd + '\n'));
            });
        });

        console.log('✅ Deployment completed successfully!');
        conn.end();
        process.exit(0);

    } catch (err) {
        console.error('❌ Deployment failed:', err);
        conn.end();
        process.exit(1);
    }
}).connect({
    host: config.host,
    port: 22,
    username: config.username,
    password: config.password
});
