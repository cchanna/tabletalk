defmodule Tabletalk.Accounts.Auth do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tabletalk.Accounts.{Auth, User}


  schema "auths" do
    field :provider, :integer
    field :uid,      :string
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(%Auth{} = auth, attrs) do
    auth
    |> cast(attrs, [:provider, :uid])
    |> cast_assoc(:user, with: &User.changeset/2)
    |> validate_required([:provider, :uid])
  end
end
