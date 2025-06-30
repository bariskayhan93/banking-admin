#!/bin/bash
set -e

IMAGE_NAME="banking-admin-preview"
CONTAINER_NAME="banking-admin-preview"
SERVER_IP="217.154.87.47"

echo "Building Docker image...."
docker build -t $IMAGE_NAME .

echo "Saving image to tar..."
docker save $IMAGE_NAME | gzip > $IMAGE_NAME.tar.gz

echo "Copying image to server..."
scp $IMAGE_NAME.tar.gz root@$SERVER_IP:/tmp/

echo "Deploying on server..."
ssh root@$SERVER_IP << 'EOF'
cd /tmp
docker load < banking-admin-preview.tar.gz
docker stop banking-admin-preview || true
docker rm banking-admin-preview || true
docker run -d --name banking-admin-preview -p 3001:80 banking-admin-preview
rm banking-admin-preview.tar.gz
EOF

echo "Cleaning up local files..."
rm $IMAGE_NAME.tar.gz

echo "Preview deployment complete!"
echo "Access at: https://banking-admin-dev.bariskayhan.com"
