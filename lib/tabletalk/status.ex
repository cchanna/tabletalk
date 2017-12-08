defmodule Tabletalk.Status do
  use Agent

  def start_link do
    Agent.start_link(fn -> {:up, "All good."} end, name: __MODULE__)
  end

  def get, do: Agent.get(__MODULE__, &(&1))
  def turn_on(message), do: Agent.update(__MODULE__, fn _state -> {:up, message} end)
  def turn_off(reason), do: Agent.update(__MODULE__, fn _state -> {:down, reason} end)
end