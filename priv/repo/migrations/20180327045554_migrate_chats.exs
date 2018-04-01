defmodule Tabletalk.Repo.Migrations.MigrateChats do
  use Ecto.Migration

  alias Tabletalk.Repo
  alias Tabletalk.Monsterhearts
  alias Tabletalk.Games

  defp convert(%Monsterhearts.Chat{} = chat) do
    if (chat.talk) do
      Games.create_chat!(%{
        "player_id" => chat.player_id,
        "data" => %{
          "text" => chat.talk.text,
          "isLog" => chat.talk.is_log
        }
      })
    else 
      Games.create_chat!(%{
        "player_id" => chat.player_id,
        "data" => %{
          "die1" => chat.roll.die1,
          "die2" => chat.roll.die2,
          "bonus" => chat.roll.bonus
        }
      })
    end
  end

  def up do
    Repo.all(Monsterhearts.Chat)
    |> Repo.preload(:talk)
    |> Repo.preload(:roll)
    |> Enum.each(&convert/1)
  end

  def down do

  end
end
