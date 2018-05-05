defmodule Tabletalk.Swords.Reincorporation do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Tabletalk.Swords.Reincorporation
  
  schema "swords_reincorporations" do
    
  end
  
  @doc false
  def changeset(%Reincorporation{} = model, attrs) do
    model
    |> cast(attrs, [])
    |> validate_required([])
  end
end
