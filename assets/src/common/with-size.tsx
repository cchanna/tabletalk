import React, { useState, useRef, useEffect } from "react";

type Breakpoints = { [key: number]: string };

const convertWidthToBreakpoint = (width: number, breakPoints: Breakpoints) => {
  const result: string[] = [];
  const breakValues = Object.keys(breakPoints)
    .map(key => parseInt(key, 10))
    .sort();
  let i: number;
  for (i = 0; i < breakValues.length; i++) {
    const breakValue = breakValues[i];
    const breakName = breakPoints[breakValue];
    if (width <= breakValue) {
      result.push(breakName);
      break;
    }
    result.push("over-" + breakName);
  }
  for (i++; i < breakValues.length; i++) {
    const breakValue = breakValues[i];
    const breakName = breakPoints[breakValue];
    result.push("under-" + breakName);
  }
  if (width > breakValues[breakValues.length - 1]) {
    result.push("max");
  } else {
    result.push("under-max");
  }
  return result;
};

export default (
  breakpoints,
  { fullWidth = true, fullHeight = true } = {}
) => Node => {
  class Breakpoint extends React.Component {
    state = {
      sizes: []
    };

    timeout: null | number = null;
    ref: null | HTMLElement = null;

    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }

    resize = () => {
      if (this.ref) {
        const sizes = convertWidthToBreakpoint(
          this.ref.offsetWidth,
          breakpoints
        );
        this.setState({ sizes });
      }
    };

    handleResize = () => {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(this.resize, 100);
    };

    handleRef = e => {
      this.ref = e;
      this.resize();
    };

    render() {
      const props = this.props;
      const { sizes } = this.state;
      const style: React.CSSProperties = {};
      if (fullWidth) style.width = "100%";
      if (fullHeight) style.height = "100%";
      return (
        <div style={style} ref={this.handleRef}>
          <Node {...props} sizes={sizes} />
        </div>
      );
    }
  }
  return Breakpoint;
};

export const useSize = (
  breakpoints: Breakpoints
): [React.RefObject<HTMLElement>, string[]] => {
  const [sizes, setSizes] = useState<string[]>([]);
  const timeout = useRef<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  const resize = () => {
    if (ref.current) {
      const newSizes = convertWidthToBreakpoint(
        ref.current.offsetWidth,
        breakpoints
      );
      setSizes(newSizes);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
      timeout.current = window.setTimeout(resize, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(resize, [ref]);

  return [ref, sizes];
};
