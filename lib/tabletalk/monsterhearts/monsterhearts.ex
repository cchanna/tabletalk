defmodule Tabletalk.Monsterhearts do
  import Ecto.Query, warn: false
  alias Tabletalk.Repo
  import Tabletalk.Monsterhearts.View

  alias Tabletalk.Monsterhearts.{
    MainCharacter, PlayerSettings,
    Character, Move, Condition,
    String, Advancement, Definitions,
    CustomPlaybook, CustomMove
  }
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

  defp list_characters!(game_id) do
    string_count = from c in Character,
      join: s in String, on: (c.id == s.to_id or c.id == s.from_id),
      where: s.count > 0,
      select: %{id: c.id},
      group_by: [c.id]

    query = from c in Character,
      where: c.game_id == ^game_id,
      left_join: mc in MainCharacter, on: c.id == mc.character_id,
      left_join: sc in subquery(string_count), on: c.id == sc.id,
      preload: [:conditions, :main_character, main_character: [:moves, :advancements]],
      order_by: [
        fragment("CASE WHEN ? IS NULL THEN 2 ELSE 1 END", mc.id),
        fragment("CASE WHEN ? IS NULL THEN 2 ELSE 1 END", sc.id), 
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

  defp list_custom_playbooks(game_id) do
    query = from cp in CustomPlaybook,
      where: cp.game_id == ^game_id
    Repo.all(query)
  end

  defp list_custom_moves(game_id) do
    query = from cm in CustomMove,
      where: cm.game_id == ^game_id
    Repo.all(query)
  end



  def load(game_id, player_id) do
    players = list_players!(game_id) |> make_player_if_nil()
    events = Games.list_chats!(game_id)
    characters = list_characters!(game_id)
    strings = list_strings!(game_id)
    playbook_names = Definitions.playbooks
    custom_playbooks = list_custom_playbooks game_id
    custom_playbook_names = custom_playbooks |> Enum.map(fn cp -> cp.name end)
    custom_moves = list_custom_moves game_id
    %{
      charactersById: characters |> by_id,
      characters: characters |> ids,
      playersById: players |> by_id,
      players: players |> ids,
      me: player_id,
      eventsById: events |> by_id,
      eventIds: events |> ids,
      strings: strings |> ids,
      stringsById: strings |> by_id,
      custom: %{
        playbookNames: custom_playbook_names ,
        moveNamesByPlaybook: custom_moves 
          |> Enum.group_by(fn x -> x.playbook end, fn x -> x.name end),
        movesByName: custom_moves 
          |> Enum.map(fn x -> {x.name, x |> to_json} end)
          |> Map.new
      },
      definitions: %{
        movesByName: Definitions.moves_by_name,
        advancementsById: Definitions.advancements_by_id,
        playbooks: playbook_names,
        playbooksByName: Definitions.playbooks_by_name,
        seasonAdvances: Definitions.season_advances,
        growingUpMoves: Definitions.growing_up_moves
      }
    }
  end
  def get_character!(id) do
    Character
    |> Repo.get!(id)
    |> Repo.preload([:conditions, :main_character, [main_character: [:moves, :advancements]]])
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

  def get_custom_move(name, game_id) do
    CustomMove
    |> Repo.get_by(%{name: name, game_id: game_id})
  end

  def create_custom_move!(attrs \\ %{}) do
    %CustomMove{}
    |> CustomMove.changeset(attrs)
    |> Repo.insert!()
  end

  def update_custom_move!(%CustomMove{} = custom_move, attrs) do
    custom_move
    |> CustomMove.changeset(attrs)
    |> Repo.update!()
  end

  def delete_custom_move!(%CustomMove{} = custom_move) do
    custom_move
    |> Repo.delete!()
  end

  def get_custom_playbook(name, game_id) do
    CustomPlaybook
    |> Repo.get_by(%{name: name, game_id: game_id})
  end

  def create_custom_playbook!(attrs \\ %{}) do
    %CustomPlaybook{}
    |> CustomPlaybook.changeset(attrs)
    |> Repo.insert!()
  end

  def update_custom_playbook!(%CustomPlaybook{} = custom_playbook, attrs) do
    custom_playbook
    |> CustomPlaybook.changeset(attrs)
    |> Repo.update!()
  end

  def delete_custom_playbook!(%CustomPlaybook{} = custom_playbook) do
    custom_playbook
    |> Repo.delete!()
  end
end