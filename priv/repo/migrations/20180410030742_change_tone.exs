defmodule Tabletalk.Repo.Migrations.ChangeTone do
  use Ecto.Migration

  def up do
    execute "DELETE FROM games WHERE kind = 1"

    alter table(:swords_players) do
      remove :tone
    end

    alter table(:swords_characters) do
      remove :player_id
      add :player_id, references(:players, on_delete: :delete_all), null: false
      add :eidolon, :text, null: false, default: ""
      add :eidolon_is_image, :boolean, null: false, default: false
      add :name, :text, null: false, default: ""
      add :all_that_matters, {:array, :text}, null: false, default: []
      add :jovial_feat, :text, null: false, default: ""
      add :jovial_feat_used, :boolean, null: false, default: false
      add :glum_feat, :text, null: false, default: ""
      add :glum_feat_used, :boolean, null: false, default: false
      add :trick, :text, null: false, default: ""
      add :trick_used, :boolean, null: false, default: false
      add :notes, :text, null: false, default: ""
    end

    create table(:swords_threads) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :text, :text, null: false
      add :reincorporated_by_id, references(:swords_characters, on_delete: :nilify_all)
    end

    create index :swords_threads, [:game_id]

    create table(:swords_motifs) do
      add :item1, :text, null: false, default: ""
      add :item2, :text, null: false, default: ""
      add :item3, :text, null: false, default: ""
      add :reincorporated_by_id, references(:swords_characters, on_delete: :nilify_all)
    end

    alter table(:swords_games) do
      add :overtone, :boolean, null: false, default: false
      add :dice_tone, :boolean
      add :motif1_id, references(:swords_motifs, on_delete: :delete_all), null: false
      add :motif2_id, references(:swords_motifs, on_delete: :delete_all), null: false
      add :motif3_id, references(:swords_motifs, on_delete: :delete_all), null: false
    end
  end

  def down do
    execute "DELETE FROM games WHERE kind = 1"

    drop table(:swords_threads)

    alter table(:swords_players) do
      add :tone, :boolean
    end

    alter table(:swords_games) do
      remove :overtone
      remove :dice_tone
      remove :motif1_id
      remove :motif2_id
      remove :motif3_id
    end

    alter table(:swords_characters) do
      remove :player_id
      add :player_id, references(:swords_players, on_delete: :delete_all), null: false
      remove :eidolon
      remove :eidolon_is_image
      remove :name
      remove :all_that_matters
      remove :jovial_feat
      remove :jovial_feat_used
      remove :glum_feat
      remove :glum_feat_used
      remove :trick
      remove :trick_used
      remove :notes
    end


    drop table(:swords_motifs)
  end
end
