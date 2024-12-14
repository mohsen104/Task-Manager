#!/bin/bash

REPO_URL="https://github.com/mohsen104/Task-Manager.git"
REPO_DIR="Task-Manager"
IMAGE_NAME="task-manager-app"
CONTAINER_NAME="task-manager"
if [ ! -d "$REPO_DIR" ]; then
  echo "Cloning repository..."
  git clone "$REPO_URL"
else
  echo "Repository already cloned."
fi
cd "$REPO_DIR" || exit

if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Installing Docker..."
  sudo apt update
  sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
  apt-cache policy docker-ce
  sudo apt install -y docker-ce
fi

if [ ! -f Dockerfile ]; then
  echo "Creating Dockerfile..."
  cat <<EOL > Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]
EOL
fi
echo "Building Docker image..."
docker build -t "$IMAGE_NAME" .
echo "Running Docker container..."
docker run -d --name "$CONTAINER_NAME" -p 3000:3000 "$IMAGE_NAME"
docker ps | grep "$CONTAINER_NAME"

echo "Application is running at http://localhost:3000"
