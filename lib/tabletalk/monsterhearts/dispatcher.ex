defmodule Tabletalk.Monsterhearts.Dispatcher do
  alias Tabletalk.Monsterhearts
  alias Tabletalk.Monsterhearts.Definitions

  require Logger
  import Tabletalk.Monsterhearts.View 

  defp roll(bonus) do
    %{
      "die1" => :rand.uniform(6),
      "die2" => :rand.uniform(6),
      "bonus" => bonus
    }
  end

  defp talk(text) do
    %{
      "text" => text
    }
  end

  defp make_chat(text) do
    regex = ~r/^\s*\/(r|roll)\s*(?<symbol>\+|-|−)\s*(?<value>\d+)\s*$/ 
    case Regex.named_captures(regex, text) do
      %{"symbol" => "+", "value" => value} -> roll(String.to_integer(value))
      %{"symbol" => "-", "value" => value} -> roll(-String.to_integer(value))
      %{"symbol" => "−", "value" => value} -> roll(-String.to_integer(value))
      nil -> talk(text)
    end
  end


  def dispatch("character_main_create", %{"playbook" => playbook}, player_id, game_id) do
    %{^playbook => %{startingMoves: moves}} = Definitions.playbooks_by_name()
    character = Monsterhearts.create_character!(%{
      "game_id" => game_id,
      "main_character" => %{
        "playbook" => playbook,
        "player_id" => player_id,
        "moves" => moves |> Enum.map(fn name -> %{"name" => name} end)
      } 
    })
    {:ok, to_json(character) }
  end

  def dispatch("character_name_set", %{"id" => id, "value" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_character!(character, %{"name" => name})
    {:ok}
  end

  def dispatch("character_look_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_main_character!(character.main_character, %{"look" => value})
    {:ok}
  end

  def dispatch("character_eyes_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_main_character!(character.main_character, %{"eyes" => value})
    {:ok}
  end

  def dispatch("character_origin_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_main_character!(character.main_character, %{"origin" => value})
    {:ok}
  end

  def dispatch("character_stats_set", args = %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_main_character!(character.main_character, Map.take(args, ["hot", "cold", "volatile", "dark"]))
    {:ok}
  end

  def dispatch("character_move_create", %{"id" => id, "name" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.create_move!(%{"main_character_id" => character.main_character.id, "name" => name})
    {:ok}
  end

  def dispatch("character_move_delete", %{"id" => id, "name" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    character.main_character.moves |> Enum.find(fn m -> m.name === name end)
    |> Monsterhearts.delete_move!()
    {:ok}
  end  

  def dispatch("character_move_edit_notes", %{"id" => id, "name" => name, "notes" => notes}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    character.main_character.moves |> Enum.find(fn m -> m.name === name end)
    |> Monsterhearts.update_move!(%{"notes" => notes})
    {:ok}
  end
  
  def dispatch("string_create", %{"from" => from, "to" => to}, _player_id, _game_id) do
    string = Monsterhearts.create_string!(%{
      "from_id" => from,
      "to_id" => to,
      "count" => 1
    })
    {:ok, to_json(string)}
  end

  def dispatch("string_add", %{"id" => id}, _player_id, _game_id) do
    string = Monsterhearts.get_string!(id)
    Monsterhearts.update_string!(string, %{
      count: string.count + 1
    })
    {:ok}
  end

  def dispatch("string_spend", %{"id" => id}, _player_id, _game_id) do
    string = Monsterhearts.get_string!(id)
    if (string.count > 0) do
      Monsterhearts.update_string!(string, %{
        count: string.count - 1
      })
      {:ok}
    else
      {:error, "You can't spend a string you don't have."}
    end
  end

  def dispatch("character_side_create", args = %{}, _player_id, game_id) do
    character = args
    |> Map.take(["name", "notes"])
    |> Map.merge(%{"game_id" => game_id})
    |> Monsterhearts.create_character!()
    {:ok, to_json(character)}
  end

  def dispatch("character_side_edit", args = %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_character!(character, Map.take(args, ["name", "notes"]))
    {:ok}
  end

  def dispatch("character_condition_create", %{"id" => id, "condition" => name}, _player_id, _game_id) do
    Monsterhearts.create_condition!(%{"character_id" => id, "name" => name})
    {:ok}
  end

  def dispatch("character_condition_delete", %{"id" => id, "condition" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    character.conditions 
    |> Enum.find(fn c -> c.name === name end)
    |> Monsterhearts.delete_condition!()
    {:ok}
  end

  def dispatch("character_harm_increment", %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    if (main_character.harm < 4) do
      main_character
      |> Monsterhearts.update_main_character!(%{"harm" => character.main_character.harm + 1})
      {:ok}
    else
      {:error, "Already at max harm!"}
    end
  end

  def dispatch("character_harm_decrement", %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    if (main_character.harm > 0) do
      main_character
      |> Monsterhearts.update_main_character!(%{"harm" => character.main_character.harm - 1})
      {:ok}
    else
      {:error, "Already at 0 harm!"}
    end
  end

  def dispatch("character_xp_increment", %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    if (main_character.experience < 5) do
      main_character
      |> Monsterhearts.update_main_character!(%{"experience" => character.main_character.experience + 1})
      {:ok}
    else
      {:error, "Already at max xp!"}
    end
  end

  def dispatch("character_xp_decrement", %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    if (main_character.experience > 0) do
      main_character
      |> Monsterhearts.update_main_character!(%{"experience" => character.main_character.experience - 1})
      {:ok}
    else
      {:error, "Already at 0 xp!"}
    end
  end

  def dispatch("character_notes_set", %{"id" => id, "notes" => notes}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_character!(character, %{"notes" => notes})
    {:ok}
  end

  def dispatch("character_advancement_create", %{"id" => id, "advancementId" => "+stat", "stat" => stat}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    value = case stat do
      "hot" -> main_character.hot
      "cold" -> main_character.cold
      "volatile" -> main_character.volatile
      "dark" -> main_character.dark
      _ -> nil
    end
    if value !== nil do
      new_value = value + 1
      if new_value <= 3 do
        Monsterhearts.create_advancement!(%{"main_character_id" => main_character.id, "name" => "+stat"})
        Monsterhearts.update_main_character!(main_character, %{
          "experience" => 0, 
          stat => new_value
        })
        {:ok}
      else
        {:error, "That stat is already at the max"}
      end
    else
      {:error, "That isn't a valid stat"}
    end
  end

  def dispatch("character_advancement_create", %{"id" => id, "advancementId" => "grow", "moves" => moves}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    Enum.each(moves, fn(m) -> 
      Monsterhearts.create_move!(%{"main_character_id" => main_character.id, "name" => m}) 
    end)
    Monsterhearts.create_advancement!(%{"main_character_id" => main_character.id, "name" => "grow"})
    Monsterhearts.update_main_character!(main_character, %{"experience" => 0})
    {:ok}
  end

  def dispatch("character_advancement_create", %{"id" => id, "advancementId" => name, "move" => move}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    Monsterhearts.create_move!(%{"main_character_id" => main_character.id, "name" => move})
    Monsterhearts.create_advancement!(%{"main_character_id" => main_character.id, "name" => name})
    Monsterhearts.update_main_character!(main_character, %{"experience" => 0})
    {:ok}
  end

  def dispatch("character_advancement_create", %{"id" => id, "advancementId" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    Monsterhearts.create_advancement!(%{"main_character_id" => main_character.id, "name" => name})
    Monsterhearts.update_main_character!(main_character, %{"experience" => 0})
    case name do
      "rtire" -> 
        Monsterhearts.update_main_character!(main_character, %{"is_retired" => true})
      "rrds" -> 
        Monsterhearts.update_main_character!(main_character, %{"darkest_self" => Definitions.playbooks_by_name()[main_character.playbook].darkestSelf})
    end
    {:ok}
  end

  def dispatch("character_advancement_delete", %{"id" => id, "advancementId" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character 
    main_character.advancements 
    |> Enum.find(fn c -> c.name === name end)
    |> Monsterhearts.delete_advancement!()
    if name === "rtire" do
      Monsterhearts.update_main_character!(main_character, %{"is_retired" => false})
    end
    {:ok}
  end

  def dispatch("character_darkest_self_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    if Enum.any?(main_character.advancements, fn(a) -> a.name === "rrds" end) do
      main_character
      |> Monsterhearts.update_main_character!(%{
        "darkest_self" => value
      })
      {:ok}
    else
      {:error, "You need the 'rewrite your darkest self' season advancement to do that."}
    end
  end

  def dispatch("custom_move_edit", %{"name" => name, "text" => text, "notes" => notes}, _player_id, game_id) do
    move = Monsterhearts.get_custom_move("name", game_id)
    if move != nil do
      Monsterhearts.update_custom_move!(move, %{
        "text" => text,
        "notes" => notes
      })
    else
      Monsterhearts.create_custom_move!(%{
        "name" => name,
        "text" => text,
        "notes" => notes
      })
    end
    {:ok}
  end

  def dispatch("custom_move_delete", %{"name" => name}, _player_id, game_id) do
    move = Monsterhearts.get_custom_move("name", game_id)
    if move != nil do
      Monsterhearts.delete_custom_move!(move)
      {:ok}
    else
      {:error, "That custom move doesn't exist."}
    end
  end

  def dispatch("chat", %{"text" => text}, _player_id, _game_id) do
    {:ok, make_chat(text)}
  end
  
  
  def dispatch(bad_id, action, _player_id, _game_id) do
    Logger.error("Failed to dispatch action #{bad_id}")
    Logger.error inspect action
    {:error, "no relevant action"}
  end
end