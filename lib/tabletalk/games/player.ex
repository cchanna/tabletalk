defmodule Tabletalk.Games.Player do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Games.Player
  alias Tabletalk.Accounts.User
  alias Tabletalk.Games.Game

  alias Tabletalk.Monsterhearts.PlayerSettings
  alias Tabletalk.{Swords, DreamAskew}

  require Logger

  schema "players" do
    field :admin, :boolean, default: false
    field :name, :string
    belongs_to :user, User
    belongs_to :game, Game

    has_one :monsterhearts_player_settings, PlayerSettings, on_delete: :delete_all
    has_one :swords_player, Swords.Player, on_delete: :delete_all
    has_one :dream_askew_player, DreamAskew.Player, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(%Player{} = player, attrs) do
    player
    |> cast(attrs, [:name, :admin, :user_id, :game_id])
    |> cast_assoc(:user, with: &User.changeset/2)
    |> cast_assoc(:game, with: &Game.changeset/2)
    |> validate_required([:name, :admin])
  end
end
