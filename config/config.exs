# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tabletalk,
  ecto_repos: [Tabletalk.Repo]

# Configures the endpoint
config :tabletalk, TabletalkWeb.Endpoint,
  url: [host: "192.168.0.104"],
  secret_key_base: "03I0GC+5Pc084wIF3LMUV+hF1Z8Ts+KGa/Bh1/tpjx9iAaZqrp+tVSv2YRzzL8nC",
  render_errors: [view: TabletalkWeb.ErrorView, accepts: ~w(json), format: "json"],
  pubsub: [name: Tabletalk.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]


config :tabletalk, Tabletalk.Google.Token,
  client_id: "472844306619-t6hdkqi1inqfebtl1uqlpbfp6od2leo6.apps.googleusercontent.com"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
