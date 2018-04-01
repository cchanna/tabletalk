defmodule Tabletalk.Swords.Game do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.{Game, Player, Character}
  alias Tabletalk.Games
  
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

    has_many :players, through: [:game, :players, :swords_player]
    has_many :characters, through: [:players, :characters]

    timestamps()
  end
  
  @doc false
  def changeset(%Game{} = model, attrs) do
    model
    |> cast(attrs, [
      :game_id, :dice_holder_id, :overplayer_id,
      :glum_colors, :glum_text_is_dark, :jovial_colors, :jovial_text_is_dark,
      :glum_die, :jovial_die
    ])
    |> validate_required([:game_id, :dice_holder_id, :overplayer_id])
  end
end
