import React from 'react'

const convertWidthToBreakpoint = (width, breakPoints) => {
  const result = [];
  const breakValues = Object.keys(breakPoints).sort((a, b) => (a - b));
  let i;
  for (i=0; i < breakValues.length; i++) {
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
  }
  else {
    result.push("under-max");
  }
  return result;
}


export default (breakpoints, {fullWidth = true, fullHeight = true} = {}) => Node => {

  class Breakpoint extends React.Component {

    state = {
      sizes: []
    }

    timeout = null;
    ref = null;

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    resize = () => {
      if (this.ref) {
        const sizes = convertWidthToBreakpoint(this.ref.offsetWidth, breakpoints);
        this.setState({sizes});
      }
    }

    handleResize = () => {
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(this.resize, 100);
    }

    handleRef = e => {
      this.ref = e;
      this.resize();
    }

    render() {
      const props = this.props;
      const { sizes } = this.state;
      const style = {};
      if (fullWidth) style.width = "100%";
      if (fullHeight) style.height = "100%";
      return (
        <div style={style} ref={this.handleRef}>
          <Node {...props} sizes={sizes}/>
        </div>
      )
    }
  }
  return Breakpoint;
}