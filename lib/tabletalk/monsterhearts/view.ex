defmodule Tabletalk.Monsterhearts.View do
  use Tabletalk.View

  alias Tabletalk.Games.Player
  alias Tabletalk.Monsterhearts.{
    Character,
    MainCharacter,
    CustomMove,
    CustomPlaybook,
    String
  }
  alias Tabletalk.Games.Chat

  require Logger

  def to_json(cm = %CustomMove{}) do
    %{
      name: cm.name,
      playbook: cm.playbook,
      text: cm.text,
      notes: cm.notes
    }
  end

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
      isRetired: main_character.is_retired,
      darkestSelf: main_character.darkest_self
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

  def to_json(chat = %Chat{}) do
    %{
      id: chat.id,
      insertedAt: chat.inserted_at,
      playerId: chat.player_id,
      data: chat.data
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
end