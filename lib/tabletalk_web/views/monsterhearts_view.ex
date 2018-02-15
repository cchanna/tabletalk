defmodule TabletalkWeb.MonsterheartsView do
  use TabletalkWeb, :view
  alias TabletalkWeb.MonsterheartsView
  alias Tabletalk.Games.Player
  alias Tabletalk.Monsterhearts.Character
  alias Tabletalk.Monsterhearts.MainCharacter
  alias Tabletalk.Monsterhearts.Chat
  alias Tabletalk.Monsterhearts.Talk
  alias Tabletalk.Monsterhearts.Roll
  alias Tabletalk.Monsterhearts.String
  alias Tabletalk.Monsterhearts.Definitions

  require Logger

  def to_json(nil), do: nil

  def to_json(player = %Player{}) do
    %{
      name: player.name,
      admin: player.admin,
      isGM: player.monsterhearts_player_settings.is_gm
    }
  end

  def to_json(%Ecto.Association.NotLoaded{}), do: []

  def to_json(main_character = %MainCharacter{}) do
    %{
      playerId: main_character.player_id,
      playbook: main_character.playbook,
      experience: main_character.experience,
      harm: main_character.harm,
      hot: main_character.hot,
      cold: main_character.cold,
      volatile: main_character.volatile,
      dark: main_character.dark,
      moves: main_character.moves |> Enum.map(fn x -> x.name end),
      moveNotesByName: main_character.moves |> Enum.filter(fn x -> x.notes end) |> Enum.map(fn x -> {x.name, x.notes} end) |> Map.new,
      look: main_character.look,
      eyes: main_character.eyes,
      origin: main_character.origin,
      advancements: main_character.advancements |> Enum.map(fn x -> x.name end),
      isRetired: main_character.is_retired
    }
  end

  def to_json(character = %Character{}) do
    %{
      id: character.id,
      name: character.name,
      conditions: character.conditions |> Enum.map(fn x -> x.name end),
      notes: character.notes,
      mainCharacter: character.main_character |> to_json
    }
  end

  def to_json(talk = %Talk{}) do
    %{
      text: talk.text,
      isLog: talk.is_log
    }
  end

  def to_json(roll = %Roll{}) do
    %{
      dice: [roll.die1, roll.die2],
      bonus: roll.bonus
    }
  end

  def to_json(chat = %Chat{}) do
    %{
      id: chat.id,
      insertedAt: chat.inserted_at,
      playerId: chat.player_id,
      talk: chat.talk |> to_json,
      roll: chat.roll |> to_json
    }
  end

  def to_json(string = %String{}) do
    %{
      id: string.id,
      from: string.from_id,
      to: string.to_id,
      value: string.count
    }
  end

  def by_id(data) do
    data |> Enum.map(fn x -> {x.id, x |> to_json} end) |> Map.new
  end

  def ids(data) do
    data |> Enum.map(fn x -> x.id end)
  end

  def render("load.json", %{characters: characters, players: players, chats: chats, strings: strings, me: me, game: game}) do
    %{
      charactersById: characters |> by_id,
      characters: characters |> ids,
      playersById: players |> by_id,
      players: players |> ids,
      me: me,
      chatsById: chats |> by_id,
      chats: chats |> ids,
      strings: strings |> ids,
      stringsById: strings |> by_id,
      definitions: %{
        movesByName: Definitions.moves_by_name,
        advancementsById: Definitions.advancements_by_id,
        playbooks: Definitions.playbooks,
        playbooksByName: Definitions.playbooks_by_name,
        seasonAdvances: Definitions.season_advances,
        growingUpMoves: Definitions.growing_up_moves
      }
    }
  end
end
