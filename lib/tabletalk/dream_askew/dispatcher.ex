defmodule Tabletalk.DreamAskew.Dispatcher do
  require Logger
  import Tabletalk.DreamAskew
  import Tabletalk.DreamAskew.View

  def set_character(property, id, value, player_id) do
    character = get_character!(id)
    player = get_player_ext!(player_id)
    if player.character_id != id do 
      {:error, "That character isn't yours!"}
    else
      update_character!(character, %{
        property => value
      })
    end  
    {:ok}
  end

  def set_character_array(property, id, value, player_id) do
    character = get_character!(id)
    player = get_player_ext!(player_id)
    if player.character_id != id do 
      {:error, "That character isn't yours!"}
    else
      case value do
        [first, second] -> 
          update_character!(character, %{
            property <> "_1" => first,
            property <> "_2" => second,
          })
        [only] -> 
          update_character!(character, %{
            property <> "_1" => only,
            property <> "_2" => nil,
          })
        [] -> 
          update_character!(character, %{
            property <> "_1" => nil,
            property <> "_2" => nil,
          })
      end
    end  
    {:ok}
  end

  def dispatch("chat", %{"text" => text}, _player_id, _game_id) do
    {:ok, %{text: text}}
  end

  def dispatch("character_create", %{"role" => role}, player_id, game_id) do
    character = create_character!(%{
      "game_id" => game_id,
      "role" => role
    })
    get_player_ext!(player_id)
    |> update_player!(%{"character_id" => character.id})
    {:ok, %{character: character |> to_json}}
  end

  def dispatch("character_name_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("name", id, value, player_id)
  end

  def dispatch("character_look_1_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("look_1", id, value, player_id)
  end

  def dispatch("character_look_2_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("look_2", id, value, player_id)
  end

  def dispatch("character_gender_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("gender", id, value, player_id)
  end

  def dispatch("character_pronouns_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("pronouns", id, value, player_id)
  end

  def dispatch("character_styles_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character_array("style", id, value, player_id)
  end

  def dispatch("character_choices_1_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("choices_1", id, value, player_id)
  end

  def dispatch("character_choices_2_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("choices_2", id, value, player_id)
  end

  def dispatch("character_key_relationships_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character_array("key_relationship", id, value, player_id)
  end

  def dispatch("character_notes_set", %{"id" => id, "value" => value}, player_id, _game_id) do
    set_character("notes", id, value, player_id)
  end

  def dispatch("player_token_gain", _args, player_id, _game_id) do
    player = get_player_ext!(player_id)
    update_player!(player, %{
      "tokens" => player.tokens + 1
    })
    {:ok}
  end

  def dispatch("player_token_spend", _args, player_id, _game_id) do
    player = get_player_ext!(player_id)
    if player.tokens > 0 do
      update_player!(player, %{
        "tokens" => player.tokens - 1
      })
    end
    {:ok}
  end

  def dispatch("setting_create", %{"name" => name}, player_id, game_id) do
    setting = create_setting!(%{
      "name" => name,
      "player_id" => player_id,
      "game_id" => game_id
    })
    {:ok, %{setting: setting |> to_json}}
  end

  def dispatch("setting_pick_up", %{"name" => name}, player_id, game_id) do
    setting = get_setting!(name, game_id)
    if setting.player_id == nil do
      update_setting!(setting, %{"player_id" => player_id})
      {:ok}
    else
      {:error, "Someone else has already picked up that setting!"}
    end
  end

  def dispatch("setting_give_away", %{"name" => name}, player_id, game_id) do
    setting = get_setting!(name, game_id)
    if setting.player_id == player_id do
      update_setting!(setting, %{"player_id" => nil})
      {:ok}
    else
      {:error, "That setting isn't yours to give away!"}
    end
  end

  def dispatch("setting_desires_set", %{"name" => name, "value" => value}, player_id, game_id) do
    setting = get_setting!(name, game_id)
    if setting.player_id == player_id do
      properties = case value do
        [first, second] -> %{"desire_1" => first, "desire_2" => second}
        [first] -> %{"desire_1" => first, "desire_2" => nil}
        [] -> %{"desire_1" => nil, "desire_2" => nil}
      end
      update_setting!(setting, properties)
      {:ok}
    else
      {:error, "You aren't holding that setting!"}
    end
  end

  def dispatch("setting_notes_set", %{"name" => name, "value" => value}, player_id, game_id) do
    setting = get_setting!(name, game_id)
    if setting.player_id == player_id do
      update_setting!(setting, %{"notes" => value})
      {:ok}
    else
      {:error, "You aren't holding that setting!"}
    end
  end

  def dispatch("enclave_visuals_set", %{"value" => value}, _player_id, game_id) do
    all_visuals = Tabletalk.DreamAskew.Definitions.visuals
    cond do
      Enum.find(value, fn x -> Enum.find(all_visuals, fn y -> x == y end) == nil end) ->
        {:error, "Contains invalid visuals"}
      Enum.count(value) > 5 -> {:error, "Can't have more than 5 visuals"}
      true -> 
        get_game!(game_id) |> update_game!(%{"visuals" => value})
        {:ok}
    end
  end

  def dispatch("enclave_conflicts_set", %{"value" => value}, _player_id, game_id) do
    all_conflicts = Tabletalk.DreamAskew.Definitions.conflicts
    cond do
      Enum.find(value, fn x -> Enum.find(all_conflicts, fn y -> x == y end) == nil end) ->
        {:error, "Contains invalid conflicts"}
      Enum.count(value) > 3 -> {:error, "Can't have more than 3 conflicts"}
      true -> 
        get_game!(game_id) |> update_game!(%{"conflicts" => value})
        {:ok}
    end
  end

  def dispatch("minor_character_create", %{"name" => name, "notes" => notes}, _player_id, game_id) do
    if name == nil or name == "" do
      {:error, "Minor characters have to have a name"}
    else
      mc = create_minor_character!(%{
        "game_id" => game_id,
        "name" => name,
        "notes" => notes
      })  
      {:ok, %{minorCharacter: mc |> to_json}}
    end
  end 

  def dispatch("minor_character_name_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    if value == nil or value == "" do
      {:error, "Minor characters have to have a name"}
    else
      get_minor_character!(id)
      |> update_minor_character!(%{
        "name" => value
      })
      {:ok}
    end
  end

  def dispatch("minor_character_notes_set", %{"id" => id, "value" => value}, _player_id, _game_id) do
    get_minor_character!(id)
    |> update_minor_character!(%{
      "notes" => value
    })
    {:ok}
  end

  def dispatch(bad_id, action, _player_id, _game_id) do
    Logger.error("Failed to dispatch action #{bad_id}")
    Logger.error inspect action
    # {:error, "no relevant action"}
    {:ok}
  end
end