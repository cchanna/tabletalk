defmodule TabletalkWeb.ErrorView do
  use TabletalkWeb, :view

  def render("500.json", error) do
    %{message: error}
  end
end
