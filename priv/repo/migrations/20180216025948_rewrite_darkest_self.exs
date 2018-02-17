defmodule Tabletalk.Repo.Migrations.RewriteDarkestSelf do
  use Ecto.Migration

  def change do
    alter table(:monsterhearts_main_characters) do
      add :darkest_self, :text
    end
  end
end
