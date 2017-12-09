defmodule Tabletalk.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Accounts.User


  schema "users" do
    field :usage, :integer
    field :earliest_token_time, :utc_datetime
    has_many :auths, Tabletalk.Accounts.Auth, on_delete: :delete_all
    has_many :players, Tabletalk.Games.Player, on_delete: :delete_all

    timestamps()
  end


  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:usage, :earliest_token_time])
    |> validate_required([:earliest_token_time])
  end
end
