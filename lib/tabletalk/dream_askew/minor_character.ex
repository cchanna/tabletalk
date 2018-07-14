defmodule Tabletalk.DreamAskew.MinorCharacter do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.DreamAskew.MinorCharacter
  alias Tabletalk.Games.Game

  schema "dream_askew_minor_characters" do
    field :name, :string
    field :notes, :string

    belongs_to :game, Game
  end
  
  @doc false
  def changeset(%MinorCharacter{} = model, attrs) do
    model
    |> cast(attrs, [:game_id, :name, :notes])
    |> validate_required([:name, :game_id])
  end
end
