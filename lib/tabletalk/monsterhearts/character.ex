defmodule Tabletalk.Monsterhearts.Character do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.Character

  alias Tabletalk.Games.Game
  alias Tabletalk.Monsterhearts.MainCharacter
  alias Tabletalk.Monsterhearts.String
  alias Tabletalk.Monsterhearts.Condition

  schema "monsterhearts_characters" do
    belongs_to :game, Game
    field :name, :string
    field :notes, :string

    has_one :main_character, MainCharacter, on_delete: :delete_all
    has_many :strings, String, on_delete: :delete_all
    has_many :strings_on, String, on_delete: :delete_all, foreign_key: :on_id
    has_many :conditions, Condition, on_delete: :delete_all
  end

  @doc false
  def changeset(%Character{} = character, attrs) do
    character
    |> cast(attrs, [
      :game_id, :name, :notes
    ])  
    |> cast_assoc(:main_character)
    |> validate_required([:game_id])
  end
end