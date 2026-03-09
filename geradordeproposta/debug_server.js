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

        console.log('\n--- Inspect gcredito-frontend labels ---');
        let res = await ssh.execCommand('docker inspect gcredito-frontend --format "{{json .Config.Labels}}"');
        console.log(res.stdout);

        console.log('\n--- IP Addr Check ---');
        res = await ssh.execCommand('ip addr');
        console.log(res.stdout);

        console.log('\n--- Stopping Nginx ---');
        await ssh.execCommand('systemctl stop nginx');

        console.log('\n--- Probing Port 80 (Nginx Stopped) ---');
        res = await ssh.execCommand('curl -v --max-time 5 http://31.97.84.89/test.txt');
        console.log('Fetch:', res.stdout);
        console.log('Headers:', res.stderr);

        console.log('\n--- IPTables NAT ---');
        res = await ssh.execCommand('iptables -t nat -L PREROUTING -n -v');
        console.log(res.stdout);

        console.log('\n--- Docker Containers ---');
        res = await ssh.execCommand('docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Names}}"');
        console.log(res.stdout);

        console.log('\n--- Starting Nginx ---');
        await ssh.execCommand('systemctl start nginx');
        console.log('Headers:', res.stderr);

        console.log('\n--- Curl Public IP directly ---');
        res = await ssh.execCommand('curl -v -H "Host: gpro.iasolar.io" http://31.97.84.89/test.txt');
        console.log('IP fetch:', res.stdout);
        console.log('Headers:', res.stderr);

        ssh.dispose();
    } catch (e) {
        console.error(e);
    }
})();
