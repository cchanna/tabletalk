defmodule Tabletalk.Monsterhearts.CustomPlaybook do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.CustomPlaybook

  alias Tabletalk.Games.Game

  schema "monsterhearts_custom_playbooks" do
    belongs_to :game, Game
    field :name, :string
  end

  @doc false
  def changeset(%CustomPlaybook{} = model, attrs) do
    model
    |> cast(attrs, [
      :game_id, :name
    ])  
    |> validate_required([:game_id, :name])
  end
end