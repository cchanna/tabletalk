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
    field :slug, :string

    has_many :players, Tabletalk.Games.Player, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(%Game{} = game, attrs) do
    game
    |> cast(attrs, [:name, :kind, :max_players, :slug])
    |> validate_required([:name, :kind, :slug])
  end
end
