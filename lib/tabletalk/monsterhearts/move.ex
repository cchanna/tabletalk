defmodule Tabletalk.Monsterhearts.Move do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.MainCharacter
  alias Tabletalk.Monsterhearts.Move

  schema "monsterhearts_moves" do
    belongs_to :main_character, MainCharacter
    field :name, :string
    field :notes, :string
  end

  @doc false
  def changeset(%Move{} = move, attrs) do
    move
    |> cast(attrs, [
      :main_character_id, :name, :notes
    ])  
    |> validate_required([:name])
  end
end