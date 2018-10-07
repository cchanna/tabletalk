# Tabletalk

Tabletalk is a web tool for facilitating tabletop role-playing games played online. Using websockets, players can update character sheets and roll dice, seeing each others' actions in real time. Each supported game has a hand-crafted interface built to provide the tools that the players need to play their game without fiddling with technology. The overriding design philosophy of the app is to try to replicate the feeling of playing with physical components. I avoid shortcuts and having too much "logic" in favor of a manual experience.

Tabletalk has a Elixir backend using Phoenix, chosen for its high-performance support of websockets. The front-end is written in React, using a couple of my own libraries, [Resplendence](https://github.com/strangerelics/resplendence) and [Redux State Tools](https://github.com/strangerelics/redux-state-tools). 

Tabletalk is currently available and deployed in a very alpha state at [tabletalk.zone](https://tabletalk.zone). You can join the [demo game](https://tabletalk.zone/demo) I have set up to get a feel for how the whole thing works.

# How to run it

To run the test version, you'll want to install a few things. First is Elixir and Phoenix; there's [an excellent guide provided in the Phoenix docs](https://hexdocs.pm/phoenix/installation.html) that should help you with this. Second is [Node and npm](https://nodejs.org/en/download/). Finally, [PostgreSQL](https://www.postgresql.org/download/). 

Start up psql, and set up the database to match whatever configs you setup in *config/dev.exs*, initializing it with `mix ecto.migrate`. Then, you'll want to edit *config/config.exs* and *config/dev.exs* to point to your local ip address. Similarly, edit *assets/.env* to also point to your local machine (I'm using a trick where you use `mypcname.local`). Start the front-end server by opening a terminal or command prompt in the *assets* folder and running `npm start`. Start the back-end with `mix phx.server`. I think that's everything, but no promises since nobody but me has ever needed to setup it up.

For deploying, I use the wonderful [Gigalixir](https://gigalixir.com/), which manages the whole process for me.