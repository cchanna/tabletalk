cd assets
NODE_ENV=production npm run build
cd ..
MIX_ENV=prod mix phx.digest