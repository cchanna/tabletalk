import actionCreator from "utils/actionCreator";

import {
  MONSTERHEARTS_CHATBOX_SET_COLLAPSED,
  MONSTERHEARTS_LOAD
} from "common/actions";

import * as api from './api';

const resolveLoad = actionCreator(
  MONSTERHEARTS_LOAD, 
  "players", "playersById", "chats", "chatsById", "me",
  "characters", "charactersById", "definitions", "stringsById", "strings", "movesById"
);



export const load = () => (dispatch, getState) => {
  const { path, auth } = getState();
  api.load(path[1], auth.jwt)
    .then(data => {
      dispatch(resolveLoad(data));
    })
  .catch(err => {
    console.error(err);
  })

  /*

  const mockData = {
    chats: [1, 6, 3, 2, 7, 5, 4],
    chatsById: {
      1: {
        playerId: 58,
        date: new Date(),
        talk: {
          message: "Hello!",
          isLog: false
        },
      },
      2: {
        playerId: 58,
        date: new Date(),
        roll: {
          dice: [2, 5],
          bonus: 1
        }
      },
      7: {
        playerId: 58,
        date: new Date(),
        roll: {
          dice: [6, 6],
          bonus: -1
        }
      },
      6: {
        playerId: 58,
        date: new Date(),
        talk: {
          message: `
            Lorem ipsum dolor sit amet, ius in odio albucius, mei adhuc quodsi causae et, possim inciderint et his. Ad accumsan conceptam constituto duo. Hinc euripidis vim at, tantas pertinax per eu, cu magna luptatum est. Ad per accusam voluptatum.
            Eum graecis constituam in, cu nostrud percipitur honestatis mel, usu an putant labores dolorum. In eum malis repudiare, scripta voluptatibus ea vel. Atqui sensibus ea vim. Ius ex postulant sadipscing. His omnis explicari salutatus at, at quot integre legendos nam, fabellas conceptam definiebas eu ius. Eros mucius putant vim eu, ad latine facilisi per. Consul propriae honestatis in ius.
          `,
          isLog: false
        },
      },
      3: {
        playerId: 58,
        date: new Date(),
        talk: {
          message: "{player:58} set {character:12}'s hot to 2",
          isLog: true
        }
      },
      5: {
        playerId: 77,
        date: new Date(),
        talk: {
          message: "Does this work?",
          isLog: false
        }
      },
      4: {
        playerId: 58,
        date: new Date(),
        roll: {
          dice: [1, 2],
          bonus: 3
        }
      }
    },
    players: [58, 77],
    playersById: {
      58: {
        name: "strangerelics",
        isGM: false
      },
      77: {
        name: "Amy",
        isGM: false
      }
    },
    me: 58,
    definitions: {
      movesByName: {
        "True Love": {
          text: `
            You always have exactly one 
            Lover. The first is chosen during
            Your Backstory. If you ever fall in
            love with someone else instead,
            give them a String and they
            become your new Lover. You
            always carry 1 forward to earning
            your Lover’s heart or fancy
          `,
          notes: true
        },
        "Excuses Are My Armour": {
          text: `
            When you ignore some blatant
            problem with your Lover or how
            they treat you, mark experience.
          `,
          notes: false
        },
        "Entrenched": {
          text: `
            If you and another character have
            a combined total of 5 or more
            Strings on one another, gain 1 to
            all rolls against them.
          `,
          notes: false
        },
        "Mess With Me, Mess With Him": {
          text: `
            When using your Lover’s name as
            a threat, add 2 to your roll to _Shut
            Someone Down_ or _Keep Your Cool_.
            Your Lover gains a String on you
          `,
          notes: false
        },
        "Sympathy is My Weapon": {
          text: `
            Every time you forgive someone
            for hurting you, and excuse their
            base nature, gain a String on them.
          `,
          notes: false
        },
        "Downward Spiral": {
          text: `
            When you _Gaze Into the Abyss_, you
            may cause yourself 1 Harm. If you
            do, add 2 to your roll.
          `,
          notes: false
        },
        "Down the Rabbit Hole": {
          text: `
            When you go poking your nose in
            affairs not meant for your kind,
            someone involved in the situation
            gains a String on you, and you
            mark experience.
          `,
          notes: false
        }
      },
      advancementsById: {
        "+stat": {
          text: "Add +1 to one of your stats."
        },
        "self move": {
          text: "Take another {playbook} move."
        },
        "any move": {
          text: "Take a move from any Skin."
        }
      },
      playbooks: ["Fae", "Ghost", "Ghoul", "Hollow", "Infernal", "Mortal", "Queen", "Vampire", "Werewolf"],
      playbooksByName: {
        "Fae": {
          moves: []
        },
        "Ghost": {
          moves: []
        },
        "Ghoul": {
          moves: []
        },
        "Hollow": {
          moves: []
        },
        "Infernal": {
          moves: []
        },
        "Queen": {
          moves: []
        },
        "Vampire": {
          moves: []
        },
        "Werewolf": {
          moves: []
        },
        "Mortal": {
          sexMove: `
            When you have sex with someone, it awakens something
            sinister within. The next time you take your eyes off them,
            they become their Darkest Self.
          `,
          names: ["Anne", "Carla", "Deirdre","James", "Jonathan", "Laeli", "Patrick","Robin", "Shen", "Timothy", "Wendy"],
          looks: ["quiet", "desperate", "awkward","beautiful", "displaced"],
          eyesList: ["doe eyes", "sad eyes", "darting eyes", "nervous eyes", "human eyes"],
          origins: ["new kid in town", "kid next door", "your barista", "someone’s girlfriend", "someone’s boyfriend", "nobody"],
          backstory: [
            "Declare your backstory last.",
            "Choose one person to be your Lover. Give them three Strings on you. Take one string on them."
          ],
          darkestSelf: `
            Nobody understands you. Nobody
            even tries. You do so much for
            the people you love, and they
            walk all over you. Enough is
            enough! Betray them. Show them
            what its like to be uncared for.
            Reveal their monstrosity and
            yours. Only seeing the pain that
            you’re causing your Lover will let
            you escape your Darkest Self.
          `,
          advice: `
            Vulnerable, magnetic, and beautiful. For anybody else,
            giving away a String would represent a loss of control.
            For you, it’s more symbiotic - you get power by giving
            it away. The Mortal explores co-dependency, power
            imbalances, and wide-eyed eagerness.
  
            The two stat choices for the Mortal both have Hot 2,
            because the Mortal is desirable and special. They differ
            depending on whether the Mortal is more impulsive
            and panicky (Volatile 1) or brooding and lonely (Dark 1).
            
            True Love is about who you’ve currently placed at the
            center of your universe. You don’t necessarily need to
            be in a relationship with someone to declare them your
            Lover.
  
            Your Sex Move might seem like a major drawback, but
            remember that the Mortal can gain a lot of leverage
            from victimhood. Having lovers suddenly get weird,
            scary, or hostile after a moment of intimacy gives you
            a perfect opportunity to take advantage of moves like
            Sympathy Is My Weapon, Excuses Are My Armour, and
            Down the Rabbit Hole.
          `,
          flavour: `
            None of them would understand. What you have here, in this dark and
            secret place, it’s beautiful. They’d warn you that this sort of beauty is
            dangerous, like a raging fire. Well some things are worth getting burned for.
            
            Love has eclipsed all hope, and the dark has left you feeling beautiful.
          `,
          stats: [[2, -1, -1, 1], [2, -1, 1, -1]],
          advancements: ["+stat", "self move", "self move", "any move", "any move", "any move"],
          moves: [
            "True Love", "Mess With Me, Mess With Him", "Entrenched", "Sympathy is My Weapon",
            "Excuses Are My Armour", "Downward Spiral", "Down the Rabbit Hole"
          ],
          startingMoves: [
            "True Love"
          ],
          startingMoveChoices: 2
        }
      }
    },
    stringsById: {
      7: {
        from: 12,
        to: 1004,
        value: 2
      },
      12: {
        from: 1004,
        to: 13,
        value: 7
      },
      102: {
        from: 1004,
        to: 1992,
        value: 1
      }
    },
    strings: [7, 102, 12],
    charactersById: {
      12: {
        name: "Claire",
        notes: "notes notes notes",
        conditions: ["moody", "naive"],
        mainCharacter: {
          playerId: 58,
          playbook: "Mortal",
          harm: 1,
          experience: 3,
          hot: 2,
          cold: 0,
          volatile: -1,
          dark: 1,
          eyes: "sad eyes",
          look: "quiet",
          origin: "your barista",
          advancements: ["+stat"],
          moves: ["True Love", "Entrenched", "Excuses Are My Armour"],
          moveNotesByName: {
            "True Love": "Amy"
          }
        }
      },
      13: {
        name: "Test",
        notes: "",
        conditions: [],
        mainCharacter: {
          playerId: 59,
          playbook: "Mortal",
          harm: 3,
          experience: 2,
          hot: 1,
          cold: 2,
          volatile: 1,
          dark: 3,
          eyes: "eyes",
          look: "look",
          origin: "origin",
          advancements: [],
          moves: ["True Love", "Entrenched", "Excuses Are My Armour"],
          moveNotesByName: {
            "True Love": "Hello"
          }
        } 
      },
      1004: {
        name: "Lexa",
        notes: "hello!",
        conditions: ["slutty"],
        mainCharacter: null,
      }, 
      1992: {
        name: "Sampson",
        notes: "more notes hooray",
        conditions: [],
        mainCharacter: {
          playerId: 77,
          playbook: "Hollow",
          harm: 3,
          experience: 0,
          hot: -1,
          cold: -1,
          volatile: 2,
          dark: 1,
          eyes: "vacant eyes",
          look: "disheveled",
          origin: "machine",
          advancements: ["self move"],
          moves: ["Better Than Nothing", "Fake", "A Blank Canvas"],
          moveNotesByName: {}
        }
      }
    },
    characters: [12, 13, 1004, 1992]
  } 
  dispatch(resolveLoad(mockData));
  */
  
}

