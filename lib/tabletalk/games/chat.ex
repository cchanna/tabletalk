defmodule Tabletalk.Games.Chat do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Games.Chat

  alias Tabletalk.Games.Player
  
  schema "chats" do
    belongs_to :player, Player
    field :data, :map 

    timestamps updated_at: false
  end

  @doc false
  def changeset(%Chat{} = model, attrs) do
    model
    |> cast(attrs, [:player_id, :data])
    |> validate_required([:data])
  end
end
