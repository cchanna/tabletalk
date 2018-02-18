defmodule Tabletalk.Monsterhearts do
  import Ecto.Query, warn: false
  alias Tabletalk.Repo

  alias Tabletalk.Monsterhearts.MainCharacter
  alias Tabletalk.Monsterhearts.PlayerSettings
  alias Tabletalk.Monsterhearts.Chat
  alias Tabletalk.Monsterhearts.Game
  alias Tabletalk.Monsterhearts.Character
  alias Tabletalk.Monsterhearts.Move
  alias Tabletalk.Monsterhearts.Condition
  alias Tabletalk.Monsterhearts.String
  alias Tabletalk.Monsterhearts.Advancement
  alias Tabletalk.Games

  defp create_player_settings!(attrs) do
    %PlayerSettings{}
    |> PlayerSettings.changeset(attrs)
    |> Repo.insert!()
  end

  defp make_player_if_nil(players) do
    players |> Enum.map(fn p ->
      if p.monsterhearts_player_settings === nil do
        %{p | monsterhearts_player_settings: create_player_settings!(%{"player_id" => p.id, "is_gm" => p.admin})}
      else
        p
      end
    end)
  end

  defp list_chats!(game_id) do
    sq = from c in Chat,
      join: p in Games.Player, on: p.id == c.player_id,
      where: p.game_id == ^game_id,
      order_by: [desc: c.inserted_at],
      limit: 100

    query = from c in Chat,
      join: s in subquery(sq), on: s.id == c.id,
      order_by: [asc: c.inserted_at],
      preload: [:talk],
      preload: [:roll]
    Repo.all(query)
  end

  defp list_characters!(game_id) do
    string_count = from c in Character,
      left_join: s in String, on: (c.id == s.to_id or c.id == s.from_id),
      select: %{id: c.id, string_count: count(s.id)},
      group_by: [c.id]

    query = from c in Character,
      where: c.game_id == ^game_id,
      left_join: mc in MainCharacter, on: c.id == mc.character_id,
      left_join: sc in subquery(string_count), on: c.id == sc.id,
      preload: [:conditions, :main_character, main_character: [:moves, :advancements]],
      order_by: [
        fragment("CASE WHEN ? IS NULL THEN CASE WHEN ? = 0 THEN 3 ELSE 2 END ELSE 1 END", mc.id, sc.string_count), 
        desc: sc.string_count,
        asc: c.name
      ]
    Repo.all(query)
  end

  defp list_strings!(game_id) do
    query = from s in String,
      join: c in Character, on: c.id == s.from_id,
      where: c.game_id == ^game_id
    Repo.all(query)
  end

  defp list_players!(game_id) do
    query = from p in Games.Player,
      preload: [:monsterhearts_player_settings],
      where: p.game_id == ^game_id
    Repo.all(query)
  end


  def load(game_id, player_id) do
    players = list_players!(game_id) |> make_player_if_nil()
    result = %{
      players: players,
      me: player_id,
      chats: list_chats!(game_id),
      characters: list_characters!(game_id),
      strings: list_strings!(game_id),
      game: get_game!(game_id)
    }
    result
  end

  def get_character!(id) do
    Character
    |> Repo.get!(id)
    |> Repo.preload([:conditions, :main_character, [main_character: [:moves, :advancements]]])
  end

  defp create_game!(attrs) do
    %Game{}
    |> Game.changeset(attrs)
    |> Repo.insert!()
  end

  defp get_game!(game_id) do
    Repo.get_by(Game, game_id: game_id) || 
    create_game!(%{"game_id" => game_id})
  end

  def update_main_character!(%MainCharacter{} = main_character, attrs) do
    main_character
    |> MainCharacter.changeset(attrs)
    |> Repo.update!()
  end

  def create_character!(attrs \\%{}) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert!()
    |> Repo.preload([:conditions, :main_character, [main_character: [:moves, :advancements]]])
  end

  def delete_move!(%Move{} = move) do
    move
    |> Repo.delete!()
  end

  def create_move!(attrs \\ %{}) do
    %Move{}
    |> Move.changeset(attrs)
    |> Repo.insert!()
  end

  def update_move!(%Move{} = move, attrs) do
    move
    |> Move.changeset(attrs)
    |> Repo.update!()
  end

  def create_advancement!(attrs \\ %{}) do
    %Advancement{}
    |> Advancement.changeset(attrs)
    |> Repo.insert!()
  end

  def delete_advancement!(%Advancement{} = advancement) do
    advancement
    |> Repo.delete!()
  end

  def update_character!(%Character{} = character, attrs) do
    character
    |> Character.changeset(attrs)
    |> Repo.update!()
  end

  def create_string!(attrs \\ %{}) do
    %String{}
    |> String.changeset(attrs)
    |> Repo.insert!()
  end

  def get_string!(id) do
    String
    |> Repo.get!(id)
  end

  def get_condition!(character_id, name) do
    Condition
    |> Repo.get_by(character_id: character_id, name: name)
  end

  def create_condition!(attrs \\ %{}) do
    %Condition{}
    |> Condition.changeset(attrs)
    |> Repo.insert!()
  end

  def delete_condition!(%Condition{} = condition) do
    condition
    |> Repo.delete!()
  end

  def update_string!(%String{} = string, attrs) do
    string
    |> String.changeset(attrs)
    |> Repo.update!()
  end

  def create_chat!(attrs \\ %{}) do
    %Chat{}
    |> Chat.changeset(attrs)
    |> Repo.insert!()
    |> Repo.preload(:talk)
    |> Repo.preload(:roll)
  end
end