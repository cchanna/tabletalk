import React from "react";
import rx from "resplendence";
import {
  string,
  bool,
  object,
  instanceOf,
  arrayOf,
  func,
  number,
  shape
} from "prop-types";

import GameInfo from "./GameInfo";
import GameListItem from "./GameListItem";
import NewGameForm from "./NewGameForm";
import Spinner from "common/components/Spinner";

import expired from "utils/expired";

rx`
@import "~common/styles";
@import "~common/colors";
`;

const Container = rx("div")`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Body = rx("div")`
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 800px;
  padding: 40px 40px 0px 40px;
  display: flex;
  flex-flow: column;
  &.under-max {
    padding: 0;
  }
`;

const Title = rx("div")`
  @include card;
  background: $card-background-dark;
  color: $color-light;
  font-family: "Marvin Visions";
  font-size: 80px;
  margin: 10px 0;
  position: relative;
  text-align: center;
  &.under-max {
    margin: 0;
    padding: 12px 0 0 0;
  }
  &.narrow {
    font-size: 75px;
  }
  &.tiny {
    font-size: 55px;
  }
`;

const ReturnButton = rx("button")`
  @include button;
  font-family: "Icomoon";
  position: absolute;
  display: block;
  top: 25px;
  left: 10px;
  color: $color-light;
  text-shadow: -1px 1px 1px hsla(0, 0%, 0%, 0.1);
  font-size: 40px;
  transform-properties: color, font-size, top, left;
  transform-duration: 0.15s;
  &:hover, &:focus {
    top: 22px;
    left: 7px;
    color: $link-hover;
    font-size: 46px;
  }
  &.narrow {
    top: 40px;
  }
`;

const GAMES_LIST = rx()`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  padding: 20px;
  overflow-y: scroll;
  flex: 1 0 0;

  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    $background: fade-out($color-dark, 0.5);
    background-color: $background;
    background-clip: padding-box;
    border-radius: 5px;
    box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, 0.1);
    &:hover {
      background-color: lighten($background, 2%);
    }
    &:active {
      background-color: lighten($background, 4%);
    }
  }
`;

const NewGame = rx("button")`
  @include button;
  font-family: "League Spartan";
  color: $color-light;
  display: block;
  font-size: 30px;
  margin: 20px 0;
  text-shadow: -2px 2px 1px rgba(0, 0, 0, .4);
  transition-properties: color, text-shadow, font-size, left, top;
  transition-duration: 0.15s;
  position: relative;
  top: 0;
  left: 0;
  &:hover, &:focus {
    text-shadow: -2px 2px 2px rgba(0, 0, 0, .4);
    color: $link-hover;
    font-size: 32px;
    top: -1px;
    left: -1px;
  }
`;

class Games extends React.Component {
  static propTypes = {
    depth: number.isRequired,
    slug: string,
    games: arrayOf(
      shape({
        name: string.isRequired,
        slug: string.isRequired
      })
    ),

    isCurrentGameLoaded: bool.isRequired,
    isFailed: bool.isRequired,
    lastLoaded: instanceOf(Date),
    sizes: arrayOf(string).isRequired,

    getGame: func.isRequired,
    getGames: func.isRequired,
    goTo: func.isRequired,
    openGame: func.isRequired,
    openNewGame: func.isRequired
  };

  route = () => {
    const { slug, isCurrentGameLoaded, getGame } = this.props;
    if (slug !== null) {
      if (slug !== "new" && !isCurrentGameLoaded) {
        // TODO need to disallow "new" as slug
        getGame({ slug });
      }
    } else {
      const { isFailed, lastLoaded, getGames } = this.props;
      if (!isFailed && expired(lastLoaded, 10)) {
        console.log("get games?");
        getGames();
      }
    }
  };
  componentDidMount = () => this.route();
  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      this.route();
    }
  }
  return = () => {
    const { goTo, depth } = this.props;
    goTo([], depth);
  };

  render() {
    const {
      slug,
      isCurrentGameLoaded,
      games,
      lastLoaded,
      isFailed,
      sizes
    } = this.props;
    let content;
    let returnButton;
    console.log(lastLoaded);
    if (isFailed) {
      content = "Failed!";
    } else if (!lastLoaded && !isCurrentGameLoaded) {
      console.log("show spinner");
      content = <Spinner />;
    } else if (!isCurrentGameLoaded) {
      const { openGame, openNewGame } = this.props;
      content = (
        <div className={GAMES_LIST}>
          {games.map(({ slug, name }) => (
            <GameListItem key={slug} {...{ slug, name, openGame, sizes }} />
          ))}
          <NewGame onClick={openNewGame}>New Game</NewGame>
        </div>
      );
    } else {
      returnButton = (
        <ReturnButton onClick={this.return} rx={sizes}>
          {"<"}
        </ReturnButton>
      );

      if (slug === "new") {
        content = <NewGameForm />;
      } else {
        content = <GameInfo {...{ sizes, slug }} />;
      }
    }

    return (
      <Container>
        <Body rx={sizes}>
          <Title rx={sizes}>
            {returnButton}
            TableTalk
          </Title>
          {content}
        </Body>
      </Container>
    );
  }
}

export default Games;
