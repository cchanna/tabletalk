defmodule TabletalkWeb.GameController do
  use TabletalkWeb, :controller

  alias Tabletalk.Games

  action_fallback TabletalkWeb.FallbackController

  def index(conn, _params) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    games = Games.list_games(user_id)
    render(conn, "index.json", games: games)
  end

  def show(conn, %{"id" => id}) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    game = Games.get_game!(id, user_id)
    render(conn, "show.json", game: game)
  end

  def create(conn, %{"player" => player_name, "name" => game_name, "kind" => kind}) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    with {:ok, game} <- Games.new_game(user_id, player_name, game_name, kind) do
      conn
      |> put_status(:created)
      render(conn, "show.json", game: game)
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
