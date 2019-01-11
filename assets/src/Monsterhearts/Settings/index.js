import React from "react";
import { useMonsterhearts } from "store";
import rx from "resplendence";
import { hot } from "react-hot-loader";
import AutoSizeTextArea from "react-autosize-textarea";
import CustomPlaybooks from "./CustomPlaybooks";
import { useInput, useRadio, useCheckbox } from "common/useInput";
import useToggle from "common/useToggle";

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`;

const TEXT_FIELD = rx()`
  @include input-style;
`;

const BUTTON = rx()`
  @include button-style;
`;

const RADIO = rx()`
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;

  &+label {
    font-family: $interact;
    padding: 5px;
    color: darken($foreground, 20%);
    transition: color 300ms;
    white-space: nowrap;
  }
  &:not(:checked)+label {
    cursor: pointer;
    &:hover {
      color: $foreground;
    }
  }
  &:checked+label {
    color: $accent;
  }
`;

const OPTIONS = rx()`
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0;
`;

const TEXT_AREA = rx()`
  @include input-style;
  font-size: 14px;
  width: 100%;
`;

const EditCustomMove = ({ initialvalues = {}, onClose }) => {
  const [_get, { editCustomMove }] = useMonsterhearts();
  const nameField = useInput({
    initialValue: initialvalues.name || "",
    focus: true
  });
  const playbook = useRadio({
    initialValue: initialvalues.playbook || "Fae"
  });
  const textField = useInput({ initialValue: initialvalues.text || "" });
  const notesCheckbox = useCheckbox({ initialValue: initialvalues.notes });
  const [{ playbookNames }] = useMonsterhearts();
  const save = () => {
    editCustomMove({
      name: nameField.value,
      playbook: playbook(),
      text: textField.value,
      notes: notesCheckbox.checked
    });
    onClose();
  };
  return (
    <div>
      <input
        className={TEXT_FIELD}
        type="text"
        {...nameField}
        placeholder="Name"
      />
      <div className={OPTIONS}>
        {playbookNames.map(name => (
          <>
            <input
              class={RADIO}
              type="radio"
              {...playbook(name)}
              key={name}
              id={`settings-custom-move-playbook-${name}`}
            />
            <label htmlFor={`settings-custom-move-playbook-${name}`}>
              The {name}
            </label>
          </>
        ))}
      </div>
      <AutoSizeTextArea
        className={TEXT_AREA}
        {...textField}
        placeholder="When you..."
      />
      <div>
        <input
          type="checkbox"
          id="settings-custom-move-notes"
          {...notesCheckbox}
        />
        <label htmlFor="settings-custom-move-notes">
          Let the player take notes under this move
        </label>
      </div>
      <div>
        <button className={BUTTON} onClick={save}>
          Save
        </button>
        <button className={BUTTON} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const CustomMove = ({ name }) => {
  const [{ customMovesByName }] = useMonsterhearts();
  const [editing, toggleEditing] = useToggle(false);
  return editing ? (
    <EditCustomMove
      initialvalues={customMovesByName[name]}
      onClose={toggleEditing}
    />
  ) : (
    <div>
      {name}
      <button className={BUTTON} onClick={toggleEditing}>
        Edit
      </button>
    </div>
  );
};

const NewCustomMove = () => {
  const [creating, toggleCreating] = useToggle(false);
  return (
    <div>
      {creating ? (
        <EditCustomMove onClose={toggleCreating} />
      ) : (
        <button className={BUTTON} onClick={toggleCreating}>
          New Custom Move
        </button>
      )}
    </div>
  );
};

const SETTINGS = rx()`
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
`;

const HEADER = rx()`
  font-family: $header;
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 0;
`;

const PLAYBOOK_HEADER = rx()`
  font-family: $body;
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0 0 0;
`;

const Settings = () => {
  const [{ playbookNames, customMoveNamesByPlaybook }] = useMonsterhearts();
  return (
    <div className={SETTINGS}>
      <h1 className={HEADER}>Custom Playbooks</h1>
      <CustomPlaybooks />
      <h1 className={HEADER}>Custom Moves</h1>
      {playbookNames
        .filter(p => customMoveNamesByPlaybook[p])
        .map(p => (
          <div>
            <h2 className={PLAYBOOK_HEADER}>The {p}</h2>
            {customMoveNamesByPlaybook[p].map(n => (
              <CustomMove key={n} name={n} />
            ))}
          </div>
        ))}
      <NewCustomMove />
    </div>
  );
};

export default hot(module)(Settings);
