defmodule Tabletalk.Repo.Migrations.DeleteChats do
  use Ecto.Migration

  def up do
    drop_if_exists unique_index(:monsterhearts_talks, [:chat_id])
    drop_if_exists unique_index(:monsterhearts_rolls, [:chat_id])
    drop_if_exists index(:monsterhearts_chats, [:player_id])
    drop_if_exists table(:monsterhearts_rolls)
    drop_if_exists table(:monsterhearts_talks)
    drop_if_exists table(:monsterhearts_chats)
  end

  def down do
    create table(:monsterhearts_chats) do
      add :player_id, references(:players, on_delete: :delete_all), null: false

      timestamps updated_at: false
    end

    create table(:monsterhearts_talks) do
      add :chat_id, references(:monsterhearts_chats, on_delete: :delete_all), null: false
      add :text, :text, null: false
      add :is_log, :boolean, null: false, default: false
    end

    create table(:monsterhearts_rolls) do
      add :chat_id, references(:monsterhearts_chats, on_delete: :delete_all), null: false
      add :die1, :smallint, null: false
      add :die2, :smallint, null: false
      add :bonus, :smallint, null: false
    end

    create unique_index(:monsterhearts_talks, [:chat_id])
    create unique_index(:monsterhearts_rolls, [:chat_id])
    create index(:monsterhearts_chats, [:player_id])
  end
end
