defmodule Tabletalk.Google.Certs do
  alias Tabletalk.Google.API
  use Agent

  require Logger

  def start_link do
    Agent.start_link(fn -> nil end, name: __MODULE__)
  end

  defp get_from_server do
    result = API.certs |> Enum.map(&(&1))
    :ok = Agent.update(__MODULE__, fn _state -> {result, get_now() + 15} end)
    result
  end

  defp get_now, do: DateTime.to_unix(DateTime.utc_now)

  def get do
    now = get_now()
    case Agent.get(__MODULE__, &(&1)) do
      nil -> get_from_server()
      {_result, time} when time < now -> get_from_server()
      {result, _time} -> result
    end
  end
end