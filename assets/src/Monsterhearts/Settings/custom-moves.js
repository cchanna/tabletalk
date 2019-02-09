import React from "react";
import { useMonsterhearts } from "store";
import rx from "resplendence";
import { hot } from "react-hot-loader";
import AutoSizeTextArea from "react-autosize-textarea";
import { useInput, useRadio, useCheckbox } from "common/useInput";
import useToggle from "common/useToggle";
import { Button } from "./button";

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`;

const TEXT_FIELD = rx()`
  @include input-style;
`;

const BUTTON = rx()`
  @include button-style-accent;
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

const EDIT_CUSTOM_MOVE_BUTTONS = rx()`
  margin-top: 10px;
`;

const CUSTOM_MOVE_NAME = rx()`
  font-size: 16px;
  font-family: $header;
  font-weight: bold;
`;

const EDIT_CUSTOM_MOVE = rx()`
  margin: 14px 0 30px 0;
`;

const EditCustomMove = ({ initialvalues = {}, onClose }) => {
  const [_get, { editCustomMove, deleteCustomMove }] = useMonsterhearts();
  const nameField = useInput({
    initialValue: initialvalues.name || "",
    focus: true
  });
  const playbook = useRadio({
    initialValue: initialvalues.playbook || "Fae"
  });
  const exists = !!initialvalues.name;
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
  const handleDelete = () => {
    deleteCustomMove({
      name: nameField.value
    });
    onClose();
  };
  return (
    <div className={EDIT_CUSTOM_MOVE}>
      {exists ? (
        <div className={CUSTOM_MOVE_NAME}>{nameField.value}</div>
      ) : (
        <input
          className={TEXT_FIELD}
          type="text"
          {...nameField}
          placeholder="Name"
        />
      )}
      <div className={OPTIONS}>
        {playbookNames.map(name => (
          <React.Fragment key={name}>
            <input
              className={RADIO}
              type="radio"
              {...playbook(name)}
              key={name}
              id={`settings-custom-move-playbook-${name}`}
            />
            <label htmlFor={`settings-custom-move-playbook-${name}`}>
              The {name}
            </label>
          </React.Fragment>
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
      <div className={EDIT_CUSTOM_MOVE_BUTTONS}>
        <Button icon="cancel" onClick={onClose} />
        {exists ? <Button spaced icon="delete" onClick={handleDelete} /> : null}
        <Button
          primary
          spaced
          icon="okay"
          onClick={save}
          disabled={!nameField.value || !textField.value}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const CUSTOM_MOVE = rx()`
  margin: 10px 0;
`;

const EDIT_BUTTON = rx()`
  @include button-style-accent;
  font-family: $icon;
  margin-left: 5px;
`;

const CustomMove = ({ name }) => {
  const [{ customMovesByName }] = useMonsterhearts();
  const [editing, toggleEditing] = useToggle(false);
  return editing ? (
    <EditCustomMove
      initialvalues={customMovesByName[name]}
      onClose={toggleEditing}
    />
  ) : (
    <div className={CUSTOM_MOVE}>
      <span className={CUSTOM_MOVE_NAME}>{name}</span>
      <Button spaced icon="edit" onClick={toggleEditing} />
    </div>
  );
};

const NEW_CUSTOM_MOVE = rx()`
  margin-top: 10px;
`;

const NewCustomMove = () => {
  const [creating, toggleCreating] = useToggle(false);
  return (
    <div className={NEW_CUSTOM_MOVE}>
      {creating ? (
        <EditCustomMove onClose={toggleCreating} />
      ) : (
        <Button primary icon="plus" onClick={toggleCreating}>
          New Custom Move
        </Button>
      )}
    </div>
  );
};

const PLAYBOOK_HEADER = rx()`
  font-family: $header;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 24px;
  margin: 10px 0 0 0;
`;

const BREAK = rx()`
  @extend %break-weak;
`;

const CUSTOM_MOVES = rx()`
  margin-top: 10px;
`;

const CustomMoves = () => {
  const [{ playbookNames, customMoveNamesByPlaybook }] = useMonsterhearts();
  return (
    <div className={CUSTOM_MOVES}>
      {playbookNames
        .filter(p => customMoveNamesByPlaybook[p])
        .map(p => (
          <div key={p}>
            <h2 className={PLAYBOOK_HEADER}>The {p}</h2>
            {customMoveNamesByPlaybook[p].map(n => (
              <CustomMove key={n} name={n} />
            ))}
            <div className={BREAK} />
          </div>
        ))}
      <NewCustomMove />
    </div>
  );
};

export default hot(module)(CustomMoves);
