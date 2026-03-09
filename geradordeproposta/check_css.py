import paramiko

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect('kit.iasolar.io', username='root', password='Destruidor007@@', timeout=10)
    
    commands = [
        "echo '=== Checking dist structure ==='",
        "ls -lah /var/www/gpro/dist/",
        "echo ''",
        "echo '=== Checking assets folder ==='",
        "ls -lah /var/www/gpro/dist/assets/",
        "echo ''",
        "echo '=== Checking index.html references ==='",
        "cat /var/www/gpro/dist/index.html",
        "echo ''",
        "echo '=== Testing CSS file access ==='",
        "docker exec gpro-frontend ls -lh /usr/share/nginx/html/assets/",
        "echo ''",
        "echo '=== Checking nginx config ==='",
        "docker exec gpro-frontend cat /etc/nginx/conf.d/default.conf"
    ]
    
    stdin, stdout, stderr = client.exec_command("; ".join(commands))
    print(stdout.read().decode())
    err = stderr.read().decode()
    if err:
        print("Stderr:", err)
    client.close()
except Exception as e:
    print(f"Error: {e}")
