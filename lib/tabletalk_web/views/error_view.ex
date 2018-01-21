defmodule TabletalkWeb.ErrorView do
  use TabletalkWeb, :view

  require Logger


  def render("500.json", _err) do
    %{message: "Sorry, something broke on our end."}
  end

  def render("404.json", _err) do
    %{message: "The requested resource could not be found."}
  end

  def render("400.json", err) do
    %{message: "The request was incorrectly formatted"}
  end
end
