defmodule Tabletalk.Repo.Migrations.AddMonsterheartsCustomMovesTable do
  use Ecto.Migration

  def change do
    create table(:monsterhearts_custom_moves) do
      add :game_id,  references(:games, on_delete: :delete_all), null: false
      add :name, :text, null: false
      add :text, :text, null: false,
      add :notes, :boolean, null: false, default: false
    end

    create unique_index(:monsterhearts_custom_moves, [:game_id, :name])
  end
end
