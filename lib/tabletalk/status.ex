defmodule Tabletalk.Status do

  def path, do: Application.app_dir(:tabletalk) |> Path.join("../../TAKEDOWN")

  require Logger

  def get do
    Logger.debug path()
    if File.exists? path() do
      case File.read path() do
        {:ok, binary} -> {:down, binary}
        _else -> {:down, "Tabletalk is experiencing an issue right now. Sorry!"}
      end
    else
      {:up, "All good."}
    end
  end

  def down?, do: File.exists? path()
end