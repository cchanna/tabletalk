import rx from 'resplendence'
  
rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

export const Instructions = rx('div')`
  font-family: $body;
  color: darken($foreground, 10%);
  font-style: italic;
  font-size: 16px;
`