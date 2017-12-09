cd assets
NODE_ENV=production npm run build
cd ..
MIX_ENV=prod mix do phx.digest, release --upgrade
export version=$(ls _build/prod/rel/tabletalk/releases -v | tail -n 3 | head -n 1)
mkdir ../deploy/releases/$version
cp _build/prod/rel/tabletalk/releases/$version/tabletalk.tar.gz ../deploy/releases/$version
echo Successfully built upgrade version $version
echo Run \"sudo bash upgrade.sh $version\" to upgrade