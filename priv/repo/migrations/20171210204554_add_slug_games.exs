defmodule Tabletalk.Repo.Migrations.AddSlugGames do
  use Ecto.Migration

  alias Tabletalk.Repo
  alias Tabletalk.Games.Game
  import Ecto.Query, only: [from: 2]

  def up do
    alter table(:games) do
      add :slug, :string, length: 36
    end

    flush()
    
    Enum.each Repo.all(Game), fn game -> 
      uuid = UUID.uuid4()
      from(g in "games", where: g.id == ^game.id, update: [set: [slug: ^uuid], set: [max_players: 6]]) 
      |> Repo.update_all([])
    end

    alter table(:games) do
      modify :slug, :string, null: false
      modify :max_players, :integer, null: false
    end

    create index :games, [:slug], unique: true
  end

  def down do
    drop index :games, [:slug]

    alter table(:games) do
      remove :slug
      modify :max_players, :integer, null: true
    end
  end
end
