defmodule TabletalkWeb.FallbackController do
  use TabletalkWeb, :controller

  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """

  require Logger

  use TabletalkWeb, :controller

  defp add_property_error(acc, property, message) do
    case acc[property] do
      nil -> %{acc | property => [message]}
      array -> %{acc | property => [message | array]}
    end
  end

  defp map_error_to_properties(err, acc) do
    case err do
      {property, {message, _rules}} -> add_property_error(acc, property, message)
      {property, _else} -> add_property_error(acc, property, "Property is invalid")
      _else -> acc
    end
  end

  def format_errors(errors) do
    Enum.reduce(errors, %{}, &map_error_to_properties/2)
  end

  def call(conn, {:error, %Ecto.Changeset{changes: %{game: %Ecto.Changeset{errors: errors}}}}) do
    Logger.error(inspect errors)
    conn
    |> put_status(400)
    |> json(%{errors: errors})
  end

  def call(conn, error) do
    Logger.error(inspect error)
    conn
    |> put_status(500)
    |> json(%{message: "Something went wrong on our end, sorry!"})
  end
end
