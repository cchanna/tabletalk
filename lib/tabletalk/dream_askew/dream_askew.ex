defmodule Tabletalk.DreamAskew do
  import Ecto.Query, warn: false
  alias Tabletalk.DreamAskew

  require Logger

  alias Tabletalk.Games
  alias Tabletalk.Repo
  alias DreamAskew.{
    Definitions, Character, Player, Setting, MinorCharacter, Game
  }

  import DreamAskew.View

  def load(game_id, player_id) do
    events = Games.list_chats!(game_id)
    query = from g in Game,
      join: gg in Games.Game, on: gg.id == g.game_id,
      join: gp in Games.Player, on: gg.id == gp.game_id,
      join: p in Player, on: gp.id == p.player_id,
      left_join: c in Character, on: g.game_id == c.game_id,
      left_join: s in Setting, on: g.game_id == s.game_id,
      left_join: mc in MinorCharacter, on: g.game_id == mc.game_id,
      where: gg.id == ^game_id,
      preload: [
        players: {p, player: gp},
        characters: c,
        settings: s,
        minor_characters: mc
      ]
    game = Repo.one!(query)
    %{
      playerIds: game.players |> Enum.map(fn x -> x.player_id end),
      playersById: game.players |> Enum.map(fn x -> {x.player_id, x |> to_json} end) |> Map.new,
      eventsById: events |> by_id,
      eventIds: events |> ids,
      me: player_id,
      characterIds: game.characters |> ids,
      charactersById: game.characters |> by_id,
      settingsByName: game.settings |> Enum.map(fn x -> {x.name, x |> to_json} end) |> Map.new,
      minorCharacterIds: game.minor_characters |> ids,
      minorCharactersById: game.minor_characters |> by_id,
      visuals: game.visuals,
      conflicts: game.conflicts,
      definitions: Definitions.get_definitions
    }
  end

  def handle_join(_game_id, player_id) do
    player = create_player!(%{"player_id" => player_id})
    |> Repo.preload([:player])
    event = Games.create_chat!(%{
      "player_id" => player_id,
      "data" => %{
        type: "DREAM_ASKEW_PLAYER_JOIN",
        player: player |> to_json
      }
    })
    {:ok, event |> to_json}
  end

  def handle_create(game_id, player_id) do
    create_game!(%{"game_id" => game_id})
    create_player!(%{"player_id" => player_id})
  end

  def get_game!(game_id) do
    Game
    |> Repo.get_by!(%{game_id: game_id})
  end

  def create_game!(attrs \\ %{}) do
    %Game{}
    |> Game.changeset(attrs)
    |> Repo.insert!()
  end

  def update_game!(%Game{} = game, attrs) do
    game
    |> Game.changeset(attrs)
    |> Repo.update!()
  end

  def get_player_ext!(id) do
    Player
    |> Repo.get_by!(%{player_id: id})
  end

  def create_player!(attrs \\ %{}) do
    %Player{}
    |> Player.changeset(attrs)
    |> Repo.insert!()
  end

  def update_player!(%Player{} = player, attrs) do
    player
    |> Player.changeset(attrs)
    |> Repo.update!()
  end

  def get_character!(id) do
    Character
    |> Repo.get!(id)
  end

  def create_character!(attrs \\ %{}) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert!()
  end

  def update_character!(%Character{} = character, attrs) do
    character
    |> Character.changeset(attrs)
    |> Repo.update!()
  end

  def create_setting!(attrs \\ %{}) do
    %Setting{}
    |> Setting.changeset(attrs)
    |> Repo.insert!()
  end

  def update_setting!(%Setting{} = setting, attrs) do
    setting
    |> Setting.changeset(attrs)
    |> Repo.update!()
  end

  def get_setting!(name, game_id) do
    Setting
    |> Repo.get_by!(%{name: name, game_id: game_id})
  end

  def get_minor_character!(id) do
    MinorCharacter
    |> Repo.get!(id)
  end

  def create_minor_character!(attrs \\ %{}) do
    %MinorCharacter{}
    |> MinorCharacter.changeset(attrs)
    |> Repo.insert!()
  end

  def update_minor_character!(%MinorCharacter{} = minor_character, attrs) do
    minor_character
    |> MinorCharacter.changeset(attrs)
    |> Repo.update!()
  end

end