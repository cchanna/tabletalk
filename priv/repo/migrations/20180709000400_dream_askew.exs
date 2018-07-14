defmodule Tabletalk.Repo.Migrations.DreamAskew do
  use Ecto.Migration

  def change do
    create table(:dream_askew_games) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :visuals, {:array, :text}, null: false, default: []
      add :conflicts, {:array, :text}, null: false, default: []
    end

    create unique_index(:dream_askew_games, [:game_id])

    create table(:dream_askew_characters) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :role, :text, null: false
      add :name, :text
      add :look_1, :text
      add :look_2, :text
      add :gender, :text
      add :pronouns, :text
      add :style_1, :text
      add :style_2, :text
      add :choices_1, {:array, :text}, null: false, default: []
      add :choices_2, {:array, :text}, null: false, default: []
      add :key_relationship_1, :text
      add :key_relationship_2, :text
      add :notes, :text

      timestamps()
    end

    create index(:dream_askew_characters, [:game_id])
    create unique_index(:dream_askew_characters, [:game_id, :role])

    create table(:dream_askew_players) do
      add :player_id, references(:players, on_delete: :delete_all), null: false
      add :character_id, references(:dream_askew_characters, on_delete: :nilify_all)
      add :tokens, :smallint, null: false, default: 0
    end

    create unique_index(:dream_askew_players, [:player_id])
    create unique_index(:dream_askew_players, [:character_id])

    create table(:dream_askew_settings) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :player_id, references(:players, on_delete: :nilify_all)
      add :name, :string, null: false
      add :desire_1, :text
      add :desire_2, :text
      add :notes, :text
    end

    create index(:dream_askew_settings, [:game_id])
    create unique_index(:dream_askew_settings, [:game_id, :name])

    create table(:dream_askew_minor_characters) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :name, :text, null: false
      add :notes, :text
    end

    create index(:dream_askew_minor_characters, [:game_id])
  end
end
