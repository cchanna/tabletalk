defmodule Tabletalk.Games.Player do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Games.Player
  alias Tabletalk.Accounts.User
  alias Tabletalk.Games.Game

  require Logger

  schema "players" do
    field :admin, :boolean, default: false
    field :name, :string
    belongs_to :user, User
    belongs_to :game, Game

    timestamps()
  end

  def log(changeset) do
    Logger.debug inspect changeset.changes
    Logger.debug inspect changeset.data
    changeset
  end  

  @doc false
  def changeset(%Player{} = player, attrs) do
    player
    |> cast(attrs, [:name, :admin, :user_id, :game_id])
    |> log()
    |> cast_assoc(:user, with: &User.changeset/2)
    |> log()
    |> cast_assoc(:game, with: &Game.changeset/2)
    |> log()
    |> validate_required([:name, :admin])
    |> log()
  end
end
