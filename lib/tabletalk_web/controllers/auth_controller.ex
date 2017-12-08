defmodule TabletalkWeb.AuthController do
  use TabletalkWeb, :controller
  alias Tabletalk.Accounts

  def login(conn, %{"provider" => "google", "jwt" => google_jwt}) do
    case Accounts.login(:google, google_jwt) do
      {:ok, %{jwt: jwt}} -> conn 
        |> json(%{jwt: jwt})
      {:error, err} -> conn
        |> put_status(401)
        |> json(err)
    end 
  end
end