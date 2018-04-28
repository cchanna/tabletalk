defmodule TabletalkWeb.GameController do
  use TabletalkWeb, :controller

  alias Tabletalk.Games
  alias Tabletalk.Monsterhearts
  alias Tabletalk.Swords

  require Logger

  action_fallback TabletalkWeb.FallbackController

  def index(conn, _params) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    games = Games.list_games(user_id)
    render(conn, "index.json", games: games)
  end

  def show(conn, %{"id" => slug}) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    game = Games.get_game!(slug, user_id)
    render(conn, "show.json", game: game)
  end

  def create(conn, params) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    {:ok, game} = Games.new_game(user_id, params["body"])
    case game.kind do
      1 -> Swords.handle_create(game.id, game.me)
    end
    conn
    |> put_status(:created)
    |> render("show.json", game: game)
  end

  def handle_join({:ok, data}, slug) do
    Logger.debug inspect(data)
    TabletalkWeb.Endpoint.broadcast("play:" <> slug, "dispatch", data)
  end

  def handle_join({:error, :none}, _game_id) do
    nil
  end

  def join(conn, %{"slug" => slug, "body" => %{"player" => player_name}}) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    {:ok, game, player} = Games.join(user_id, player_name, slug)
    case game.kind do
      1 -> Swords.handle_join(game.id, player.id)
      _ -> {:error, :none}
    end
    |> handle_join(slug)
    conn
    |> put_status(200)
    |> render("show.json", game: game)
  end

  defp load_game(0, game_id, player_id) do
    Monsterhearts.load(game_id, player_id)
  end

  defp load_game(1, game_id, player_id) do
    Swords.load(game_id, player_id)
  end

  def load(conn, %{"slug" => slug}) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    game = Games.get_game!(slug, user_id)
    player = Games.get_player(game.id, user_id)
    if player == nil do
      conn 
      |> put_status(401) 
      |> json(%{message: "You are not a player in this game."})
    else 
      data = load_game(game.kind, game.id, player.id)
      conn
      |> json(data)
    end
  end

  # def update(conn, %{"id" => id, "game" => game_params}) do
  #   game = Games.get_game!(id)

  #   with {:ok, %Game{} = game} <- Games.update_game(game, game_params) do
  #     render(conn, "show.json", game: game)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   game = Games.get_game!(id)
  #   with {:ok, %Game{}} <- Games.delete_game(game) do
  #     send_resp(conn, :no_content, "")
  #   end
  # end
end
