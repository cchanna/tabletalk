defmodule Tabletalk.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :name, :string, null: false
      add :kind, :integer, null: false
      add :max_players, :integer, default: nil

      timestamps()
    end

  end
end
