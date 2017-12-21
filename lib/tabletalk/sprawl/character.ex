defmodule Tabletalk.Sprawl.Character do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Sprawl.Character
  alias Tabletalk.Games.Permission
  alias Tabletalk.Games.Game

  schema "sprawl_characters" do
    belongs_to :game, Game
    belongs_to :edit, Permission
    belongs_to :view, Permission

    field :playbook, :string
    field :name,     :string,  default: ""
    field :eyes,     :string,  default: ""
    field :face,     :string,  default: ""
    field :body,     :string,  default: ""
    field :wear,     :string,  default: ""
    field :skin,     :string,  default: ""
    field :look,     :string,  default: ""
    field :notes,    :string,  default: ""
    field :xp,       :integer, default: 0
    field :cred,     :integer, default: 0
    field :style,    :integer, default: 0 
    field :edge,     :integer, default: 0 
    field :cool,     :integer, default: 0 
    field :mind,     :integer, default: 0 
    field :meat,     :integer, default: 0 
    field :synth,    :integer, default: 0 
    field :harm,     :integer, default: 0 
    field :gear,     :integer, default: 0 
    field :intel,    :integer, default: 0 

    timestamps()
  end

  @doc false
  def changeset(%Character{} = player, attrs) do
    player
    |> cast(attrs, [
        :game_id, :edit, :view, :playbook, :name, :eyes,
        :face, :body, :wear, :skin, :look, :notes, :xp, :cred,
        :style, :edge, :cool, :mind, :meat, :synth, :harm,
        :gear, :intel
      ])
    |> cast_assoc(:game, with: &Game.changeset/2)
    |> validate_required([:game_id, :playbook])
  end
end
