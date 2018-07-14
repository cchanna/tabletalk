defmodule Tabletalk.Swords do
  import Ecto.Query, warn: false
  alias Tabletalk.Swords

  require Logger

  alias Tabletalk.Games
  alias Swords.{
    Player, Game, Character,
    Thread, Motif, Reincorporation
  }
  alias Tabletalk.Repo

  import Swords.View

  defp get_preloaded_game!(game_id) do
    query = from g in Game,
      join: gg in Games.Game, on: gg.id == g.game_id,
      join: gp in Games.Player, on: gg.id == gp.game_id,
      left_join: p in Player, on: gp.id == p.player_id,
      left_join: c in Character, on: gp.id == c.player_id,
      left_join: t in Thread, on: gg.id == t.game_id,
      left_join: m1 in Motif, on: g.motif1_id == m1.id,
      left_join: m2 in Motif, on: g.motif2_id == m2.id,
      left_join: m3 in Motif, on: g.motif3_id == m3.id,
      where: gg.id == ^game_id,
      preload: [
        players: {p, player: gp}, 
        characters: c,
        threads: t,
        motif1: m1,
        motif2: m2,
        motif3: m3
      ]
    Repo.one(query)
  end

  def load(game_id, player_id) do
    events = Games.list_chats!(game_id)
    game = get_preloaded_game!(game_id)

    %{
      diceHolder: game.dice_holder_id,
      overplayer: game.overplayer_id,
      glumColors: game.glum_colors,
      isGlumTextDark: game.glum_text_is_dark,
      jovialColors: game.jovial_colors,
      isJovialTextDark: game.jovial_text_is_dark,
      overtone: game.overtone,
      dice: if(game.glum_die === nil, do: nil, else: %{
        glum: game.glum_die,
        jovial: game.jovial_die,
        tone: game.dice_tone
      }),
      playerIds: game.players |> Enum.map(fn x -> x.player_id end),
      playersById: game.players |> Enum.map(fn x -> {x.player_id, x |> to_json} end) |> Map.new,
      characterIds: game.characters |> ids,
      charactersById: game.characters |> by_id,
      eventsById: events |> by_id,
      eventIds: events |> ids,
      me: player_id,
      motifs: [game.motif1, game.motif2, game.motif3] |> Enum.map(&to_json/1),
      threadsById: game.threads |> by_id,
      threadIds: game.threads |> ids
    }
  end

  def handle_join(_game_id, player_id) do
    player = create_player!(%{
      "player_id" => player_id
    })
    |> Repo.preload([:player])
    character_id = create_character!(%{
      "player_id" => player_id
    }).id
    character = get_character!(character_id)
    player = update_player!(player, %{
      "character_id" => character.id
    })
    event = Games.create_chat!(%{
      "player_id" => player_id,
      "data" => %{
        type: "SWORDS_PLAYER_JOIN",
        player: to_json(player),
        character: to_json(character)
      }
    })
    {:ok, event |> to_json}
  end

  def handle_create(game_id, player_id) do
    create_game!(%{
      "game_id" => game_id,
      "dice_holder_id" => player_id,
      "overplayer_id" => player_id,
      "motif1" => %{},
      "motif2" => %{},
      "motif3" => %{}
    })
    create_player!(%{
      "player_id" => player_id
    })
  end

  def get_character!(id) do
    Character
    |> Repo.get!(id)
  end

  def get_character_for_player!(id) do
    Character
    |> Repo.get_by(player_id: id)
  end

  defp create_character!(attrs) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert!()
  end

  def update_character!(%Character{} = character, attrs) do
    character
    |> Character.changeset(attrs)
    |> Repo.update!()
  end

  defp create_game!(attrs) do
    %Game{}
    |> Game.changeset(attrs)
    |> Repo.insert!()
  end

  def update_game!(%Game{} = game, attrs) do
    game
    |> Game.changeset(attrs)
    |> Repo.update!()
  end

  def get_game!(game_id) do
    Game
    |> Repo.get_by!(game_id: game_id)
  end

  defp create_player!(attrs) do
    %Player{}
    |> Player.changeset(attrs)
    |> Repo.insert!()
  end

  def get_player!(player_id) do
    Player
    |> Repo.get_by!(player_id: player_id)
  end

  def update_player!(%Player{} = player, attrs) do
    player
    |> Player.changeset(attrs)
    |> Repo.update!()
  end

  def get_thread!(id) do
    Thread
    |> Repo.get!(id)
  end

  def create_thread!(attrs) do
    %Thread{}
    |> Thread.changeset(attrs)
    |> Repo.insert!()
  end

  def update_thread!(%Thread{} = thread, attrs) do
    thread
    |> Thread.changeset(attrs)
    |> Repo.update!()
  end

  def delete_thread!(%Thread{} = thread) do
    thread
    |> Repo.delete!()
  end

  def get_motif!(id) do
    Motif
    |> Repo.get!(id)
  end

  def update_motif!(%Motif{} = motif, attrs) do
    motif
    |> Motif.changeset(attrs)
    |> Repo.update!()
  end

  def create_reincorporation!() do
    %Reincorporation{}
    |> Reincorporation.changeset(%{})
    |> Repo.insert!()
  end

  def get_reincorporation!(id) do
    Reincorporation
    |> Repo.get!(id)
  end

  def delete_reincorporation!(%Reincorporation{} = reincorpoartion) do
    reincorpoartion
    |> Repo.delete!()
  end

  def clear_reincorporation!(player_id) do
    reincorpoartion = from(r in Reincorporation,
      join: c in Character, on: c.reincorporation_id == r.id,
      where: c.player_id == ^player_id,
      select: r
    )
    |> Repo.one!()

    if reincorpoartion do
      Repo.delete!(reincorpoartion)
      reincorpoartion.id
    else
      nil
    end
  end
end