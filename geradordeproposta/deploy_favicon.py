import paramiko
import os
from scp import SCPClient
import zipfile

hostname = 'kit.iasolar.io'
username = 'root'
password = 'Destruidor007@@'
remote_path = '/var/www/gpro'

print("📦 Creating deployment package with new favicon...")
zip_name = 'deploy.zip'
if os.path.exists(zip_name):
    os.remove(zip_name)

with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
    # Add dist folder
    for root, dirs, files in os.walk('dist'):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, '.')
            zipf.write(file_path, arcname)

print(f"✓ Package created: {os.path.getsize(zip_name)} bytes")

print(f"\n🚀 Connecting to {hostname}...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(hostname, username=username, password=password)

print("📤 Uploading files...")
with SCPClient(ssh.get_transport()) as scp:
    scp.put(zip_name, f'{remote_path}/deploy.zip')

print("✓ Upload complete")

print("\n🔧 Deploying on server...")
commands = f"""
cd {remote_path}
unzip -o deploy.zip
docker restart gpro-frontend
echo "Frontend restarted with new favicon"
"""

stdin, stdout, stderr = ssh.exec_command(commands)
output = stdout.read().decode()
error = stderr.read().decode()

if output:
    print(output)
if error:
    print("Stderr:", error)

ssh.close()
print("\n✅ Deploy complete! New favicon at: https://gpro.iasolar.io/")
print("💡 Tip: Hard refresh (Ctrl+Shift+R) to see the new favicon")
