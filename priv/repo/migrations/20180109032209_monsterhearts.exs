defmodule Tabletalk.Repo.Migrations.Monsterhearts do
  use Ecto.Migration

  def change do
    create table(:monsterhearts_player_settings) do
      add :player_id, references(:players, on_delete: :delete_all), null: false
      add :is_gm, :boolean, null: false
    end

    create table(:monsterhearts_characters) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :name, :string, null: false, size: 64, default: ""
      add :notes, :text, null: false, default: ""
    end

    create table(:monsterhearts_main_characters) do
      add :character_id, references(:monsterhearts_characters, on_delete: :delete_all), null: false
      add :player_id, references(:players, on_delete: :delete_all), null: false
      
      add :playbook, :string, null: false, size: 64
      add :look, :string, null: false, size: 64, default: ""
      add :eyes, :string, null: false, size: 64, default: ""
      add :origin, :string, null: false, size: 64, default: ""

      add :hot,      :smallint 
      add :cold,     :smallint
      add :volatile, :smallint 
      add :dark,     :smallint

      add :harm, :smallint, null: false, default: 0
      add :experience, :smallint, null: false, default: 0

      timestamps()
    end

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

    create table(:monsterhearts_strings) do
      add :from_id, references(:monsterhearts_characters, on_delete: :delete_all), null: false
      add :to_id, references(:monsterhearts_characters, on_delete: :delete_all), null: false
      add :count, :smallint, null: false, default: 0
    end

    create table(:monsterhearts_conditions) do
      add :character_id,  references(:monsterhearts_characters, on_delete: :delete_all), null: false
      add :name, :string, null: false, size: 64
    end

    create table(:monsterhearts_moves) do
      add :main_character_id,  references(:monsterhearts_main_characters, on_delete: :delete_all), null: false
      add :name, :string, null: false, size: 64
      add :notes, :text
    end
  end
end
