import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();
const config = {
    host: 'gpro.iasolar.io',
    username: 'root',
    password: 'Destruidor007@@'
};

(async () => {
    try {
        await ssh.connect(config);
        console.log('Connected!');

        console.log('\n--- Docker Version ---');
        let res = await ssh.execCommand('docker --version');
        console.log(res.stdout);

        console.log('\n--- Docker Compose V2 Check ---');
        res = await ssh.execCommand('docker compose version');
        console.log('docker compose:', res.stdout || res.stderr);

        console.log('\n--- Docker Compose V1 Check ---');
        res = await ssh.execCommand('docker-compose --version');
        console.log('docker-compose:', res.stdout || res.stderr);

        ssh.dispose();
    } catch (e) {
        console.error(e);
    }
})();
