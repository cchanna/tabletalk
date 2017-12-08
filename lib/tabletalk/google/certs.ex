defmodule Tabletalk.Google.Certs do
  alias Tabletalk.Google.API
  use Agent

  def start_link do
    Agent.start_link(fn -> nil end, name: __MODULE__)
  end

  defp get_from_server do
    result = API.certs.body |> Enum.map(&(&1))
    :ok = Agent.update(__MODULE__, fn _state -> result end)
    result
  end

  def get do
    case Agent.get(__MODULE__, &(&1)) do
      nil -> get_from_server()
      result -> result
    end
  end
end