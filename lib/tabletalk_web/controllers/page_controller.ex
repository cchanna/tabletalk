defmodule TabletalkWeb.PageController do
  use TabletalkWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> put_view(TabletalkWeb.PageView)
    |> render("index.html")
  end
end
