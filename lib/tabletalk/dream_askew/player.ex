defmodule Tabletalk.DreamAskew.Player do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.DreamAskew.{Player, Character, Setting}
  alias Tabletalk.Games
  
  schema "dream_askew_players" do
    field :tokens, :integer, default: 0

    belongs_to :player, Games.Player
    belongs_to :character, Character
    has_many :settings, Setting, on_delete: :nilify_all
  end
  
  @doc false
  def changeset(%Player{} = model, attrs) do
    model
    |> cast(attrs, [:player_id, :character_id, :tokens])
    |> validate_required([:player_id])
  end
end
