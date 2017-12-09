defmodule TabletalkWeb.ErrorView do
  use TabletalkWeb, :view

  def render("500.json", error) do
    %{message: "Sorry, something broke on our end."}
  end

  def render("404.json", _err) do
    %{message: "The requested resource could not be found."}
  end
end
