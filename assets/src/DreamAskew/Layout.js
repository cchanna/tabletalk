import rx from 'resplendence'
rx`
@import '~DreamAskew/styles';
@mixin top-button {
  @include button-style;
  margin-top: 12px;
  margin-left: 15px;
}
`

export const Container = rx('div')`
  padding: 10px;
`
export const Name = rx('div')`
  font-size: 50px;
  font-family: $header;
  line-height: 1;
  padding: 10px 10px 0 10px;
`
export const Description = rx('div')`
  margin-top: 10px;
`
export const Choices = rx('span')`
  max-width: 400px;
`
export const Choice = rx('span')`
  color: $accent2;
  font-weight: bold;
`
export const Header = rx('h1')`
  font-family: $header;
  font-size: 20px;
  line-height: 1.1;
  margin-top: 15px;
  margin-bottom: 0;
`
export const Questions = rx('div')`
  margin-top: 10px;
`
export const Question = rx('div')`
  font-style: italic;
  padding: 1px 0;
`
export const List = rx('ul')`
  margin: 0 0 0 23px;
  padding: 0;
`
export const Item = rx('li')`
  padding: 1px 0;
`
export const Paragraph = rx('p')`
  margin: 0;
  + p {
    margin-top: 10px;
  }
`
export const Columns = rx('div')`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
`
export const Block = rx('div')`
  flex: 1 0 350px;
  max-width: 450px;
  padding: 0 10px 10px 10px;
`
export const NotesBlock = rx('div')`
  max-width: 600px;
  padding: 10px;
`
export const MovesHeader = rx('div')`
  margin-top: 10px;
  font-family: $header;
  font-size: 20px;
`
export const MovesAction = rx('span')`
  font-family: $header;
  font-style: italic;
  padding: 0 0 0 30px;
  position: relative;
  top: -2px;
  opacity: .5;
  font-size: 14px;
`
export const MovesContainer = rx('div')`
  margin-bottom: 10px;
`
export const Lore = rx('div')`
  padding: 10px;
  font-style: italic;
  max-width: 600px;
`
export const Top = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
export const EditButton = rx('button')`
  @include button-style;
  margin-top: 12px;
  margin-left: 15px;
  font-family: icomoon;
  background: transparent;
  color: $accent1;
  &:hover, &:focus, &:active {
    color: $background;
  }
  &:hover, &:focus {
    background: $accent1;
  }
  &:active {
    background: $accent1_light;
  }
  &.selected {
    background: $accent2;
    color: $background;
    &:hover, &:focus {
      background: fade-out($accent2, .5);
    }
    &:active {
      background: fade-out($accent2, .75);
    }
  }
`

export const TopButton = rx('button')`
  @include top-button;
  background: $accent2;
  color: $background;
  &:hover, &:focus {
    background: fade-out($accent2, .5);
  }
  &:active {
    background: fade-out($accent2, .75);
  }
`

export const TopButtonBlue = rx('button')`
  @include top-button;
  background: $accent1;
  color: $background;
  &:hover, &:focus {
    background: $accent1_light;
  }
  &:active {
    background: fade-out($accent1_light, .5);
  }
`


export const list = items => items.reduce((result, item, i) => (i === 0 ? "" : result + ", ") + item.replace(" ", '\xa0'));

export const listWithAnd = (visuals, capitalize = false) => {
  const first = capitalize ? visuals[0][0].toUpperCase() + visuals[0].slice(1) : visuals[0];
  if (visuals.length === 0) return null;
  if (visuals.length === 1) return first + ".";
  if (visuals.length === 2) return `${first} and ${visuals[1]}.`;
  return visuals
    .map((v, i) => i === 0 ? (first + ", ") : (
      (i === visuals.length - 1) ? ("and " + v) : (v + ", ") 
    ))
    .join("");
}
