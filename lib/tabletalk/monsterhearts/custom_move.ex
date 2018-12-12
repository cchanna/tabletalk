defmodule Tabletalk.Monsterhearts.CustomMove do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.CustomMove
  
  schema "custom_move" do
    belongs_to :game, Game
    field :name, :string
    field :text, :string
    field :notes, :boolean, default: false

    timestamps()
  end
  
  @doc false
  def changeset(%CustomMove{} = model, attrs) do
    model
    |> cast(attrs, [:name, :text, :notes, :game_id])
    |> validate_required([:game_id, :name, :text])
  end
end
