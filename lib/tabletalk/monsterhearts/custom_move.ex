defmodule Tabletalk.Monsterhearts.CustomMove do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.CustomMove
  
  schema "monsterhearts_custom_moves" do
    belongs_to :game, Game
    field :playbook, :string
    field :name, :string
    field :text, :string
    field :notes, :boolean, default: false
  end
  
  @doc false
  def changeset(%CustomMove{} = model, attrs) do
    model
    |> cast(attrs, [:name, :playbook, :text, :notes, :game_id])
    |> validate_required([:game_id, :name, :text])
  end
end
