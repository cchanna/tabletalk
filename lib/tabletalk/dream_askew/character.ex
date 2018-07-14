defmodule Tabletalk.DreamAskew.Character do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.DreamAskew.{Character, Player}
  alias Tabletalk.Games.Game
  
  schema "dream_askew_characters" do
    field :role, :string, null: false
    field :name, :string
    field :look_1, :string
    field :look_2, :string
    field :gender, :string
    field :pronouns, :string
    field :style_1, :string
    field :style_2, :string
    field :choices_1, {:array, :string}, default: []
    field :choices_2, {:array, :string}, default: []
    field :key_relationship_1, :string
    field :key_relationship_2, :string
    field :notes, :string

    belongs_to :game, Game
    has_one :player, Player, on_delete: :nilify_all

    timestamps()
  end
  
  @doc false
  def changeset(%Character{} = model, attrs) do
    model
    |> cast(attrs, [
      :game_id, :role, :name, :look_1, :look_2, :gender, :pronouns, :style_1, :style_2,
      :choices_1, :choices_2, :key_relationship_1, :key_relationship_2, :notes
    ]) 
    |> validate_required([:game_id, :role])
  end
end
