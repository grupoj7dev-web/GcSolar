# Cleanup Host Services
echo "Stopping host services..."
pm2 delete gpro-backend || true
systemctl stop nginx || true
systemctl disable nginx || true

# Docker Deploy
echo "Deploying with Docker Compose..."
# Ensure network exists (it should, but good to check, or just ignore error)
# docker network create traefik-public || true

docker compose -f docker-compose.yml up -d --build --remove-orphans

echo "Deployment Complete! (Docker)"
