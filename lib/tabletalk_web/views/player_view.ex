defmodule TabletalkWeb.PlayerView do
  use TabletalkWeb, :view
  alias TabletalkWeb.PlayerView

  def render("index.json", %{players: players}) do
    %{data: render_many(players, PlayerView, "player.json")}
  end

  def render("show.json", %{player: player}) do
    render_one(player, PlayerView, "player.json")
  end

  def render("player.json", %{player: %{id: id, name: name, admin: admin}}) do
    %{id: id,
      name: name,
      admin: admin}
  end
end
