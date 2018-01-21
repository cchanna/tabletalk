defmodule Tabletalk.Monsterhearts.PlayerSettings do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Games
  alias Tabletalk.Monsterhearts.PlayerSettings

  schema "monsterhearts_player_settings" do
    belongs_to :player, Games.Player

    field :is_gm, :boolean, default: false
  end

  @doc false
  def changeset(%PlayerSettings{} = player_settings, attrs) do
    player_settings
    |> cast(attrs, [
      :player_id, :is_gm
    ])  
    |> cast_assoc(:player, with: &Games.Player.changeset/2)
    |> validate_required([:player_id])
  end
end