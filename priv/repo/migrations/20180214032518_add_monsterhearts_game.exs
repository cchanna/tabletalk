defmodule Tabletalk.Repo.Migrations.AddMonsterheartsGame do
  use Ecto.Migration

  def change do
    create table(:monsterhearts_games) do
      add :game_id,  references(:games, on_delete: :delete_all), null: false
    end

    create unique_index(:monsterhearts_games, [:game_id])
    create unique_index(:monsterhearts_player_settings, [:player_id])
    create index(:monsterhearts_chats, [:player_id])
    create index(:monsterhearts_characters, [:game_id])
    create index(:monsterhearts_main_characters, [:character_id])
    create unique_index(:monsterhearts_talks, [:chat_id])
    create unique_index(:monsterhearts_rolls, [:chat_id])
    create index(:monsterhearts_strings, [:from_id])
    create unique_index(:monsterhearts_strings, [:from_id, :to_id])
    create index(:monsterhearts_conditions, [:character_id])
    create unique_index(:monsterhearts_conditions, [:character_id, :name])
    create index(:monsterhearts_moves, [:main_character_id])
    create unique_index(:monsterhearts_moves, [:main_character_id, :name])
    create index(:monsterhearts_advancements, [:main_character_id])

    create index(:players, [:game_id, :user_id], unique: true)
  end
end
