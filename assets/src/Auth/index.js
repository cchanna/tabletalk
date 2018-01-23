import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import rx from 'resplendence';
import withSize from 'common/withSize';

rx`
@import "~common/styles";
@import "~common/colors";
`

const Container = rx('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Card = rx('div')`
  @include card;
  padding: 40px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 800px;
  &.narrow {
    max-width: none;
    width: 100%;
    padding: 10px;
  }
`

const Title = rx('div')`
  font-family: "Marvin Visions";
  color: $link-hover;
  text-shadow: -1px 1px 2px rgba(0, 0, 0, .3);
  font-size: 160px;
  margin: 10px 0;
  text-align: center;
  &.small {
    font-size: 100px;
  }
  &.narrow {
    font-size: 70px;
  }
`

const Status = rx('div')`
  font-family: "League Spartan";
  color: $color-dark;
  font-size: 40px;
  margin: 10px 0;
  text-align: center;
`

const GoogleLoginButton = ({className}) => <div className={`g-signin2 ${className}`} data-onsuccess="onSignIn" data-uxmode="redirect"/>;

class Auth extends React.Component {
  componentDidMount() {
    console.log(window.gapi);
    // window.gapi.auth2.init({
    //   ux_mode: "redirect"
    // })
  }
  render() {
    const {loggingIn, loginError, sizes } = this.props;
    let status = null;
    if (loggingIn) status = <Status>....logging in</Status>
    else if (loginError) status = <Status>failed!</Status>
    return (
      <Container>
        <Card rx={sizes}>
          <Title rx={sizes}>Tabletalk</Title>
          {status}
          <GoogleLoginButton/>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = ({auth}, {size}) => {
  return {
    loggingIn: auth.pending,
    loginError: auth.error,
    size
  }
}

export default compose(
  connect(mapStateToProps, {}),
  withSize({525: "narrow", 768: "small"})
)(Auth);
