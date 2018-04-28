defmodule Tabletalk.Swords.Player do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.{Player, Character}
  alias Tabletalk.Games

  schema "swords_players" do
    belongs_to :player, Games.Player
    belongs_to :character, Character

    has_many :characters, Character

    timestamps()
  end
  
  @doc false
  def changeset(%Player{} = model, attrs) do
    model
    |> cast(attrs, [:player_id, :character_id])
    |> cast_assoc(:character)
    |> validate_required([:player_id])
  end
end
