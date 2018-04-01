defmodule Tabletalk.Repo.Migrations.SwordsWithoutMaster do
  use Ecto.Migration

  def change do
    create table(:swords_games) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :glum_colors, {:array, :text}
      add :glum_text_is_dark, :boolean, null: false, default: false
      add :jovial_colors, {:array, :text}
      add :jovial_text_is_dark, :boolean, null: false, default: true
      add :glum_die, :smallint, default: 0
      add :jovial_die, :smallint, default: 0
      add :dice_holder_id, references(:players, on_delete: :nilify_all), null: false
      add :overplayer_id, references(:players, on_delete: :nilify_all), null: false 

      timestamps()
    end

    create unique_index(:swords_games, [:game_id])

    create table(:swords_players) do
      add :player_id, references(:players, on_delete: :delete_all), null: false
      add :tone, :boolean

      timestamps()
    end

    create unique_index(:swords_players, [:player_id])

    create table(:swords_characters) do
      add :player_id, references(:swords_players, on_delete: :delete_all), null: false
      
      timestamps()
    end

    alter table(:swords_players) do
      add :character_id, references(:swords_characters, on_delete: :nilify_all)
    end

    create index(:swords_characters, [:player_id])
  end
end
