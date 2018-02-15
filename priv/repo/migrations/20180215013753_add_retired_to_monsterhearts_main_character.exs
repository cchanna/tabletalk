defmodule Tabletalk.Repo.Migrations.AddRetiredToMonsterheartsMainCharacter do
  use Ecto.Migration

  def change do
    alter table(:monsterhearts_main_characters) do
      add :is_retired, :boolean, null: false, default: false
    end
  end
end
