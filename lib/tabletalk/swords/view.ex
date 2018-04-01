defmodule Tabletalk.Swords.View do
  use Tabletalk.View

  alias Tabletalk.Games
  alias Games.Chat
  alias Tabletalk.Swords.{
    Game,
    Player,
    Character
  }

  def to_json(%Game{} = game) do
  end

  def to_json(%Player{} = player) do
    %{
      id: player.player_id,
      name: player.player.name,
      tone: player.tone,
      character: player.character_id
    }
  end

  def to_json(%Character{} = character) do
    %{
      id: character.id
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