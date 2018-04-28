defmodule Tabletalk.Swords.Game do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.{Game, Player, Motif, Thread}
  alias Tabletalk.Games
  alias Games
  
  schema "swords_games" do
    belongs_to :game, Games.Game
    belongs_to :dice_holder, Player
    belongs_to :overplayer, Player
    field :glum_colors, {:array, :string}
    field :glum_text_is_dark, :boolean
    field :jovial_colors, {:array, :string}
    field :jovial_text_is_dark, :boolean
    field :glum_die, :integer
    field :jovial_die, :integer
    field :overtone, :boolean
    field :dice_tone, :boolean

    belongs_to :motif1, Motif
    belongs_to :motif2, Motif
    belongs_to :motif3, Motif

    has_many :players, through: [:game, :players, :swords_player]
    has_many :characters, through: [:players, :characters]
    has_many :threads, Thread

    timestamps()
  end
  
  @doc false
  def changeset(%Game{} = model, attrs) do
    model
    |> cast(attrs, [
      :game_id, :dice_holder_id, :overplayer_id,
      :glum_colors, :glum_text_is_dark, :jovial_colors, :jovial_text_is_dark,
      :overtone, :dice_tone,
      :motif1_id, :motif2_id, :motif3_id,
      :glum_die, :jovial_die
    ])
    |> cast_assoc(:motif1)
    |> cast_assoc(:motif2)
    |> cast_assoc(:motif3)
    |> validate_required([:game_id, :dice_holder_id, :overplayer_id])
  end
end
