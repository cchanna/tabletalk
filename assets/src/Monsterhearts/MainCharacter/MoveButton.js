import rx from 'resplendence'

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Button = rx('button')`
  @include button-style;
  display: block;
  position: absolute;
  top: calc(50% - 30px);
  left: -40px;
  font-family: "icomoon";
`

export default Button;