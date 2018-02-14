defmodule Tabletalk.Monsterhearts.Game do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.Game

  schema "monsterhearts_games" do
    belongs_to :game, Tabletalk.Games.Game
  end

  @doc false
  def changeset(%Game{} = model, attrs) do
    model
    |> cast(attrs, [
      :game_id
    ])
  end
end