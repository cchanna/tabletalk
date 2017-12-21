defmodule Tabletalk.Games.Permission do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Games.Permission
  alias Tabletalk.Games.Game

  schema "permissions" do
    belongs_to :game, Game
    field :players, :string
  end

  @doc false
  def changeset(%Permission{} = player, attrs) do
    player
    |> cast(attrs, [:players, :game_id])
    |> cast_assoc(:game, with: &Game.changeset/2)
    |> validate_required([:players, :game_id])
  end
end
