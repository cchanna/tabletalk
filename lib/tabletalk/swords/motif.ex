defmodule Tabletalk.Swords.Motif do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.{Motif, Character, Game}

  schema "swords_motifs" do
    field :item1, :string, default: ""
    field :item2, :string, default: ""
    field :item3, :string, default: ""
    belongs_to :reincorporated_by, Character
  end
  
  @doc false
  def changeset(%Motif{} = model, attrs) do
    model
    |> cast(attrs, [:item1, :item2, :item3, :reincorporated_by_id])
    |> validate_required([])
  end
end
