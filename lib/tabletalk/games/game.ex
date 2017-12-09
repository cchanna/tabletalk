defmodule Tabletalk.Games.Game do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Games.Game

  require Logger


  schema "games" do
    field :kind, :integer
    field :max_players, :integer
    field :name, :string
    field :me, :boolean, virtual: true

    has_many :players, Tabletalk.Games.Player, on_delete: :delete_all

    timestamps()
  end

  def log(changeset) do
    Logger.debug inspect changeset
    changeset
  end  

  @doc false
  def changeset(%Game{} = game, attrs) do
    game
    |> cast(attrs, [:name, :kind, :max_players])
    |> log()
    |> validate_required([:name, :kind])
  end
end
