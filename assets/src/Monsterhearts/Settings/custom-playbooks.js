import React, { useState, useRef, useEffect } from "react";
import { func } from "prop-types";
import { useMonsterhearts } from "store";
import rx from "resplendence";
import { Button } from "./button";

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`;

const useFocus = (takeFocus = true) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && takeFocus) {
      ref.current.focus();
    }
  }, [takeFocus]);
  return ref;
};

const useInput = ({
  initialValue = "",
  focus = false,
  filter = null,
  onReturn = null
} = {}) => {
  const [value, setValue] = useState(initialValue);
  const onKeyDown = e => {
    if (e.which === 13) {
      e.preventDefault();
      onReturn();
    }
  };
  const ref = useFocus(focus);
  return {
    value,
    onChange: e => {
      let input = e.target.value;
      if (filter) input = filter(input);
      setValue(input);
    },
    onKeyDown: onReturn ? onKeyDown : null,
    ref
  };
};

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(!value)];
};

const TEXT_FIELD = rx()`
  @include input-style;
  margin: 0 10px;
`;

const capitalizeEveryWord = string =>
  string
    .split(" ")
    .map(x => (x ? x[0].toUpperCase() + x.slice(1) : ""))
    .join(" ");

const NEW_PLAYBOOK = rx()`
  font-size: 18px;
  height: 35px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const NewPlaybookInput = ({ onClose }) => {
  const [_get, { editCustomPlaybook }] = useMonsterhearts();
  const nameField = useInput({
    focus: true,
    filter: capitalizeEveryWord,
    onReturn: save
  });
  const save = () => {
    editCustomPlaybook({ name: nameField.value });
    onClose();
  };
  return (
    <>
      The
      <input className={TEXT_FIELD} type="text" {...nameField} />
      {nameField.value ? (
        <Button primary icon="okay" onClick={save}>
          Save
        </Button>
      ) : (
        <Button icon="cancel" onClick={onClose} />
      )}
    </>
  );
};
NewPlaybookInput.propTypes = {
  onClose: func.isRequired
};

const NewPlaybook = () => {
  const [creating, toggleCreating] = useToggle();
  return (
    <div className={NEW_PLAYBOOK}>
      {creating ? (
        <NewPlaybookInput onClose={toggleCreating} />
      ) : (
        <Button onClick={toggleCreating} primary icon="plus">
          New Playbook
        </Button>
      )}
    </div>
  );
};

const CUSTOM_PLAYBOOK = rx()`
  margin: 10px 0;
  font-family: $body;
  font-size: 18px;
`;

const X_BUTTON = rx()`
  @include button-style-accent;
  margin-left: 10px;
  font-family: 'icomoon';
`;

const DELETE_WARNING = rx()`
  font-size: 12px;
`;

const CONFIRM_BUTTON = rx()`
  margin: 0 5px;
`;

const CustomPlaybook = ({ name }) => {
  const [deleting, setDeleting] = useState(false);
  const [_get, { deleteCustomPlaybook }] = useMonsterhearts();
  const ref = useFocus(deleting);
  return (
    <div className={CUSTOM_PLAYBOOK} key={name}>
      The {name}
      <Button
        icon="delete"
        onClick={() => setDeleting(true)}
        disabled={deleting}
      />
      {deleting ? (
        <div className={DELETE_WARNING}>
          This cannot be undone and will delete all custom moves attached to
          this playbook as well. Really delete?
          <Button
            primary
            small
            icon="delete"
            className={CONFIRM_BUTTON}
            onClick={() => deleteCustomPlaybook({ name })}
            ref={ref}
          >
            Delete
          </Button>
          <Button
            small
            className={CONFIRM_BUTTON}
            icon="cancel"
            onClick={() => setDeleting(false)}
          />
        </div>
      ) : null}
    </div>
  );
};

const CUSTOM_PLAYBOOKS = rx()`
  margin-top: 10px;
`;

const CustomPlaybooks = () => {
  const [{ customPlaybookNames }] = useMonsterhearts();
  return (
    <div className={CUSTOM_PLAYBOOKS}>
      {customPlaybookNames.map(name => (
        <CustomPlaybook name={name} key={name} />
      ))}
      <NewPlaybook />
    </div>
  );
};

export default CustomPlaybooks;
