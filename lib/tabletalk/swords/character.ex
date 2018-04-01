defmodule Tabletalk.Swords.Character do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.{Player, Character}
  
  schema "swords_characters" do
    belongs_to :player, Player

    timestamps()
  end
  
  @doc false
  def changeset(%Character{} = model, attrs) do
    model
    |> cast(attrs, [:player_id])
    |> validate_required([:player_id])
  end
end
