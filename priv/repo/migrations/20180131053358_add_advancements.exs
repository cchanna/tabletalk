defmodule Tabletalk.Repo.Migrations.AddAdvancements do
  use Ecto.Migration

  def change do
    create table(:monsterhearts_advancements) do
      add :main_character_id,  references(:monsterhearts_main_characters, on_delete: :delete_all), null: false
      add :name, :string, null: false, size: 5
    end
  end
end
