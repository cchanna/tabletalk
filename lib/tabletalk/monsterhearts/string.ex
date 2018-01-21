defmodule Tabletalk.Monsterhearts.String do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Games.Game
  alias Tabletalk.Monsterhearts.Character
  alias Tabletalk.Monsterhearts.String

  schema "monsterhearts_strings" do
    belongs_to :to, Character
    belongs_to :from, Character
    field :count, :integer, default: 1
  end

  @doc false
  def changeset(%String{} = string, attrs) do
    string
    |> cast(attrs, [
      :to_id, :from_id, :count
    ])  
    |> validate_required([:to_id, :from_id])
  end
end