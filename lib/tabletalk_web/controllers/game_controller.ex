defmodule TabletalkWeb.GameController do
  use TabletalkWeb, :controller

  alias Tabletalk.Games

  action_fallback TabletalkWeb.FallbackController

  def index(conn, _params) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    games = Games.list_games(user_id)
    render(conn, "index.json", games: games)
  end

  # def create(conn, %{"game" => game_params}) do
  #   with {:ok, %Game{} = game} <- Games.create_game(game_params) do
  #     conn
  #     |> put_status(:created)
  #     |> put_resp_header("location", game_path(conn, :show, game))
  #     |> render("show.json", game: game)
  #   end
  # end

  def show(conn, %{"id" => id}) do
    user_id = Tabletalk.Guardian.Plug.current_resource(conn)
    game = Games.get_game!(id, user_id)
    render(conn, "show.json", game: game)
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
