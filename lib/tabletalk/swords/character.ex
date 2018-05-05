defmodule Tabletalk.Swords.Character do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.{Character, Reincorporation}
  alias Tabletalk.Games.Player


  schema "swords_characters" do
    belongs_to :player, Player
    field :eidolon, :string
    field :eidolon_is_image, :boolean
    field :name, :string
    field :all_that_matters, {:array, :string}
    field :jovial_feat, :string
    field :jovial_feat_used, :boolean
    field :glum_feat, :string
    field :glum_feat_used, :boolean
    field :trick, :string
    field :trick_used, :boolean
    field :notes, :string
    belongs_to :reincorporation, Reincorporation

    timestamps()
  end
  
  @doc false
  def changeset(%Character{} = model, attrs) do
    model
    |> cast(attrs, [
      :player_id, :eidolon, :eidolon_is_image, :name, :all_that_matters, 
      :jovial_feat, :jovial_feat_used, :glum_feat, :glum_feat_used,
      :trick, :trick_used, :notes, :reincorporation_id
      ])
    |> validate_required([:player_id])
  end
end
