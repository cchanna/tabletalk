defmodule Tabletalk.Swords.Dispatcher do
  require Logger
  import Tabletalk.Swords

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

  def dispatch("dice_roll", _args, player_id, game_id) do
    glum = :rand.uniform(6)
    jovial = :rand.uniform(6)
    game = get_game!(game_id)
    update_game!(game, %{
      "glum_die" => glum,
      "jovial_die" => jovial
    })
    player = get_player!(player_id)
    if player_id === game.overplayer_id do
      new_tone = if(glum === jovial, do: !player.tone, else: jovial > glum)
      set_overtone(game_id, new_tone)
    else
      if glum === jovial do
        overplayer = get_player!(game.overplayer_id)
        set_overtone(game_id, !overplayer.tone)
      else
        update_player!(player, %{
          "tone" => jovial > glum
        })
      end
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

  def dispatch("dice_set_down", _args, player_id, game_id) do
    get_game!(game_id)
    |> update_game!(%{
      "glum_die" => 0,
      "jovial_die" => 0
    })
    {:ok}
  end

  def dispatch("player_tone_flip", _args, player_id, _game_id) do
    player = get_player!(player_id)
    if player.tone !== nil do
      update_player!(player, %{
        "tone" => !player.tone
      })
      {:ok}
    else
      {:error, "Tried to flip a nil tone "} #TODO
    end
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
  
  def dispatch(bad_id, action, _player_id, _game_id) do
    Logger.error("Failed to dispatch action #{bad_id}")
    Logger.error inspect action
    # {:error, "no relevant action"}
    {:ok}
  end
end