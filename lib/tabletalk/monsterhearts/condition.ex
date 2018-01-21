defmodule Tabletalk.Monsterhearts.Condition do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.Character
  alias Tabletalk.Monsterhearts.Condition

  schema "monsterhearts_conditions" do
    belongs_to :character, Character
    field :name, :string
  end

  @doc false
  def changeset(%Condition{} = condition, attrs) do
    condition
    |> cast(attrs, [
      :character_id, :name
    ])  
    |> cast_assoc(:character, with: &Character.changeset/2)
    |> validate_required([:character_id, :name])
  end
end