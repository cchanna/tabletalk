defmodule Tabletalk.Swords.Dispatcher do
  require Logger
  import Tabletalk.Swords
  import Tabletalk.Swords.View

  def update_color(tone, colors, text_is_dark, game_id) do
    get_game!(game_id)
    |> update_game!(%{
      tone <> "_colors" => colors,
      tone <> "_text_is_dark" => text_is_dark
    })
    {:ok}
  end

  def tone_for_roll(glum, jovial, overtone) do
    if (glum === jovial) do
      !overtone
    else
      jovial > glum
    end
  end 

  defp update_character_value(key, %{"id" => id, "value" => value}) do
    get_character!(id)
    |> update_character!(%{
      key => value
    })
    {:ok}
  end

  def dispatch("dice_roll", _args, player_id, game_id) do
    glum = :rand.uniform(6)
    jovial = :rand.uniform(6)
    game = get_game!(game_id)
    dice_tone = if glum == jovial, do: nil, else: jovial > glum
    update_game!(game, %{
      "glum_die" => glum,
      "jovial_die" => jovial,
      "dice_tone" => dice_tone
    })
    player = get_player!(player_id)
    if player_id === game.overplayer_id or glum === jovial do
      overtone = if dice_tone == nil, do: !game.overtone, else: dice_tone
      update_game!(game, %{"overtone" => overtone})
    end
    {:ok, %{
      glum: glum,
      jovial: jovial
    }}
  end

  def dispatch("dice_pick_up", _args, _player_id, game_id) do
    get_game!(game_id)
    |> update_game!(%{
      "glum_die" => nil,
      "jovial_die" => nil
    })
    {:ok}
  end

  def dispatch("dice_give", %{"id" => id}, player_id, game_id) do
    game = get_game!(game_id)
    if game.dice_holder_id === player_id do
      update_game!(game, %{
        "dice_holder_id" => id
      })
      {:ok}
    else
      {:error, "You can't give dice that you don't have"}
    end
  end

  def dispatch("dice_take", _args, player_id, game_id) do
    get_game!(game_id)
    |> update_game!(%{
      "dice_holder_id" => player_id
    })
    {:ok}
  end

  def dispatch("dice_set_down", _args, _player_id, game_id) do
    get_game!(game_id)
    |> update_game!(%{
      "glum_die" => 0,
      "jovial_die" => 0
    })
    {:ok}
  end

  def dispatch("overtone_flip", _args, _player_id, game_id) do
    game = get_game!(game_id)
    update_game!(game, %{
      "overtone" => !game.overtone,
      "dice_tone" => nil
    })
    {:ok}
  end

  def dispatch("chat", %{"text" => text}, _player_id, _game_id) do
    {:ok, %{text: text}}
  end

  def dispatch("color_jovial_suggest", %{"color" => colors, "textIsDark" => text_is_dark}, _player_id, game_id) do
    update_color("jovial", colors, text_is_dark, game_id)
  end

  def dispatch("color_glum_suggest", %{"color" => colors, "textIsDark" => text_is_dark}, _player_id, game_id) do
    update_color("glum", colors, text_is_dark, game_id)
  end

  def dispatch("character_eidolon_set", %{"id" => id, "eidolon" => eidolon, "eidolonIsImage" => eidolon_is_image}, _player_id, _game_id) do
    get_character!(id)
    |> update_character!(%{
      "eidolon" => eidolon,
      "eidolon_is_image" => eidolon_is_image
    })
    {:ok}
  end

  def dispatch("character_name_set", %{"id" => id, "name" => name}, _player_id, _game_id) do
    get_character!(id)
    |> update_character!(%{
      "name" => name
    })
    {:ok}
  end

  def dispatch("character_named_add", %{"id" => id, "name" => name}, _player_id, _game_id) do
    character = get_character!(id)
    update_character!(character, %{
      "all_that_matters" => character.all_that_matters ++ [name]
    })
    {:ok}
  end

  def dispatch("character_named_update", %{"id" => id, "index" => index, "name" => name}, _player_id, _game_id) do
    character = get_character!(id)
    update_character!(character, %{
      "all_that_matters" => character.all_that_matters |> List.replace_at(index, name)
    })
    {:ok}
  end

  def dispatch("character_named_remove", %{"id" => id, "index" => index}, _player_id, _game_id) do
    character = get_character!(id)
    update_character!(character, %{
      "all_that_matters" => character.all_that_matters |> List.delete_at(index)
    })
    {:ok}
  end


  def dispatch("character_feat_jovial_set", args, _player_id, _game_id) do
    update_character_value("jovial_feat", args)
  end

  def dispatch("character_feat_jovial_used_set", args, _player_id, _game_id) do
    update_character_value("jovial_feat_used", args)
  end

  def dispatch("character_feat_glum_set", args, _player_id, _game_id) do
    update_character_value("glum_feat", args)
  end

  def dispatch("character_feat_glum_used_set", args, _player_id, _game_id) do
    update_character_value("glum_feat_used", args)
  end

  def dispatch("character_trick_set", args, _player_id, _game_id) do
    update_character_value("trick", args)
  end

  def dispatch("character_trick_used_set", args, _player_id, _game_id) do
    update_character_value("trick_used", args)
  end

  def dispatch("character_notes_set", args, _player_id, _game_id) do
    update_character_value("notes", args)
  end

  def dispatch("thread_create", %{"text" => text}, _player_id, game_id) do
    thread = create_thread!(%{
      "game_id" => game_id,
      "text" => text
    })
    {:ok, %{thread: thread |> to_json}}
  end

  def dispatch("thread_update", %{"id" => id, "text" => text}, _player_id, _game_id) do
    get_thread!(id)
    |> update_thread!(%{
      "text" => text
    })
    {:ok}
  end

  def dispatch("thread_delete", %{"id" => id}, _player_id, _game_id) do
    get_thread!(id)
    |> delete_thread!()
    {:ok}
  end

  def dispatch("motif_edit", %{"index" => index, "item" => item, "value" => value}, _player_id, game_id) do
    game = get_game!(game_id)
    case index do
      0 -> game.motif1_id
      1 -> game.motif2_id
      2 -> game.motif3_id
    end
    |> get_motif!()
    |> update_motif!(%{
      "item" <> Integer.to_string(item + 1) => value
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