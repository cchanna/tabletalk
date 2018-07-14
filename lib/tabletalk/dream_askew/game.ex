defmodule Tabletalk.DreamAskew.Game do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.DreamAskew.{Game, Character, Setting, MinorCharacter}
  alias Tabletalk.Games
  
  schema "dream_askew_games" do
    belongs_to :game, Games.Game

    field :visuals, {:array, :string}, default: []
    field :conflicts, {:array, :string}, default: []

    has_many :players, through: [:game, :players, :dream_askew_player]
    has_many :characters, Character, references: :game_id, on_delete: :delete_all
    has_many :settings, Setting, references: :game_id, on_delete: :delete_all
    has_many :minor_characters, MinorCharacter, references: :game_id, on_delete: :delete_all
  end
  
  @doc false
  def changeset(%Game{} = model, attrs) do
    model
    |> cast(attrs, [:game_id, :visuals, :conflicts])
    |> validate_required([:game_id])
  end
end
