defmodule Tabletalk.Monsterhearts.Advancement do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.MainCharacter
  alias Tabletalk.Monsterhearts.Advancement

  schema "monsterhearts_advancements" do
    belongs_to :main_character, MainCharacter
    field :name, :string
  end

  @doc false
  def changeset(%Advancement{} = model, attrs) do
    model
    |> cast(attrs, [
      :main_character_id, :name
    ])  
    |> validate_required([:name])
  end
end