defmodule TabletalkWeb.FallbackController do
  use TabletalkWeb, :controller

  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use TabletalkWeb, :controller
end
