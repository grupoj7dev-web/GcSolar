import { Client } from 'ssh2';

const config = {
    host: 'kit.iasolar.io',
    username: 'root',
    password: 'Destruidor007@@',
};

const conn = new Client();

conn.on('ready', () => {
    console.log('Connected.');

    conn.shell((err, stream) => {
        if (err) throw err;

        let output = '';
        stream.on('close', () => {
            console.log('--- OUTPUT ---');
            console.log(output);
            conn.end();
        }).on('data', (data) => {
            output += data.toString();
        });

        const cmds = [
            'cd /root/geradordeproposta',
            'echo "--- CONTAINER STATUS ---"',
            'docker-compose ps',
            'echo "--- BACKEND LOGS ---"',
            'docker-compose logs --tail=50 backend',
            'exit'
        ];

        (async () => {
            for (const cmd of cmds) {
                stream.write(cmd + '\n');
                await new Promise(r => setTimeout(r, 2000));
            }
        })();
    });
}).connect(config);
