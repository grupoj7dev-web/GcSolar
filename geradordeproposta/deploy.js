import { NodeSSH } from 'node-ssh';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const ssh = new NodeSSH();

const config = {
    host: 'gpro.iasolar.io',
    username: 'root',
    password: 'Destruidor007@@',
    remoteDir: '/var/www/gpro'
};

const zipFiles = () => new Promise((resolve, reject) => {
    const output = fs.createWriteStream('deploy.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', (err) => reject(err));

    archive.pipe(output);

    // Add directories
    archive.directory('dist/', 'dist');
    archive.directory('server/', 'server');

    // Add files
    archive.file('package.json', { name: 'package.json' });
    archive.file('nginx.conf', { name: 'nginx.conf' });
    archive.file('nginx-ssl.conf', { name: 'nginx-ssl.conf' });
    archive.file('nginx-docker.conf', { name: 'nginx-docker.conf' });
    archive.file('docker-compose.yml', { name: 'docker-compose.yml' });
    archive.file('setup.sh', { name: 'setup.sh' }); // Ensure setup.sh is included

    archive.finalize();
});

(async () => {
    try {
        console.log('📦 Zipping files (Node.js style)...');
        await zipFiles();

        console.log('🔌 Connecting to VPS...');
        await ssh.connect({
            host: config.host,
            username: config.username,
            password: config.password
        });
        console.log('✅ Connected!');

        console.log('🚀 Uploading deploy.zip...');
        await ssh.putFile('deploy.zip', `${config.remoteDir}/deploy.zip`);
        console.log('✅ Upload complete!');

        console.log('🔧 Running setup.sh on server...');
        // Force conversion to unix line endings just in case
        const result = await ssh.execCommand(`
            cd ${config.remoteDir} && 
            unzip -o deploy.zip && 
            sed -i 's/\r$//' setup.sh && 
            chmod +x setup.sh && 
            ./setup.sh
        `, { cwd: config.remoteDir });

        console.log('STDOUT:', result.stdout);
        console.log('STDERR:', result.stderr);

        if (result.code !== 0) {
            throw new Error(`Server script failed with code ${result.code}`);
        }

        console.log('🎉 DEPLOY SUCCESSFUL! Access: https://gpro.iasolar.io');
        process.exit(0);

    } catch (error) {
        console.error('❌ Deploy Failed:', error);
        process.exit(1);
    }
})();
