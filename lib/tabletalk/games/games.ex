defmodule Tabletalk.Games do
  @moduledoc """
  The Games context.
  """

  import Ecto.Query, warn: false
  alias Tabletalk.Repo

  alias Tabletalk.Games.Game
  alias Tabletalk.Games.Player
  alias Tabletalk.Games.Permission
  
  require Logger



  defp make_permission!(game_id, players) do
    %Permission{}
    |> Permission.changeset(%{"game_id" => game_id, "players" => players})
    |> Repo.insert!
  end

  def permission_for!(game_id, players) when game_id !== nil and is_list(players) do
    players_string = players |> Enum.sort() |> Enum.join(" ")
    case Repo.get_by(Permission, game_id: game_id, players: players_string) do
      nil -> make_permission!(game_id, players_string)
      permission -> permission
    end
  end

  def list_games(user_id) do
    query = from g in Game,
      left_join: p in assoc(g, :players),
      where: ^user_id == p.user_id,
      select: %{g | me: p.id},
      preload: :players,
      order_by: :name
    Repo.all query
  end

  def get_game!(slug, user_id) do
    game = Game
    |> Repo.get_by!(slug: slug)
    |> Repo.preload(:players)
    player = get_player(game.id, user_id) 
    case player do
      %{id: id} -> %{game | me: id}
      nil -> game
    end
  end

  defp game_with_players(game, player_id) do
    %{Repo.preload(game, :players) | me: player_id}
  end

  defp game_from_player(player) do
    Repo.preload(player, :game).game
    |> game_with_players(player.id)
  end

  # defp create_game(attrs) do
  #   %Game{}
  #   |> Game.changeset(attrs)
  #   |> Repo.insert()
  # end
  

  def new_game(user_id, params = %{}) do
    {%{"player" => player_name}, game} = Map.split(params, ["player"]) 

    opts = %{"name" => player_name, "admin" => true, "game" => game, "user_id" => user_id}
    with {:ok, player} <- create_player(opts) do
      {:ok, game_with_players(player.game, player.id)}
    end
  end

  defp check_already_joined(game) do
    if game.me != nil do
      {:error, :already_joined}
    else
      :ok
    end
  end

  defp check_max_players(game) do
    if game.max_players != nil and Enum.count(game.players) >= game.max_players do
      {:error, :too_many_players}
    else
      :ok
    end
  end

  def join(user_id, player_name, slug) do
    game = get_game!(slug, user_id)
    
    with :ok <- check_already_joined(game),
         :ok <- check_max_players(game),
         {:ok, player} <- create_player(%{"name" => player_name, "admin" => false, "game_id" => game.id, "user_id" => user_id}),
         do: {:ok, game_from_player(player)}
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
