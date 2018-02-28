defmodule Tabletalk.Monsterhearts.Dispatcher do
  alias Tabletalk.Monsterhearts
  alias Tabletalk.Monsterhearts.Character
  alias Tabletalk.Monsterhearts.Definitions

  require Logger
  import TabletalkWeb.MonsterheartsView 

  defp get_name(character = %Character{}) do
    if character.main_character !== nil && (character.name === nil || character.name === "") do
      "The " <> character.main_character.playbook
    else
      character.name
    end
  end 

  defp bonus_string(value) do
    if (value >= 0) do
      "+" <> to_string(value)
    else
      "−" <> to_string(-value)
    end
  end

  defp roll(bonus, player_id) do
    Monsterhearts.create_chat!(%{
      "player_id" => player_id,
      "roll" => %{
        "die1" => :rand.uniform(6),
        "die2" => :rand.uniform(6),
        "bonus" => bonus
      }
    })
  end

  defp talk(text, player_id) do
    Monsterhearts.create_chat!(%{
      "player_id" => player_id,
      "talk" => %{
        "text" => text
      }
    })
  end

  defp make_chat(text, player_id) do
    regex = ~r/^\s*\/(r|roll)\s*(?<symbol>\+|-|−)\s*(?<value>\d+)\s*$/ 
    case Regex.named_captures(regex, text) do
      %{"symbol" => "+", "value" => value} -> roll(String.to_integer(value), player_id)
      %{"symbol" => "-", "value" => value} -> roll(-String.to_integer(value), player_id)
      %{"symbol" => "−", "value" => value} -> roll(-String.to_integer(value), player_id)
      nil -> talk(text, player_id)
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
    {:ok, "Created a new #{playbook}.", to_json(character) }
  end

  def dispatch("character_name_set", %{"id" => id, "value" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    old_name = character.name
    Monsterhearts.update_character!(character, %{"name" => name})
    if old_name == nil do
      {:ok, "Named their #{character.main_character.playbook} \"#{name}\"."}
    else
      {:ok, "Changed #{old_name}'s name to #{name}."}
    end
  end

  def dispatch("character_look_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_main_character!(character.main_character, %{"look" => value})
    {:ok, "Changed #{get_name(character)}'s look to \"#{value}\"."}
  end

  def dispatch("character_eyes_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_main_character!(character.main_character, %{"eyes" => value})
    {:ok, "Changed #{get_name(character)}'s eyes to \"#{value}\"."}
  end

  def dispatch("character_origin_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_main_character!(character.main_character, %{"origin" => value})
    {:ok, "Changed #{get_name(character)}'s origin to \"#{value}\"."}
  end

  def dispatch("character_stats_set", args = %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main = Monsterhearts.update_main_character!(character.main_character, Map.take(args, ["hot", "cold", "volatile", "dark"]))
    name = get_name(character)
    if args |> Map.take(["hot", "cold", "volatile", "dark"]) |> Map.keys() |> Enum.count() > 2 do
      {:ok, "Changed #{name}'s stats to #{bonus_string(main.hot)}, #{bonus_string(main.cold)}, #{bonus_string(main.volatile)}, #{bonus_string(main.dark)}."}
    else
      case args do
        %{"hot" => hot} -> {:ok, "Set #{name}'s Hot to #{bonus_string(hot)}."}
        %{"cold" => cold} -> {:ok, "Set #{name}'s Cold to #{bonus_string(cold)}."}
        %{"volatile" => volatile} -> {:ok, "Set #{name}'s Volatile to #{bonus_string(volatile)}."}
        %{"dark" => dark} -> {:ok, "Set #{name}'s Dark to #{bonus_string(dark)}."}
      end
    end
  end

  def dispatch("character_move_create", %{"id" => id, "name" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.create_move!(%{"main_character_id" => character.main_character.id, "name" => name})
    {:ok, "Gave #{get_name(character)} the move \"#{name}\"."}
  end

  def dispatch("character_move_delete", %{"id" => id, "name" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    character.main_character.moves |> Enum.find(fn m -> m.name === name end)
    |> Monsterhearts.delete_move!()
    {:ok, "Removed #{get_name(character)}'s move \"#{name}\"."}
  end  

  def dispatch("character_move_edit_notes", %{"id" => id, "name" => name, "notes" => notes}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    character.main_character.moves |> Enum.find(fn m -> m.name === name end)
    |> Monsterhearts.update_move!(%{"notes" => notes})
    {:ok, "Updated the notes on #{get_name(character)}'s move \"#{name}\"."}
  end
  
  def dispatch("string_create", %{"from" => from, "to" => to}, _player_id, _game_id) do
    c_from = Monsterhearts.get_character!(from)
    c_to = Monsterhearts.get_character!(to)
    string = Monsterhearts.create_string!(%{
      "from_id" => from,
      "to_id" => to,
      "count" => 1
    })
    {:ok, "#{get_name(c_from)} took a string on #{get_name(c_to)}.", to_json(string)}
  end

  def dispatch("string_add", %{"id" => id}, _player_id, _game_id) do
    string = Monsterhearts.get_string!(id)
    Monsterhearts.update_string!(string, %{
      count: string.count + 1
    })
    c_from = Monsterhearts.get_character!(string.from_id)
    c_to = Monsterhearts.get_character!(string.to_id)
    {:ok, "#{get_name(c_from)} took a string on #{get_name(c_to)}."}
  end

  def dispatch("string_spend", %{"id" => id}, _player_id, _game_id) do
    string = Monsterhearts.get_string!(id)
    if (string.count > 0) do
      Monsterhearts.update_string!(string, %{
        count: string.count - 1
      })
      c_from = Monsterhearts.get_character!(string.from_id)
      c_to = Monsterhearts.get_character!(string.to_id)
      {:ok, "#{get_name(c_from)} spent a string on #{get_name(c_to)}."}
    else
      {:error, "You can't spend a string you don't have."}
    end
  end

  def dispatch("character_side_create", args = %{}, _player_id, game_id) do
    character = args
    |> Map.take(["name", "notes"])
    |> Map.merge(%{"game_id" => game_id})
    |> Monsterhearts.create_character!()
    {:ok, "Created a new side character, \"#{character.name}\".", to_json(character)}
  end

  def dispatch("character_side_edit", args = %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_character!(character, Map.take(args, ["name", "notes"]))
    if args["name"] !== nil and args["name"] !== character.name do
      {:ok, "Edited #{character.name} (now \"#{args["name"]}\")."}
    else
      {:ok, "Updated the notes for #{character.name}."}
    end
  end

  def dispatch("character_condition_create", %{"id" => id, "condition" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.create_condition!(%{"character_id" => id, "name" => name})
    {:ok, "#{get_name(character)} is \"#{name}\"."}
  end

  def dispatch("character_condition_delete", %{"id" => id, "condition" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    character.conditions 
    |> Enum.find(fn c -> c.name === name end)
    |> Monsterhearts.delete_condition!()
    {:ok, "#{get_name(character)} is no longer \"#{name}\"."}
  end

  def dispatch("character_harm_increment", %{"id" => id}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    if (main_character.harm < 4) do
      main_character
      |> Monsterhearts.update_main_character!(%{"harm" => character.main_character.harm + 1})
      {:ok, "#{get_name(character)} took a harm."}
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
      {:ok, "#{get_name(character)} recovered from a harm."}
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
      {:ok, "#{get_name(character)} marked xp."}
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
      {:ok, "#{get_name(character)} erased an xp."}
    else
      {:error, "Already at 0 xp!"}
    end
  end

  def dispatch("character_notes_set", %{"id" => id, "notes" => notes}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    Monsterhearts.update_character!(character, %{"notes" => notes})
    {:ok, "Updated the notes for #{get_name(character)}."}
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
        {:ok, "#{get_name(character)} advanced and increased their #{stat}."}
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
    {:ok, "#{get_name(character)} is growing up."}
  end

  def dispatch("character_advancement_create", %{"id" => id, "advancementId" => name, "move" => move}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    Monsterhearts.create_move!(%{"main_character_id" => main_character.id, "name" => move})
    Monsterhearts.create_advancement!(%{"main_character_id" => main_character.id, "name" => name})
    Monsterhearts.update_main_character!(main_character, %{"experience" => 0})
    {:ok, "#{get_name(character)} advanced and gained the move \"#{move}\""}
  end

  def dispatch("character_advancement_create", %{"id" => id, "advancementId" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    Monsterhearts.create_advancement!(%{"main_character_id" => main_character.id, "name" => name})
    Monsterhearts.update_main_character!(main_character, %{"experience" => 0})
    case name do
      "rtire" -> 
        Monsterhearts.update_main_character!(main_character, %{"is_retired" => true})
        {:ok, "#{get_name(character)} retired."}
      "rrds" -> 
        Monsterhearts.update_main_character!(main_character, %{"darkest_self" => Definitions.playbooks_by_name()[main_character.playbook].darkestSelf})
        {:ok, "#{get_name(character)} is changing their darkest self."}
      _ ->
        text = Definitions.advancements_by_id[name].text |> String.replace("{playbook}", main_character.playbook)
        {:ok, "#{get_name(character)} advanced and chose \"#{text}\"."}
    end
  end

  def dispatch("character_advancement_delete", %{"id" => id, "advancementId" => name}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character 
    main_character.advancements 
    |> Enum.find(fn c -> c.name === name end)
    |> Monsterhearts.delete_advancement!()
    if name === "rtire" do
      Monsterhearts.update_main_character!(main_character, %{"is_retired" => false})
      {:ok, "#{get_name(character)} un-retired."}
    else
      text = Definitions.advancements_by_id[name].text |> String.replace("{playbook}", main_character.playbook)
      {:ok, "#{get_name(character)} unselected their advancement \"#{text}\"."}
    end
  end

  def dispatch("character_darkest_self_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    character = Monsterhearts.get_character!(id)
    main_character = character.main_character
    if Enum.any?(main_character.advancements, fn(a) -> a.name === "rrds" end) do
      main_character
      |> Monsterhearts.update_main_character!(%{
        "darkest_self" => value
      })
      {:ok, "#{get_name(character)} edited their darkest self"}
    else
      {:error, "You need the 'rewrite your darkest self' season advancement to do that."}
    end
  end

  def dispatch("chat", %{"text" => text}, player_id, _game_id) do
    {:ok, nil, make_chat(text, player_id) |> to_json()}
  end
  
  
  def dispatch(bad_id, action, _player_id, _game_id) do
    Logger.error("Failed to dispatch action #{bad_id}")
    Logger.error inspect action
    {:error, "no relevant action"}
  end
end