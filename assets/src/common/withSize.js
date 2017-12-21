import React from 'react'
import rx from 'resplendence';

const Container = rx('div')`
  width: 100%;
  height: 100%;
`

const convertWidthToBreakpoint = (width, breakPoints) => {
  const result = [];
  const breakValues = Object.keys(breakPoints).sort();
  let i;
  for (i=0; i < breakValues.length; i++) {
    const breakValue = breakValues[i];
    const breakName = breakPoints[breakValue];
    if (i !== 0) {
      result.push(breakName + "-or-over");
    }
    if (width <= breakValue) {
      result.push(breakName);
      break;
    }
  }
  for (i; i < breakValues.length; i++) {
    if (i !== 0) {
      const breakValue = breakValues[i];
      const breakName = breakPoints[breakValue];
      result.push(breakName + "-or-under");
    }
  }
  return result;
}


export default breakpoints => Node => {

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
      return (
        <Container innerRef={this.handleRef}>
          <Node {...props} sizes={sizes}/>
        </Container>
      )
    }
  }
  return Breakpoint;
}