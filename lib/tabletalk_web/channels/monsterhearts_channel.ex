defmodule TabletalkWeb.MonsterheartsChannel do
  use Phoenix.Channel

  alias Tabletalk.Games
  alias Tabletalk.Monsterhearts
  alias Tabletalk.Monsterhearts.Dispatcher

  import TabletalkWeb.MonsterheartsView 

  require Logger

  def join("monsterhearts:" <> slug, _params, socket = %Phoenix.Socket{assigns: %{user_id: user_id}}) do
    game = Games.get_game!(slug, user_id)
    if game.kind === 0 do
      {:ok, socket |> assign(:player_id, game.me) |> assign(:game_id, game.id)}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("monsterhearts:" <> _private_room_id, _params, _else) do
    {:error, %{reason: "unauthorized"}}
  end

  defp log(player_id, text) do
    Monsterhearts.create_chat!(%{
      "player_id" => player_id,
      "talk" => %{
        "text" => text,
        "is_log" => true
      }
    })
    |> to_json
  end

  defp data_for(result, action, player_id) do
    case result do
      {:ok} -> action
      {:ok, message} -> action |> Map.put(:log, log(player_id, message))
      {:ok, nil, data} -> action |> Map.take(["type", "uniqueId"]) |> Map.merge(data)
      {:ok, message, data} -> action |> Map.take(["type", "uniqueId"]) |> Map.merge(data) |> Map.put(:log, log(player_id, message))
      _else -> nil
    end
  end

  def handle_in("dispatch", action = %{"type" => type}, socket = %{assigns: %{player_id: player_id, game_id: game_id}}) do
    data = Dispatcher.dispatch(type |> String.downcase() |> String.replace(~r/^monsterhearts_/, ""), action, player_id, game_id)
    |> data_for(action, player_id)
    if data !== nil do
      broadcast! socket, "dispatch", data
    end
    {:noreply, socket}
  # rescue
  #   err -> 
  #     Logger.error("Dispatching failed!")
  #     Logger.error inspect err
  #     {:noreply, socket}
  end
end