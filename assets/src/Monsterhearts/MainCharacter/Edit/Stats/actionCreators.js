import serverActionCreator from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_STATS_SET
} from 'common/actions';

export const setStats = serverActionCreator(MONSTERHEARTS_CHARACTER_STATS_SET, "id", "hot", "cold", "volatile", "dark")