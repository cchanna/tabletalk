defmodule Tabletalk.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Accounts.User


  schema "users" do
    field :usage, :integer
    field :earliest_token_time, :utc_datetime
    has_many :auths, Tabletalk.Accounts.Auth
    has_many :players, Tabletalk.Games.Player

    timestamps()
  end


  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:usage, :earliest_token_time])
    |> validate_required([:earliest_token_time])
  end
end
