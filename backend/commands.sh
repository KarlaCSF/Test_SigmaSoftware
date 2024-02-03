# Install yarn global
npm install -g yarn

# Install dependencies
yarn install

# Setup postgres container
sudo docker compose up --build -d
sleep 10

# Migrate prisma schemas to database
yarn prisma migrate dev

# Populate database with some data
yarn populate

# Run application
yarn dev
