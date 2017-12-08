defmodule Tabletalk.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :name, :string, null: false
      add :admin, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :game_id, references(:games, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:players, [:user_id])
    create index(:players, [:game_id])
  end
end
