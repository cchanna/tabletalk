import { useState, useRef, useEffect } from "react";

export const useFocus = (takeFocus = true) => {
  const ref = useRef(null);
  useEffect(
    () => {
      if (ref.current && takeFocus) {
        ref.current.focus();
      }
    },
    [takeFocus]
  );
  return ref;
};

export const useInput = ({
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

export const useCheckbox = ({ initialValue = false }) => {
  const [checked, setChecked] = useState(initialValue);
  return {
    checked,
    onChange: e => setChecked(e.target.checked)
  };
};

export const useRadio = ({ initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);
  return name =>
    name
      ? {
          value: name,
          checked: name === value,
          onChange: () => setValue(name)
        }
      : value;
};
