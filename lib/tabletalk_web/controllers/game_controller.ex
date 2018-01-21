defmodule TabletalkWeb.GameController do
  use TabletalkWeb, :controller

  alias Tabletalk.Games
  alias Tabletalk.Monsterhearts

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
    with {:ok, game} <- Games.new_game(user_id, params) do
      conn
      |> put_status(:created)
      |> render("show.json", game: game)
    end
  end

  def join(conn, %{"slug" => slug, "player" => player}) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    with {:ok, game} <- Games.join(user_id, player, slug) do
      conn
      |> put_status(200)
      |> render("show.json", game: game)
    end
  end

  defp load_monsterhearts(conn, game_id, player_id) do
    data = Monsterhearts.load(game_id, player_id)
    conn
    |> render(TabletalkWeb.MonsterheartsView, "load.json", data)
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
      case game.kind do
        0 -> conn |> load_monsterhearts(game.id, player.id)
        _else -> conn |> put_status(500) |> json("oops!")
      end
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
