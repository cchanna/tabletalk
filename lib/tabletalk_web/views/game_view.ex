defmodule TabletalkWeb.GameView do
  use TabletalkWeb, :view
  alias TabletalkWeb.GameView
  alias TabletalkWeb.PlayerView

  def render("index.json", %{games: games}) do
    render_many(games, GameView, "game.json")
  end

  def render("show.json", %{game: game}) do
    render_one(game, GameView, "game.json")
  end

  def render("game.json", %{game: game}) do
    %{id: game.id,
      name: game.name,
      kind: game.kind,
      players: render_many(game.players, PlayerView, "player.json"),
      me: game.me,
      maxPlayers: game.max_players}
  end
end
