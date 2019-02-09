import * as React from "react";
import rx from "resplendence";
import cx from "classnames";

rx`
@import '~Monsterhearts/styles';
`;

const WRAPPER = rx()`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const BUTTON = rx()`
  @extend %button-secondary;
  background-color: transparent;
  color: transparent;
  border-radius: 5px;
  position: relative;
  &:after {
    position: absolute;
    left: 0;
    top: 0;
    transition-property: border-color;
    transition-duration: 150ms;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    content: "";
    border: 1px solid transparent;
    border-radius: 5px;
  }
  &.spaced-horizontal {
    margin-left: 10px;
    margin-right: 10px;
  }
  &.spaced-vertical {

  }
  .content, .icon {
    flex: 0 0 auto;
    height: 28px;
    box-sizing: border-box;
  }
  .content {
    padding: 4px 5px 1px 5px;
    border-radius: 5px;
  }
  .icon {
    padding: 5px;
    border-radius: 5px 0 0 5px;
    font-family: $icon;
    & + .content {
      padding-left: 5px;
      border-radius: 0 5px 5px 0;
    }
  }
  &.small {
    font-size: 12px;
    .content, .icon {
      height: 22px;
    }
    .content {
      padding: 5px 5px 2px 5px;
    }
  }
  &.empty .icon {
    margin-right: 0px;
    border-radius: 5px;
  }
  &:not(.empty) .icon {
    margin-right: 1px;
  }
  &:not(:disabled) {
    &:focus {
      &:after {
        border-color: $foreground;
      }
    }
    &.primary {
      .icon, .content {
        color: $background;
        background-color: $accent;
      }
      &:focus {
        .icon, .content {
          background-color: lighten($accent, 10%);
        }
      }
      &:hover {
        .icon, .content {
          background-color: lighten($accent, 20%);
        }
      }
      &:active {
        .icon, .content {
          background-color: $foreground;
        }
      }
    }
    &:not(.primary) {
      &.empty {
        color: $accent;
        &:focus {
          color: lighten($accent, 10%);
        }
        &:hover {
          color: lighten($accent, 20%)
        }
        &:active {
          color: $foreground;
        }
      }
      &:not(.empty) {
        .content {
          color: $accent;
        }
        .icon {
          background-color: $accent;
          color: $background;
        }
        &:focus {
          .content {
            color: lighten($accent, 10%);
          }
          .icon {
            background-color: lighten($accent, 10%);
          }
        }
        &:hover {
          .content {
            color: lighten($accent, 20%)
          }
          .icon {
            background-color: lighten($accent, 20%);
          }
        }
        &:active {
          .content {
            color: $foreground;
          }
          .icon {
            background-color: $foreground;
          }
        }
      }
    }
  }
`;

const iconForString = value => {
  switch (value) {
    case "pencil":
      return "P";
    case "plus":
      return "+";
    case "delete":
      return "t";
    case "cancel":
      return "X";
    case "okay":
      return "c";
    case "edit":
      return "P";
    default:
      return "";
  }
};

export const Button = ({
  icon,
  className,
  spaced = false,
  spacedVertical = false,
  small = false,
  primary = false,
  children,
  ...rest
}) => (
  <button
    className={cx(className, BUTTON, {
      "spaced-horizontal": spaced,
      "spaced-vertical": spacedVertical,
      primary,
      small,
      empty: !children
    })}
    {...rest}
  >
    <div className={WRAPPER}>
      {icon ? <div className="icon">{iconForString(icon)}</div> : null}
      {children ? <div className="content">{children}</div> : null}
    </div>
  </button>
);
