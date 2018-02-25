the pi uses armhf
to download: wget
to install: sudo dpkg -i
to check versions: apt-cache policy

manually download+install latest libssl1.1
    https://packages.debian.org/stretch/armhf/libssl1.1/download

install esl-erlang and erlang-dev
    https://www.erlang-solutions.com/resources/download.html

manually download+install elixir 1.5.x
install postgresql
install node (need to get special repo, the default is an old version)
    https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

sudo apt-get install build-essentialnpm 
npm i
npm rebuildmix  node-sass

create secret config, make secret keys and database password
set password on psql

mix deps.get
mix compile
sudo bash build_assets.sh
sudo MIX_ENV=prod PORT=80 mix release --env=prod
mkdir ~/deploy
cp _build/prod/rel/tabletalk/releases/{version}/tabletalk.tar.gz ~/deploy/
cd ~/deploy
tar xvf tabletalk.tar.gz
sudo MIX_ENV=prod PORT=80 ./bin/tabletalk start

