defmodule Tabletalk.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :usage, :integer, default: 0, null: false
      add :earliest_token_time, :utc_datetime, null: false

      timestamps()
    end

    create table(:auths) do
      add :provider, :integer, default: 0,                       null: false
      add :uid,      :string,                                    null: false
      add :user_id,  references(:users, on_delete: :delete_all), null: false
      
      timestamps()
    end

    create unique_index(:auths, [:provider, :uid])
  end
end
