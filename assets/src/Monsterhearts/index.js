import { useSize } from "common/withSize";

import React, { Component, useState, useEffect } from "react";
import { string, number, func, bool, arrayOf } from "prop-types";
import rx from "resplendence";
import TabPicker from "./TabPicker";
import Chatbox from "./Chatbox";
import Spinner from "common/components/Spinner";
import SocketManager from "Socket";

import { useMonsterhearts, useSocket, useAuth } from "store";
import { useApiEffect } from "common/useApi";
import { useNavigator } from "Routing";

rx`
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`;

const Container = rx("div")`
  background: $background;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ::-webkit-scrollbar-thumb {
    background: darken($foreground, 50%);
    &:hover {
      background: darken($foreground, 40%);
    }
  }
`;
const Content = rx("div")`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  box-sizing: border-box;
  z-index: 1;
  &.overlay {
    padding-top: 36px;
  }
`;

const Monsterhearts = ({ depth }) => {
  const [
    { isLoaded, myCharacters, characterIds },
    { resolveLoad }
  ] = useMonsterhearts();
  const [{ isConnected }, { loadEvents }] = useSocket();
  const [ref, sizes] = useSize({ 1023: "mobile" });
  const { fullPath, next, goTo } = useNavigator(depth);

  useApiEffect(
    `games/${fullPath[1]}/load`,
    data => {
      resolveLoad(data);
      loadEvents({ ids: data.eventIds, byId: data.eventsById });
    },
    console.error
  );

  const test = 31;

  useEffect(() => {
    if (isLoaded && isConnected) {
      if (
        !next ||
        (next !== "side" &&
          next !== "new" &&
          next !== "settings" &&
          !characterIds.includes(parseInt(next, 10)))
      ) {
        if (myCharacters.length) {
          goTo(myCharacters[0]);
        } else {
          goTo("new");
        }
      }
    }
  });

  const overlay = sizes.includes("mobile");
  return (
    <Container innerRef={ref}>
      {isLoaded ? <SocketManager /> : null}
      {isLoaded && isConnected ? (
        <Content rx={{ overlay }}>
          <TabPicker depth={depth} />
          <Chatbox overlay={overlay} />
        </Content>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};
Monsterhearts.propTypes = {
  depth: number.isRequired
};

export default Monsterhearts;
