defmodule Tabletalk.Games do
  @moduledoc """
  The Games context.
  """

  import Ecto.Query, warn: false
  alias Tabletalk.Repo

  alias Tabletalk.Games.Game
  alias Tabletalk.Games.Player
  
  require Logger


  def list_games(user_id) do
    query = from g in Game,
      left_join: p in assoc(g, :players),
      where: ^user_id == p.user_id,
      select: %{g | me: p.id},
      preload: :players,
      order_by: :name
    Repo.all query
  end

  def get_game!(id, user_id) do
    player = get_player(id, user_id) 
    game = Game
    |> Repo.get!(id)
    |> Repo.preload(:players)
    case player do
      %{id: id} -> %{game | me: id}
      nil -> game
    end
  end

  # defp create_game(attrs) do
  #   %Game{}
  #   |> Game.changeset(attrs)
  #   |> Repo.insert()
  # end

  def new_game(user_id, player_name, game_name, kind) do
    with {:ok, player} <- create_player(%{"name" => player_name, "admin" => true, "game" => %{"name" => game_name, "kind" => kind}, "user_id" => user_id}),
         do: {:ok, Repo.preload(player.game, :players)}
  end

  # defp update_game(%Game{} = game, attrs) do
  #   game
  #   |> Game.changeset(attrs)
  #   |> Repo.update()
  # end

  # defp delete_game(%Game{} = game) do
  #   Repo.delete(game)
  # end

  # defp change_game(%Game{} = game) do
  #   Game.changeset(game, %{})
  # end


  # def list_players do
  #   Repo.all(Player)
  # end

  def get_player(game_id, user_id) do
    Player
    |> Repo.get_by(%{user_id: user_id, game_id: game_id})
  end

  # def get_player!(id), do: Repo.get!(Player, id)

  def create_player(attrs \\ %{}) do
    %Player{}
    |> Player.changeset(attrs)
    |> Repo.insert()
  end

  # def update_player(%Player{} = player, attrs) do
  #   player
  #   |> Player.changeset(attrs)
  #   |> Repo.update()
  # end

  # def delete_player(%Player{} = player) do
  #   Repo.delete(player)
  # end

  # def change_player(%Player{} = player) do
  #   Player.changeset(player, %{})
  # end
end
