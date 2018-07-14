defmodule Tabletalk.DreamAskew.Setting do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.DreamAskew.{Setting}
  alias Tabletalk.Games.{Game, Player}

  schema "dream_askew_settings" do
    field :name, :string
    field :desire_1, :string
    field :desire_2, :string
    field :notes, :string

    belongs_to :game, Game
    belongs_to :player, Player
  end
  
  @doc false
  def changeset(%Setting{} = model, attrs) do
    model
    |> cast(attrs, [:game_id, :player_id, :name, :desire_1, :desire_2, :notes])
    |> validate_required([:game_id, :name])
  end
end
