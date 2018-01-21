defmodule Tabletalk.Monsterhearts.Talk do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Monsterhearts.Chat
  alias Tabletalk.Monsterhearts.Talk

  schema "monsterhearts_talks" do
    belongs_to :chat, Chat
    field :text, :string
    field :is_log, :boolean
  end

  @doc false
  def changeset(%Talk{} = talk, attrs) do
    talk
    |> cast(attrs, [
      :text, :is_log
    ])  
    |> validate_required([:text])
  end
end