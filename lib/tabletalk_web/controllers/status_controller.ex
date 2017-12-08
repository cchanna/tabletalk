defmodule TabletalkWeb.StatusController do
  use TabletalkWeb, :controller

  alias Tabletalk.Status

  action_fallback TabletalkWeb.FallbackController

  def get(conn, _params) do
    case Status.get do
      {:up, info} -> json(conn, %{info: info})
      {:down, reason} -> conn |> put_status(503) |> json(%{reason: reason})
    end
  end

end
