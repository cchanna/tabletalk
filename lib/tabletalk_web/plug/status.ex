defmodule TabletalkWeb.Plug.Status do
  def init(default), do: default 

  def call(conn, _opts) do
    if Tabletalk.Status.down? do
      conn
      |> Plug.Conn.put_status(503)
      |> Phoenix.Controller.json("The server is down. Call '/status' for more information.")
      |> Plug.Conn.halt()
    else
      conn
    end
  end
end