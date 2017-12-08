defmodule Tabletalk.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {_type, reason}, _opts) do
    body = Poison.encode!(%{message: to_string(reason)})
    send_resp(conn, 401, body)
  end
end