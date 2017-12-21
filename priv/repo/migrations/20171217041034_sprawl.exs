defmodule Tabletalk.Repo.Migrations.Sprawl do
  use Ecto.Migration

  def change do
    create table(:permissions) do
      add :game_id,  references(:games, on_delete: :delete_all), null: false
      add :players, :text
    end  

    create table(:sprawl_characters) do
      add :game_id,  references(:games, on_delete: :delete_all), null: false
      add :edit_id,  references(:permissions)
      add :view_id,  references(:permissions)
 
      add :playbook, :varchar,  size: 48, null: false 
      add :name,     :varchar,  size: 48, null: false, default: ""
      add :eyes,     :varchar,  size: 48, null: false, default: ""
      add :face,     :varchar,  size: 48, null: false, default: ""
      add :body,     :varchar,  size: 48, null: false, default: ""
      add :wear,     :varchar,  size: 48, null: false, default: ""
      add :skin,     :varchar,  size: 48, null: false, default: ""
      add :look,     :text,               null: false, default: ""
      add :notes,    :text,               null: false, default: ""
      add :xp,       :smallint,           null: false, default: 0
      add :cred,     :smallint,           null: false, default: 0
      add :style,    :smallint,           null: false, default: 0 
      add :edge,     :smallint,           null: false, default: 0 
      add :cool,     :smallint,           null: false, default: 0 
      add :mind,     :smallint,           null: false, default: 0 
      add :meat,     :smallint,           null: false, default: 0 
      add :synth,    :smallint,           null: false, default: 0 
      add :harm,     :smallint,           null: false, default: 0 
      add :gear,     :smallint,           null: false, default: 0 
      add :intel,    :smallint,           null: false, default: 0 
      timestamps()
    end

    create table(:sprawl_directives) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :name,         :varchar, size: 48, null: false
      add :detail,       :varchar, size: 48
    end

    create table (:sprawl_advancements) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :kind,         :smallint, null: false
      timestamps()
    end

    create table (:sprawl_moves) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :advancement_id, references(:sprawl_advancements, on_delete: :delete_all)
      add :name, :varchar, size: 48, null: false
    end

    create table(:sprawl_cyberware) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :move_id, references(:sprawl_moves, on_delete: :delete_all)
      add :name, :varchar, size: 48, null: false
    end

    create table(:sprawl_cyberware_options) do
      add :cyberware_id, references(:sprawl_cyberware, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
    end

    create table(:sprawl_expertises) do
      add :move_id, references(:sprawl_moves, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
    end

    create table(:sprawl_links) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :linked_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :value, :smallint, null: false
    end

    create table(:sprawl_contacts) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
      add :description, :text, null: false, default: ""
    end

    create table(:sprawl_custom_weapons) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
      add :base, :varchar, size: 48, null: false
      add :option_1, :varchar, size: 48, null: false
      add :option_2, :varchar, size: 48, null: false
      add :description, :text, null: false, default: ""
    end

    create table(:sprawl_hack_move) do
      add :game_id, references(:games, on_delete: :delete_all), null: false
      add :playbook, :varchar, size: 48 
      add :name,     :varchar, size: 48
      add :text,     :text
      add :is_starting_move, :boolean, null: false
    end

    create table(:sprawl_holds) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
      add :value, :smallint, null: false
    end

    create table(:sprawl_gear) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
      add :description, :varchar, size: 128, null: false, default: ""
    end

    create table(:sprawl_vehicles) do
      add :character_id, references(:sprawl_characters, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
      add :frame, :varchar, size: 48, null: false
      add :design, :varchar, size: 48, null: false
      add :power,    :smallint, null: false
      add :looks,    :smallint, null: false
      add :weakness, :smallint, null: false
      add :armor,    :smallint, null: false
    end

    create table(:sprawl_vehicle_strengths) do
      add :vehicle_id, references(:sprawl_vehicles, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
    end

    create table(:sprawl_vehicle_looks) do
      add :vehicle_id, references(:sprawl_vehicles, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
    end

    create table(:sprawl_vehicle_weaknesses) do
      add :vehicle_id, references(:sprawl_vehicles, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
    end

    create table(:sprawl_vehicle_weapons) do
      add :vehicle_id, references(:sprawl_vehicles, on_delete: :delete_all), null: false
      add :name, :varchar, size: 48, null: false
      add :description, :varchar, size: 128, null: false, default: ""
    end
  end
end
