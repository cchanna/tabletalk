defmodule Tabletalk.Status do

  def get do
    if File.exists? "TAKEDOWN" do
      case File.read "TAKEDOWN" do
        {:ok, binary} -> {:down, binary}
        _else -> {:down, "Tabletalk is experiencing an issue right now. Sorry!"}
      end
    else
      {:up, "All good."}
    end
  end

  def down?, do: File.exists? "TAKEDOWN"
end