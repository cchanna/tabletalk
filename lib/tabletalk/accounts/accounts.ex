defmodule Tabletalk.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Tabletalk.Repo
  alias Tabletalk.Google.Token

  alias Tabletalk.Accounts.{User, Auth}

  defp provider_id(:google), do: 0

  defp login_user!(provider, uid) do
    params = %{provider: provider_id(provider), uid: uid}
    auth = Auth
    |> Repo.get_by(params)
    |> Repo.preload(:user)
    case auth do
      nil -> signup_new_user!(params)
      %{user_id: user_id} -> user_id
    end
  end

  def login_result(%{id: id, user_id: user_id}) do
    %{authId: id, userId: user_id}
  end

  defp login_with_sub(provider, sub) do
    user_id = login_user!(provider, sub)
    {:ok, jwt, _claims} = Tabletalk.Guardian.encode_and_sign(user_id)
    %{jwt: jwt, user_id: user_id}
  end

  def login(provider, jwt) do
    case Token.validate(jwt) do
      {:ok, %{sub: sub}} -> {:ok, login_with_sub(provider, sub)}
      {:error, error} -> {:error, error}
    end
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id) do
    User
    |> Repo.get!(id)
  end

  defp create_user!() do
    %User{}
    |> User.changeset(%{earliest_token_time: DateTime.utc_now()})
    |> Repo.insert!
  end

  defp signup_new_user!(%{provider: provider, uid: uid}) do
    user = create_user!()
    create_auth!(%Auth{provider: provider, uid: uid, user_id: user.id}).user_id
  end

  defp create_auth!(auth) do
    auth
    |> Auth.changeset(%{})
    |> Repo.insert!
  end


  @doc """
  Increments the user's usage count by 1.
  """
  def log_user_usage!(%User{} = user) do
    user
    |> User.changeset(%{usage: user.usage + 1})
    |> Repo.update!
  end

  @doc """
  Resets a user's usage count
  """
  def reset_user_usage!(%User{} = user) do
    user
    |> User.changeset(%{usage: 0})
    |> Repo.update!
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end


end
