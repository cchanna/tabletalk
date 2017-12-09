defmodule Tabletalk.Google.API do
  # use Tesla

  # plug Tesla.Middleware.BaseUrl, "https://www.googleapis.com"
  # plug Tesla.Middleware.JSON

  import HTTPotion

  def certs do
    resp = get "https://www.googleapis.com/oauth2/v1/certs", headers: [Accept: "application/json"]
    Poison.decode! resp.body
  end
end