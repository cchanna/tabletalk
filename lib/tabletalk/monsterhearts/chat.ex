defmodule Tabletalk.Monsterhearts.Chat do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Games.Game
  alias Tabletalk.Games.Player
  alias Tabletalk.Monsterhearts.Chat
  alias Tabletalk.Monsterhearts.Talk
  alias Tabletalk.Monsterhearts.Roll

  schema "monsterhearts_chats" do
    belongs_to :player, Player

    has_one :talk, Talk, on_delete: :delete_all
    has_one :roll, Roll, on_delete: :delete_all

    timestamps updated_at: false
  end

  @doc false
  def changeset(%Chat{} = chat, attrs) do
    chat
    |> cast(attrs, [
      :player_id
    ])  
    |> cast_assoc(:talk)
    |> cast_assoc(:roll)
    |> validate_required([:player_id])
  end
end