defmodule Tabletalk.Swords.Thread do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.{Thread, Reincorporation, Game}

  schema "swords_threads" do
    belongs_to :game, Game
    field :text, :string
    belongs_to :reincorporation, Reincorporation
  end
  
  @doc false
  def changeset(%Thread{} = model, attrs) do
    model
    |> cast(attrs, [:game_id, :text, :reincorporation_id])
    |> validate_required([:game_id, :text])
  end
end
