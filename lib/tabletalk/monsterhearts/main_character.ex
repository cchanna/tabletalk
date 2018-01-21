defmodule Tabletalk.Monsterhearts.MainCharacter do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.MainCharacter
  alias Tabletalk.Games.Game
  alias Tabletalk.Games.Player
  alias Tabletalk.Monsterhearts.Character
  alias Tabletalk.Monsterhearts.Move
  # alias Tabletalk.Monsterhearts.Advancement

  schema "monsterhearts_main_characters" do
    belongs_to :character, Character
    belongs_to :player, Player

    field :playbook, :string
    field :look, :string, default: ""
    field :eyes, :string, default: ""
    field :origin, :string, default: ""

    field :hot,      :integer
    field :cold,     :integer
    field :volatile, :integer
    field :dark,     :integer

    field :harm, :integer, default: 0
    field :experience, :integer, default: 0

    has_many :moves, Move, on_delete: :delete_all
    # has_many :advancements, Advancement, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(%MainCharacter{} = character, attrs) do
    character
    |> cast(attrs, [
      :player_id, :playbook, :look, :eyes, :origin, :hot, :cold,
      :volatile, :dark, :harm, :experience
    ])      
    |> cast_assoc(:moves)
    |> validate_required([:player_id, :playbook])
  end
end