defmodule Tabletalk.Swords do
  import Ecto.Query, warn: false
  alias Tabletalk.Swords

  require Logger

  alias Tabletalk.Games
  alias Swords.{Player, Game, Character}
  alias Tabletalk.Repo

  import Swords.View

  def load(game_id, player_id) do
    events = Games.list_chats!(game_id)
    game = get_or_create_game!(game_id, player_id)

    %{
      diceHolder: game.dice_holder_id,
      overplayer: game.overplayer_id,
      glumColors: game.glum_colors,
      isGlumTextDark: game.glum_text_is_dark,
      jovialColors: game.jovial_colors,
      isJovialTextDark: game.jovial_text_is_dark,
      dice: if(game.glum_die === nil, do: nil, else: %{
        glum: game.glum_die,
        jovial: game.jovial_die
      }),
      playerIds: game.players |> Enum.map(fn x -> x.player_id end),
      playersById: game.players |> Enum.map(fn x -> {x.player_id, x |> to_json} end) |> Map.new,
      characterIds: game.characters |> ids,
      charactersById: game.characters |> by_id,
      eventsById: events |> by_id,
      eventIds: events |> ids,
      me: player_id
    }
  end

  def handle_join(game_id, player_id) do
    player = create_player!(%{
      "player_id" => player_id
    })
    |> Repo.preload([:player])
    character = create_character!(%{
      "player_id" => player.id
    })
    player = update_player!(player, %{
      "character_id" => character.id
    })
    event = Games.create_chat!(%{
      "player_id" => player_id,
      "data" => %{
        type: "SWORDS_PLAYER_JOIN",
        player: to_json(player),
        character: to_json(character)
      }
    })
    {:ok, event |> to_json}
  end

  defp get_preloaded_game(game_id) do
    query = from g in Game,
      join: gg in Games.Game, on: gg.id == g.game_id,
      join: gp in Games.Player, on: gg.id == gp.game_id,
      left_join: p in Player, on: gp.id == p.player_id,
      left_join: c in Character, on: p.id == c.player_id,
      where: gg.id == ^game_id,
      preload: [players: {p, player: gp}, characters: c]
    Repo.one(query)
  end

  defp get_or_create_game!(game_id, player_id) do
    game = get_preloaded_game(game_id)
    if game === nil do
      game = create_game!(%{
        "game_id" => game_id,
        "dice_holder_id" => player_id,
        "overplayer_id" => player_id,
      })
      player = create_player!(%{
        "player_id" => player_id,
        "tone" => true
      })
      get_preloaded_game(game_id)
    else
      game
    end
  end

  defp create_character!(attrs) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert!()
  end

  defp create_game!(attrs) do
    %Game{}
    |> Game.changeset(attrs)
    |> Repo.insert!()
  end

  def update_game!(%Game{} = game, attrs) do
    game
    |> Game.changeset(attrs)
    |> Repo.update!()
  end

  def get_game!(game_id) do
    Game
    |> Repo.get_by!(game_id: game_id)
  end

  defp create_player!(attrs) do
    %Player{}
    |> Player.changeset(attrs)
    |> Repo.insert!()
  end

  def get_player!(player_id) do
    Player
    |> Repo.get_by!(player_id: player_id)
  end

  def update_player!(%Player{} = player, attrs) do
    player
    |> Player.changeset(attrs)
    |> Repo.update!()
  end

  def set_overtone(game_id, tone) do
    tone_value = if tone, do: 1, else: 0
    from(p in Player,
      join: gp in Games.Player, on: gp.id == p.player_id,
      where: gp.game_id == ^game_id,
      update: [set: [tone: fragment("(CASE WHEN ? IS NULL THEN (CASE WHEN ? = 0 THEN FALSE ELSE TRUE END) ELSE NULL END)", p.character_id, ^tone_value)]])
    |> Repo.update_all([])
  end


end