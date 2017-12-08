defmodule Tabletalk.Google.API do
  use Tesla

  plug Tesla.Middleware.BaseUrl, "https://www.googleapis.com"
  plug Tesla.Middleware.JSON

  def certs do
    get("/oauth2/v1/certs")
  end
end