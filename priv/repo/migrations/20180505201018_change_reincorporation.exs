defmodule Tabletalk.Repo.Migrations.ChangeReincorporation do
  use Ecto.Migration

  def up do
    create table :swords_reincorporations do
    
    end

    alter table :swords_threads do
      remove :reincorporated_by_id
      add :reincorporation_id, references(:swords_reincorporations, on_delete: :nilify_all)
    end

    alter table :swords_motifs do
      remove :reincorporated_by_id
      add :reincorporation_id, references(:swords_reincorporations, on_delete: :nilify_all)
    end

    alter table :swords_characters do
      add :reincorporation_id, references(:swords_reincorporations, on_delete: :nilify_all)
    end

    create unique_index :swords_characters, [:reincorporation_id]
    create unique_index :swords_motifs, [:reincorporation_id]
    create unique_index :swords_threads, [:reincorporation_id]
  end

  def down do
    drop unique_index :swords_characters, [:reincorporation_id]
    drop unique_index :swords_motifs, [:reincorporation_id]
    drop unique_index :swords_threads, [:reincorporation_id]

    alter table :swords_characters do
      remove :reincorporation_id
    end

    alter table :swords_motifs do
      remove :reincorporation_id
      add :reincorporated_by_id, references(:swords_characters, on_delete: :nilify_all)
    end

    alter table :swords_threads do
      remove :reincorporation_id
      add :reincorporated_by_id, references(:swords_characters, on_delete: :nilify_all)
    end

    drop table :swords_reincorporations
  end    
end
