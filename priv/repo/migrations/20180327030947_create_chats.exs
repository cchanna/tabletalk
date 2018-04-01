defmodule Tabletalk.Repo.Migrations.CreateChats do
  use Ecto.Migration

  def change do
    create table(:chats) do
      add :player_id, references(:players, on_delete: :delete_all), null: false
      add :data, :json, null: false

      timestamps updated_at: false
    end

    create index :chats, [:player_id]
  end
end
