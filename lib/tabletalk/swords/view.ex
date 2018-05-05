defmodule Tabletalk.Swords.View do
  use Tabletalk.View

  alias Tabletalk.Games
  alias Games.Chat
  alias Tabletalk.Swords.{
    Player,
    Character,
    Motif,
    Thread
  }

  def to_json(%Motif{} = motif) do
    %{
      items: [motif.item1, motif.item2, motif.item3],
      reincorporation: motif.reincorporation_id
    }
  end

  def to_json(%Thread{} = thread) do
    %{
      id: thread.id,
      text: thread.text,
      reincorporation: thread.reincorporation_id
    }
  end

  def to_json(%Player{} = player) do
    %{
      id: player.player_id,
      name: player.player.name,
      character: player.character_id
    }
  end

  def to_json(%Character{} = character) do
    %{
      id: character.id,
      playerId: character.player_id,
      eidolon: character.eidolon,
      eidolonIsImage: character.eidolon_is_image,
      name: character.name,
      allThatMatters: character.all_that_matters,
      jovialFeat: character.jovial_feat,
      jovialFeatUsed: character.jovial_feat_used,
      glumFeat: character.glum_feat,
      glumFeatUsed: character.glum_feat_used,
      trick: character.trick,
      trickUsed: character.trick_used,
      notes: character.notes,
      reincorporation: character.reincorporation_id
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