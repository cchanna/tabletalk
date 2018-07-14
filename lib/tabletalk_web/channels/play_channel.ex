defmodule TabletalkWeb.PlayChannel do
  use Phoenix.Channel

  alias Tabletalk.{
    Games,
    Monsterhearts,
    Swords,
    DreamAskew
  }

  require Logger

  def join("play:" <> slug, _params, socket = %Phoenix.Socket{assigns: %{user_id: user_id}}) do
    game = Games.get_game!(slug, user_id)
    {:ok, socket |> assign(:player_id, game.me) |> assign(:game_id, game.id) |> assign(:kind, game.kind)}
  end

  def join("play:" <> _private_room_id, _params, _else) do
    {:error, %{reason: "unauthorized"}}
  end

  def log_error(message) do
    Logger.error("Failed while dispatching. #{message}")
    nil
  end

  defp data_for(result, action) do
    case result do
      {:ok} -> action
      {:ok, data} -> action |> Map.merge(data)
      {:error, message} -> log_error(message)
    end
  end

  defp trim_regex(kind) do
    case kind do
      0 -> ~r/^monsterhearts_/
      1 -> ~r/^swords_/
      2 -> ~r/^dream_askew_/
      _ -> ~r//
    end
  end

  defp dispatch(kind, type, action, player_id, game_id) do
    case kind do
      0 -> Monsterhearts.Dispatcher.dispatch(type, action, player_id, game_id)
      1 -> Swords.Dispatcher.dispatch(type, action, player_id, game_id)
      2 -> DreamAskew.Dispatcher.dispatch(type, action, player_id, game_id)
      _ -> nil
    end
  end

  def handle_in("dispatch", event = %{"data" => %{"type" => type} = action}, socket = %{assigns: %{player_id: player_id, game_id: game_id, kind: kind}}) do
    trimmed_type = type |> String.downcase() |> String.replace(trim_regex(kind), "")
    data = dispatch(kind, trimmed_type, action, player_id, game_id)
    |> data_for(action)
    if data !== nil do
      chat = Games.create_chat!(%{
        "player_id" => player_id,
        "data" => data
      })
      broadcast! socket, "dispatch", event |> Map.merge(%{
        "playerId" => player_id,
        "data" => data,
        "insertedAt" => chat.inserted_at,
        "id" => chat.id
      })
    end

    {:noreply, socket}
  # rescue
  #   err -> 
  #     Logger.error("Dispatching failed!")
  #     Logger.error inspect err
  #     {:noreply, socket}
  end
end