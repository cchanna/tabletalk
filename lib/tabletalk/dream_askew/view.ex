defmodule Tabletalk.DreamAskew.View do
  use Tabletalk.View

  alias Tabletalk.Games
  alias Tabletalk.DreamAskew.{Player, Setting, Character, MinorCharacter}
  alias Games.Chat

  def to_array(a, b) do
    case {a, b} do
      {nil, nil} -> []
      {nil, y} -> [y]
      {x, nil} -> [x]
      {x, y} -> [x, y] 
    end
  end

  def to_json(%Player{} = player) do
    %{
      id: player.player_id,
      name: player.player.name,
      character: player.character_id,
      tokens: player.tokens
    }
  end

  def to_json(%Setting{} = setting) do
    %{
      id: setting.id,
      name: setting.name,
      player: setting.player_id,
      desires: to_array(setting.desire_1, setting.desire_2),
      notes: setting.notes
    }
  end

  def to_json(%Character{} = character) do
    %{
      id: character.id,
      role: character.role,
      name: character.name,
      look1: character.look_1,
      look2: character.look_2,
      gender: character.gender,
      pronouns: character.pronouns,
      styles: to_array(character.style_1, character.style_2),
      choices1: character.choices_1,
      choices2: character.choices_2,
      keyRelationships: to_array(character.key_relationship_1, character.key_relationship_2)
    }
  end

  def to_json(%MinorCharacter{} = minor_character) do
    %{
      id: minor_character.id,
      name: minor_character.name,
      notes: minor_character.notes
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
end