#!/bin/sh
# This script is used to build the app
cd /usr/src/app

# Build nest backend
echo "Bulding nest backend"
if [ ! -d "node_modules" ]; then
    npm install
fi
nest build

# Build vue frontend
echo "Building vue frontend"
cd client
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run build

#mkdir -p ../dist/client
#cp -r dist/* ../dist/client/
cd ..

