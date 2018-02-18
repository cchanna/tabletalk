    manually download+install latest libssl1.1
    install esl-erlang and erlang-dev
    manually download+install elixir 5.x
    install postgresql
    install node (need to get special repo, the default is an old version)
    npm i
    npm recompile node-sass
    mix deps.get
    mix compile
    sudo bash build_assets.sh
    sudo MIX_ENV=prod PORT=80 mix release --env=prod
    mkdir ~/deploy
    cp _build/prod/rel/tabletalk/releases/{version}/tabletalk.tar.gz ~/deploy/
    cd ~/deploy
    tar xvf tabletalk.tar.gz
    sudo MIX_ENV=prod PORT=80 ./bin/tabletalk start

