defmodule Tabletalk.Monsterhearts.Roll do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.Chat
  alias Tabletalk.Monsterhearts.Roll

  schema "monsterhearts_rolls" do
    belongs_to :chat, Chat
    field :die1, :integer
    field :die2, :integer
    field :bonus, :integer
  end

  @doc false
  def changeset(%Roll{} = roll, attrs) do
    roll
    |> cast(attrs, [
      :die1, :die2, :bonus
    ])  
    |> validate_required([:die1, :die2, :bonus])
  end
end