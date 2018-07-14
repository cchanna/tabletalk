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

    has_many :players, Tabletalk.Games.Player

    timestamps()
  end

  def filter_slug(slug) do
    slug
    |> String.trim
    |> String.replace(~r/\s/, "-")
    |> String.replace(~r/[^a-zA-Z0-9-_]/, "")
    |> String.downcase
  end

  @doc false
  def changeset(%Game{} = game, attrs) do
    game
    |> cast(attrs, [:name, :kind, :max_players, :slug])
    |> validate_required([:name, :kind, :max_players, :slug])
    |> update_change(:slug, &filter_slug/1)
    |> unique_constraint(:slug)
  end
end
