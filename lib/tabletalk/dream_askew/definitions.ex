# / ([a-z][a-zA-Z é\-?“”.’+]+?)(,|\n|,\n)/ "$1"$2/


defmodule Tabletalk.DreamAskew.Definitions do
  def roles_by_name do
    %{
      "Iris" => %{
        names:  [
          "Shadow", "Lively", "Smith", "Pallor", "Azure", "Damson", "Raksha",
          "Kite", "Monsoon", "Micaela", "Burroughs", "Tion", "Pity", "Brace"
        ],
        looks1: [
          "slim frame", "angular frame", "disfigured frame",
          "soft frame", "steely frame", "willowy frame"
        ],
        look1Plural: false,
        looks2: [
          "calculating eyes", "dead eyes", "wet eyes", "arresting eyes",
          "caring eyes", "pale eyes", "luminous eyes", "ruined eyes"
        ],
        look2Plural: true,
        genders: [
          "androgyne", "emerging", "ice femme", "void", "gargoyle"
        ],
        wardrobeStyles: [
          "formal attire", "leather", "casual wear", "ceremonial garb",
          "medical wear", "bondage gear", "hoods and robes",
          "a slender weapon carefully concealed", "a bronze censer"
        ],
        choice1: %{
          command: "Choose 2 Psychic Gifts",
          statement: "My psychic gifts are {0} and {1}.",
          count: 2,
          short: true,
          options: [
            "Shared Dreams", "Memory Harvesting", "Lucky Guesses",
            "Ghost Echoes", "Unearthing", "Astral Travel", "Absolution",
            "Brain Whispers", "Fortune Telling", "Storm Sheltering"
          ],
        },
        choice2: %{
          command: "Decide What the World's Psychic Maelstrom Told You",
          statement: "The world's psychic maelstrom told me {0}.",
          count: 1,
          short: false,
          options: [
            "that it needed me for a higher purpose",
            "that it would shelter me from any repercussions",
            "that I could swallow their pain away",
            "how and when I would die",
            "that love is the only salvation",
            "that power is the only salvation"
          ]
        },
        keyRelationships: [
          "the slowly-dying drag mama whose pain I ease",
          "our recently-exiled elder",
          "the weird-eater I created",
          "a wasteland mercenary who makes use of my talents",
          "the weepy trans girl whose past I’m erasing",
          "an impure soul I monitor carefully",
          "my submissive"
        ],
        askLeft: [
          "What secret did I learn about you yesterday?",
          "How have I unsettled you in recent days?"
        ],
        myLure: "Whenever someone invites you to use your psychic gifts on them, they gain a token.",
        theirLure: "When you invite {name} to use {their} psychic gifts on you, gain a token.",
        lore: """
          The psychic maelstrom touches us all, but the Iris has
          been indelibly marked and changed. Their gifts are
          unprecedented and inexplainable, but may hold the
          secret to our healing. What is everyone so afraid of?
        """,
        description: """
          The Iris is an unnerving individual. Their power is
          mysterious, ephemeral, and unprecedented.
        """,
        playToFindOut: [
          "Are you calculating, rash, or opportunistic?",
          "Do your psychic gifts help or hurt your community?",
          "Is your heart pure?"
        ],
        tips: [
          "Find people in their moments of weakness or need, and offer them your strange gifts.",
          "Explore deviance, difference, and vulnerability.",
          "Make your character fallible and relatable."
        ],
        strongMoves: [
          "Get out of harm’s way.",
          "Move unseen.",
          "Use your psychic gifts with artful precision.",
          "Restrain someone, physically or psychically.",
          "Abruptly call forth the world’s psychic maelstrom.",
        ],
        strongQuestions: [
          "Ask “What does your character secretly desire right now?”",
          "Ask “What does your character wish I would do next?”"
        ],
        regularMoves: [
          "Take action, leaving yourself vulnerable.",
          "Stare into someone’s eyes without blinking.",
          "Quietly gather clues or information.",
          "Open your brain to the world’s psychic maelstrom.",
          "Use your psychic gifts with unexpected side effects"
        ],
        regularQuestions: [
          "Ask “What should I be on the lookout for?”",
          "Ask “Is your character telling the truth?”"
        ],
        weakMoves: [
          "Draw unwanted attention to your movements.",
          "Experience psychic flashbacks.",
          "Lend someone your signature weapon.",
          "Temporarily lose control of your psychic abilities.",
          "Cave to someone else’s desires."
        ],
        weakQuestions: [
          "Ask “What makes me vulnerable in this situation?”"
        ]
      },
      "Hawker" => %{
        names:  [
          "Angler", "Cookie", "Devraj", "Chief", "Jackbird", "Sugar", "Esme",
          "Proper", "Proust", "Lafferty", "Waters", "Fancy", "Zachariah", "Zola"
        ],
        looks1: [
          "pinched face", "warm face", "tired face", "honest face",
          "scarred-up face", "friendly face", "flawless face"
        ],
        look1Plural: false,
        looks2: [
          "quick hands", "precise hands", "tattooed hands",
          "calloused hands", "slight hands", "fresh manicure"
        ],
        look2Plural: true,
        genders: [
          "high femme", "genderfluid", "dagger daddy", "stud", "raven"
        ],
        wardrobeStyles: [
          "immaculate whites", "a stained apron", "vintage formal",
          "leather", "gold chains", "street wear", "scrounge-ups",
          "a signature colour", "flawless makeup", "stilettos"
        ],
        choice1: %{
          command: "Choose 3 Things You Provide",
          statement: "I provide {0}, {1}, and {2}.",
          count: 3,
          short: true,
          options: [
            "a venue", "easy food", "luxury food", "liquor", "coffee", "fantasy",
            "nostalgia", "surveillance", "companionship", "enforcement",
            "deliveries", "body-guarding", "expertise", "guns and ammo",
            "art", "a thriving social scene", "lodgings", "tobacco", "smut",
            "hard drugs", "whatever people are chasing at the time"
          ],
        },
        choice2: %{
          command: "Choose 2 Desired Currencies",
          statement: "My desired currencies are {0} and {1}.",
          count: 2,
          short: true,
          options: [
            "cash up front", "lingering debts", "whispered secrets",
            "protection", "dependency", "barter", "work-trade",
            "fawning adoration", "something weirder"
          ]
        },
        keyRelationships: [
          "the old queen I drove out of business", "my kids",
          "the wasteland salvager who brings in what I need",
          "my ingénue assistant", "the pissy killjoy next door",
          "the society types who come here to slum it",
          "the loan-shark who finally tracked me down"
        ],
        askLeft: [
          "What do I regularly hook you up with?",
          "Why have I been sizing you up recently?",
          "How are you integral to my supply line?"
        ],
        myLure: "Whenever someone offers you a new gig, or gets hooked on your supply, they gain a token.",
        theirLure: "When you offer {name} a new gig, or get hooked on {their} supply, gain a token.",
        lore: """
          The market failed. The shops and restaurants and
          factories closed their doors. And into that void stepped
          the Hawker, hustling and working odd jobs and
          pulling a livelihood out of the rubble of apocalypse.
        """,
        description: """
          The Hawker is an industrious individual.
          Their power is material, social, and contingent.
        """,
        playToFindOut: [
          "How do you stay in business amidst all this chaos?",
          "Who do you prioritize when resources get scarce?",
          "Are you a provider or a gatekeeper?"
        ],
        tips: [
         " Look for opportunities to provide for others, but also to hustle your wares.",
          "Foolishly overextend yourself from time to time.",
          "Make your character fallible and relatable."
        ],
        strongMoves: [
          "Get out of harm’s way.",
          "Bring out supplies that no one knew you had.",
          "Draw a weapon before anyone can react.",
          "Lace something with undetectable poison.",
          "Call in a timely favour from a powerful friend."
        ],
        strongQuestions: [
          "Ask “How could I put your character at ease?”",
          "Ask “What does your character have that I might want?”"
        ],
        regularMoves: [
          "Take action, leaving yourself vulnerable.",
          "Deal with a routine and uneventful job.",
          "Cave to someone’s demands.",
          "Lie fairly convincingly.",
          "Bolt for the nearest exit."

        ],
        regularQuestions: [
          "Ask “What does your character need right now?”"
        ],
        weakMoves: [
          "Get caught lying, cheating, or sneaking.",
          "Lose track of something very important.",
          "Walk into a situation unarmed and unprepared.",
          "Accidentally open your brain to the world’s psychic maelstrom.",
          "Beg for mercy."
        ],
        weakQuestions: [
          "Ask “How have I earned your character’s ire?”"
        ]
      },
      "Stitcher" => %{
        names:  [
          "Nils", "Tai", "Spector", "Lemieux", "Dremmer", "Sander", "Spook",
          "Grip", "Corey", "Robyn", "Depot", "Jane", "Garon", "Aiden", "Knots"
        ],
        looks1: [
          "knowing eyes", "appraising eyes", "skittish eyes",
          "covered eyes", "modified eyes", "red eyes"
        ],
        look1Plural: false,
        looks2: [
          "scarred hands", "clean hands", "greasy hands", "gloved hands", 
          "worn hands", "busy hands"
        ],
        look2Plural: true,
        genders: [
          "bigender", "agender", "cyber dyke", "transgressing", "raven"
        ],
        wardrobeStyles: [
          "scrounge-ups", "duck canvas", "fucked-up hair", "oil stains",
          "countless pockets", "a repurposed uniform", "visible tech",
          "scrubs", "overalls", "minimalist chic", "symbiotes "
        ],
        choice1: %{
          command: "Choose 2 Workshop Functions",
          statement: "My workshop functions are {0} and {1}",
          count: 2,
          short: true,
          options: [
            "vehicle repair", "bicycle repair", "an art space", "an infirmary",
            "firearms", "tech assembly", "hydroponics", "broadcasting",
            "brewing + preserving", "body upkeep", "metalworking",
            "hacking", "recycling", "psionics", "chemistry", "woodworking"
          ],
        },
        choice2: %{
          command: "Decide Where You Get The Bulk of Your Supplies",
          statement: "To get the bulk of my supplies, {0}",
          count: 1,
          short: false,
          options: [
            "I scavenge ruined buildings in abandoned districts.",
            "I barter with those still living in the society intact.",
            "people bring me the weirdest shit.",
            "I take apart the old to furnish the new.",
            "I have access to a partially-excavated landfill.",
            "I steal what I need. "
          ]
        },
        keyRelationships: [
          "twin apprentices", "a ghost who haunts my workspace",
          "the beautiful boy who makes me trip up my words",
          "the black marketeer to whom I owe a small fortune",
          "the void kid who needs my maintenance to stay alive",
          "my terminally-ill lover", "my sobriety circle"
        ],
        askLeft: [
          "What broken thing do you have that I could fix?",
          "What did I lend to you recently?"
        ],
        myLure: "Whenever someone comes to you with something precious that needs fixing, they gain a token.",
        theirLure: "When you come to {name} with something precious that needs fixing, gain a token.",
        lore: """
          Things break. Supplies run out. Bodies get wounded.
          The Stitcher is there - fixing, mending, making,
          re-purposing. They have a workshop and an
          uncanny intuition. 
        """,
        description: """
          The Stitcher is a resourceful individual.
          Their power is technical, material, and reactive. 
        """,
        playToFindOut: [
          "Where does your meticulous focus come from?",
          "Do you ever try to fix things that aren’t broken?",
          "Does your life have balance?"
        ],
        tips: [
          "Establish meaningful, personal relationships with your tools, supplies, and workshop ephemera.",
          "Involve fellow players in brainstorming interesting risks or complications when you tinker with things.",
          "Make your character fallible and relatable."
        ],
        strongMoves: [
          "Get out of harm’s way.",
          "Ease somebody’s pain.",
          "Have everything required to fix or make a thing right away with no compromises or sacrifices.",
          "Jury-rig a temporary solution while under duress.",
          "Decipher the hidden logic of a troubling situation."
        ],
        strongQuestions: [
          "Ask “What supplies does your character have that I need?”"
        ],
        regularMoves: [
          "Take action, leaving yourself vulnerable.",
          "Fix or make something, partially or shoddily.",
          "Open your brain to the world’s psychic maelstrom.",
          "Head out to scavenge or barter for supplies.",
          "Appeal to justice and reason."
        ],
        regularQuestions: [
          "Ask “What does your character have that needs fixing?”",
          "While your character holds an object, ask “What powerful emotion has this recently absorbed?”"
        ],
        weakMoves: [
          "Take apart something crucial to repurpose its parts.",
          "Tinker with an object, leaving it volatile or broken.",
          "Isolate yourself to work on a secret personal project.",
          "Treat someone like a project instead of a person."
        ],
        weakQuestions: [
          "Ask “What has your character lost forever?”"
        ]
      },
      "Tiger" => %{
        names:  [
          "Domino", "Tyrus", "Blues", "Keegan", "Smith", "Duke", "Tawny",
          "Cheshire", "Vigo", "Boston", "Impala", "Diesel", "Mia", "Aadita"
        ],
        looks1: [
          "scarred face", "baby face", "pretty face", "weathered face",
          "tattooed face", "masked face", "tough face", "narrow face"
        ],
        look1Plural: false,
        looks2: [
          "slender arms", "burned arms", "jacked arms", "solid arms",
          "tattooed arms", "shot-up arms", "a busted arm"
        ],
        look2Plural: true,
        genders: [
          "hard femme", "butch queen", "two-spirit", "masc", "gargoyle"
        ],
        wardrobeStyles: [
          "leather", "velour", "scrounge-ups", "militant wear", "armour",
          "tailored suits", "breathable athletics", "flashy acquisitions",
          "a gang logo back patch", "neon hair", "black bloc attire"
        ],
        choice1: %{
          command: "Choose 2 Gang Trappings",
          statement: "My gang has {0} and {1}.",
          count: 2,
          short: true,
          options: [
            "motorcycles", "bicycles", "guns", "riot gear", "a safehouse",
            "medical supplies", "clean drugs", "chains + rusty pipes",
            "slingshots + baseball bats", "megaphones + banners"
          ],
        },
        choice2: %{
          command: "Decide Your Gang's Big Flaw",
          statement: "Unfortunately, {0}",
          count: 1,
          short: false,
          options: [
            "we owe a lot of debts that we can’t pay.",
            "since that unsettling murder, I’ve lost some trust.",
            "the enclave isn’t entirely on board with our vision.",
            "the gang is addicted to something dangerous.",
            "our actions bleed psychic instability into the area.",
            "the gang is agitating to become an autonomous collective, but it’s not clear how to make that work."
          ],
        },
        keyRelationships: [
          "my son", "my pastor", "my hungry-for-blood sibling",
          "the wasteland biker pack I have an uneasy truce with",
          "the second-in-command who covets my title",
          "my leather daddy", "my poz support crew",
          "the aging dyke who cooks me dinner sometimes"
        ],
        askLeft: [
          "What have you recently contributed to the cause?",
          "How did I capture your attention yesterday?",
          "Why don’t you trust me?"
        ],
        myLure: "Whenever someone relies on you to solve one of their biggest problems, they gain a token.",
        theirLure: "When you rely on {name} to solve one of your biggest problems, gain a token.",
        lore: """
          The police fled the neighbourhood. Things were scary
          for a while. Now, the Tiger and their gang own the
          streets around here. Is that ownership still contested? 
        """,
        description: """
          The Tiger is a wicked fierce individual.
          Their power is social, violent, and hard-won. 
        """,
        playToFindOut: [
          "Where does your militancy stem from?",
          "Are you a guardian or a troublemaker?",
          "Do you know how to yield and make compromises?"
        ],
        tips: [
          "Explore both your kindness and your cruelness.",
          "Sometimes ask the other players about whether your gang willingly follows your commands.",
          "Make your character fallible and relatable."
        ],
        strongMoves: [
          "Get yourself or your gang out of harm’s way.",
          "Lead your gang into battle or confrontation.",
          "Say just the right thing to extinguish someone’s fear and bolster their confidence.",
          "Kill someone."
        ],
        strongQuestions: [
          "Ask “How can I get your character to do what I want?”",
          "Ask “What resources is your character making do without right now?”"
        ],
        regularMoves: [
          "Take action, leaving yourself vulnerable.",
          "Attempt to recruit someone into your service.",
          "Tenderly care for someone.",
          "Make an example of someone.",
          "Give something away."
        ],
        regularQuestions: [
          "Ask “Who’s really in control here?”",
          "Ask “How is your character vulnerable to me right now?”"
        ],
        weakMoves: [
          "Reveal your secret vulnerability to someone.",
          "Promise something you can’t possibly deliver.",
          "Get high at the worst possible moment.",
          "Trigger the memory of a past trauma."
        ],
        weakQuestions: [
          "Ask “What makes me vulnerable in this situation?”",
          "Ask “Whose motives should I second-guess right now?”"
        ]
      },
      "Torch" => %{
        names:  [
          "Hope", "Noni", "Lucia", "Dian", "Chester", "Always", "Wynn", "Cass",
          "Vase", "Eita", "Rabbit", "Rhyme", "Sibyl", "Sissy", "Mischa", "Spoke"
        ],
        looks1: [
          "calm eyes", "faraway eyes", "forgiving eyes", "mournful eyes",
          "blotted eyes", "flickering eyes", "dilated eyes", "fiery eyes"
        ],
        look1Plural: true,
        looks2: [
          "open face", "covered face", "sober face", "wrinkled face",
          "gentle face", "ashen face", "unwashed face", "marked face"
        ],
        look2Plural: false,
        genders: [
          "predestined", "transgressing", "femme", "goddess", "warrior"
        ],
        wardrobeStyles: [
          "tattered vestments", "scrounge-ups", "fetish wear", "robes",
          "beautiful fabrics", "coarse fibers", "striking colours",
          "traditional garb", "drawn sigils", "rave wear", "witch chic"
        ],
        choice1: %{
          command: "Choose 2 Rituals You Lead",
          statement: "I lead {0} and {1} rituals.",
          count: 2,
          short: true,
          options: [
            "Boiling the Bones", "Letting the Blood", "Street Wards",
            "Close Reading of the Holy Texts", "Glitter Bombing",
            "Rites of Passage", "Tea Ceremony", "Augury", "Bacchanal",
            "Tripping the Circuit", "Dirty Flutter", "Handfasting", "Truth"
          ],
        },
        choice2: %{
          command: "Decide What Looming Threat You Alone Truly Understand",
          statement: "Only I truly understand that {0}",
          count: 1,
          short: false,
          options: [
            "our souls have begun to rot inside our bodies.",
            "the psychic maelstrom sends wolves to devour us.",
            "we’re replicating the oppressions of our old society.",
            "hope and mischief are fires that we must keep ever-burning, or we will face eternal darkness.",
            "when we abandon our historical rites and bonds, evil things grow in the empty spaces left behind."
          ]
        },
        keyRelationships: [
          "the lovers I must please", "the students I must teach",
          "my chosen sisters", "the faeries who’ve taken me in",
          "a bitter ex", "the herbalist who distills my tinctures",
          "the coven I was asked to leave", "my feral muse"
        ],
        askLeft: [
          "Are you among my followers and devotees?",
          "Why did we break up?"
        ],
        myLure: "Whenever someone participates in one of your rituals for the first time, they gain a token.",
        theirLure: "When you participate in one of {name}'s rituals for the first time, gain a token.",
        lore: """
          All routines and mundane knowledges crumble under
          the weight of apocalypse. But the Torch has answers.
          Are they ancient teachings, ecstatic fantasy, or a new
          faith dawning? Followers draw near to their warm glow
        """,
        description: """
          The Torch is a compelling individual.
          Their power is spiritual, social, and mystical
        """,
        playToFindOut: [
          "Do your teachings offer the enclave a path forward?",
          "Do you know when to lead and when to listen?",
          "How do you get along with non-followers?"
        ],
        tips: [
          "Use your rituals to bring people closer together.",
          "Make yourself valued and needed.",
          "Make your character fallible and relatable.",
        ],
        strongMoves: [
          "Get out of harm’s way.",
          "Psychically summon your followers.",
          "Soothe someone’s pain or duress.",
          "Incite your followers into violent action.",
          "Enact a cunning diversion."
        ],
        strongQuestions: [
          "Ask “What is your character’s greatest fear?”",
          "Ask “Who or what does your character secretly love?”"
        ],
        regularMoves: [
          "Take action, leaving yourself vulnerable.",
          "Commence a ritual.",
          "Gather supplies.",
          "Share food or advice with someone.",
          "Open your brain to the world’s psychic maelstrom."
        ],
        regularQuestions: [
          "Ask “How could I deepen your character’s sense of belonging and purpose in this place?”"
        ],
        weakMoves: [
          "Ostracize one of your followers.",
          "Admit you don’t have the answer to someone’s question or problem.",
          "Botch a ritual, exposing yourself to risk or ridicule.",
          "Threaten someone or something far too powerful.",
          "Appeal to prophecy or cosmic forces."
        ],
        weakQuestions: [
          "Ask “What does your character think of me?”"
        ]
      },
      "Arrival" => %{
        names:  [
          "Burton", "Audi", "Yeong", "Bishop", "Deshaun", "Lark", "Rutger",
          "Kayla", "Jordan", "Tahani", "Javier", "Fai", "Maria", "Dremmer"
        ],
        looks1: [
          "tired frame", "starved frame", "sturdy frame", "plump frame",
          "muscular frame", "hunched frame", "bandaged frame"
        ],
        look1Plural: false,
        looks2: [
          "calloused hands", "polished hands", "gloved hands",
          "scabby hands", "capable hands", "trembling hands"
        ],
        look2Plural: true,
        genders: [
          "ambiguous", "transitioning", "man", "woman", "tomboy"
        ],
        wardrobeStyles: [
          "standard issue", "scrounge-ups", "rumpled suits", "scrubs",
          "hiking gear", "long sleeves", "shoplifted club clothes",
          "my old uniform", "prison jumpsuit", "bloodstains"
        ],
        choice1: %{
          command: "Decide How You Knew That The Enclave Existed",
          statement: "I knew the enclave existed because {0}",
          count: 1,
          short: false,
          options: [
            "I used to drive an armoured grocery truck through the area every week.",
            "I used to be a cop, policing the borders of society.",
            "I was a scavenger, living alone before injury forced me to seek out a bigger community.",
            "I used to come out here for the parties.",
            "my daughter has been living here for a few years."
          ],
        },
        choice2: %{
          command: "Choose 2 Things You Brought With You When You Fled",
          statement: "When I fled, I brought {0} and {1} with me.",
          count: 2,
          short: true,
          options: [
            "an old pistol", "a water purifier", "my inhaler", "a concealed knife",
            "a truck", "some photo albums", "a phone that’s still got service",
            "a holy book", "stockpiles of food", "my dog", "stolen money"
          ]
        },
        keyRelationships: [
          "the people I fled from", "the spouse I left behind",
          "the gentle soul who invited me to share their bed",
          "the twinky trans guy who has me questioning things",
          "the first person to offer me a stiff drink", "my guide"
        ],
        askLeft: [
          "Why do you wish I had never arrived?",
          "What was the first thing you noticed about me?"
        ],
        myLure: "Whenever someone gives you an opportunity to prove yourself to the community, they gain a token.",
        theirLure: "When you give {name} an opportunity to prove {themself} to the community, gain a token.",
        lore: """
          When society shoves you out, you don’t really have
          time to process. You need food, shelter, friends. The
          Arrival found their way to the enclave. Can they barter
          a measure of amnesty into a permanent home?
        """,
        description: """
          The Arrival is an individual in flux.
          Their power is contingent, technical, and suspect.
        """,
        playToFindOut: [
          "How well do you cope with stress and change?",
          "Will you ever return to the society intact?",
          "What new possibilities does the enclave offer you?"
        ],
        tips: [
          "Tell the other players the secrets of your character’s past, so they can help incorporate it into the story.",
          "Discover the enclave’s implicit social rules through earnest trial and error.",
          "Make your character fallible and relatable."
        ],
        strongMoves: [
          "Get out of harm’s way.",
          "Reveal a previously unmentioned skill.",
          "Work hard and get the job done.",
          "Eavesdrop undetected on a conversation.",
          "Leap forward to shield someone else from harm.",
        ],
        strongQuestions: [
          "Ask “What does your character wish I would do next?”",
          "Ask “What should my character be on the lookout for?",
        ],
        regularMoves: [
          "Take action, leaving yourself vulnerable.",
          "Step in to negotiate with outsiders.",
          "Offer someone a cigarette.",
          "Attempt to lend a helping hand.",
          "Let someone see you at your most vulnerable.",
        ],
        regularQuestions: [
          "Ask “What does your character need help with currently?”"
        ],
        weakMoves: [
          "Confess something and seek forgiveness.",
          "Threaten or coerce someone.",
          "Accidentally open your brain to the world’s psychic maelstrom.",
          "Run out of something that the queer enclave doesn’t have steady access to.",
          "Demand an explanation from someone."
        ],
        weakQuestions: [
          "Ask “Does your character feel okay with me being here right now?”"
        ]
      },
      
    }
  end

  def role_names do
    ["Iris", "Hawker", "Stitcher", "Tiger", "Torch", "Arrival"]
  end

  def settings_by_name do
    %{
      "Varied Scarcities" => %{
        lore: """
          There's no postal service. No municipal waste treatment. No reservoir operations
          manager to treat your water. No ecological impact survey team. No police. No road
          maintenance crew, and that means no refrigerated trucks hauling groceries into the
          area. No signal in the cell towers most days. The people who used to think about this
          stuff so you didn’t have to? They’re gone now
        """,
        desires: [
          "competition", "paranoia", "collaboration",
          "uncomfortable bargains", "scrappy diy",
          "suffering without", "a feral age"
        ],
        tips: [
          "Introduce scavengers, hustlers, growers, and bandits. Make them all somewhat sympathetic.",
          "Explore what happens when everyday infrastructure no longer exists.",
          "Ask compelling questions and build on the answers that others give."
        ],
        pickUpWhen: "Someone wanders the wasteland, seeks a buyer, or visits a marketplace.",
        giveAwayWhen: "You need something material and don’t immediately know where to get it.",
        moves: [
          "Show someone acting foolishly out of need and desperation.",
          "Introduce a traitorous individual.",
          "Spread disease."
        ]
      },
      "Psychic Maelstrom" => %{
        lore: """
          Close your eyes, open your brain: something is wrong with the world.
          That something is the psychic maelstrom. It’s just beyond our
          everyday perception, ever-present and howling.

          It can offer guidance, protection, even flashes of brilliant inspiration.
          But it’s hungry, and nobody knows what price it demands in return.
        """,
        desires: [
          "human dependence", "cosmic revelation",
          "revenge", "entropy", "fervent intimacy",
          "to be ushered into the world forever"
        ],
        tips: [
          "Explore the subtle impact that the psychic maelstrom has on everyday people and places.",
          "When people open their brains to the psychic maelstrom, describe or ask about their sensory experiences.",
          "Ask compelling questions and build on the answers that others give."
        ],
        pickUpWhen: "Someone uses a psychic gift, seeks out the strange, or invokes the maelstrom.",
        giveAwayWhen: "You’re involved in any of the above or leave yourself psychically vulnerable.",
        moves: [
          "Foreshadow a threat.",
          "Enter into someone’s sensory experience at the right moment.",
          "Bleed psychic instability into the immediate area."
        ]
      },
      "Society Intact" => %{
        lore: """
          For some reason we thought the collapse was going to hit everybody at the same time.
          But nothing happens like that: neatly, evenly. Civilization crumbles in waves,
          eroding the peripheries of good society.
          
          Apocalypse is only a distant nightmare for the privileged, a cautionary tale about
          what might happen to them if they should fall from the master’s clutches. You’d be
          surprised what one of those people would do to keep their society intact.
        """,
        desires: [
         "orthodoxy","ignorance of outsiders",
         "profit eternal","self-preservation",
         "a technological solution","hope renewed"
        ],
        tips: [
          "Describe environments and people that feel at once familiar and alien.",
          "Make decisions about what you can still buy in conventional markets.",
          "Ask compelling questions and build on the answers that others give."
        ],
        pickUpWhen: "Someone wanders into the society intact, or you have an idea for why they might pay the enclave a visit.",
        giveAwayWhen: "You need to deal with the society intact or they remember that you exist.",
        moves: [
          "Introduce an authority figure.",
          "Announce future threats.",
          "Offer an opportunity, with or without a cost."
        ]
      },
      "Digital Realm" => %{
        lore: """
          Everything we’d ever known or said was embedded somewhere inside it. Even
          though the digital realm was young, it was hard to remember back to the way life
          was without it. It seemed as permanent as it was pervasive.
          
          Apocalypse pulled the digital realm to pieces. Networks fell into disconnect.
          Satellites blinked out. Computers were ripped apart and stripped of their precious
          metal content. But humans are wily and resourceful. They know how to salvage,
          re-purpose, and rebuild. Maybe the digital realm still has a future.
        """,
        desires: [
        "expanded networks","shared knowledge",
         "escapism","trafficked secrets","fresh code",
         "to reinvent the world in its image"
        ],
        tips: [
          "Describe sketchy, patchwork ways that people gain access to the digital realm after infrastructure collapses.",
          "Give some people a reason to hate, fear, or mythologize the digital realm.",
          "Ask compelling questions and build on the answers that others give."
        ],
        pickUpWhen: "Someone interacts with a digital device, or you have an idea about how digitization shaped this environment.",
        giveAwayWhen: "You interact with a digital device or recall memories of the digital realm.",
        moves: [
          "Reveal something to be broken.",
          "Let the technology speak in turn.",
          "Introduce a glitch."
        ]
      },
      "Outlying Gangs" => %{
        lore: """
          People had wildly differing ideas about what the collapse of law and order meant
          for their future. Some shuffled the mortal coil at the first sign of real danger.
          Others took to the hills, equipped with water purifiers and dried goji berries.
          
          But some people stayed right where they were, armed and alert. Ready to carve
          out an empire by whatever means necessary. Stop whatever you’re doing. Crane
          your neck just a tiny bit. You can probably hear their roaring in the distance.
        """,
        desires: [
         "territory","unspoken fealty","splendor",
         "the smell of fear","home-cooked meals",
         "mutant blood","somewhere safe to sleep"
        ],
        tips: [
          "Describe the varied aesthetics and ethics of the outlying gangs.",
          "Use the outlying gangs to explore and magnify tensions within the queer enclave.",
          "Ask compelling questions and build on the answers that others give."
        ],
        pickUpWhen: "Someone wanders the wasteland, takes a major road, or trespasses.",
        giveAwayWhen: "You do any of the above or you have a gang debt that you run out of time on.",
        moves: [
          "Put a gun in someone’s hand.",
          "Bring gossip in from the wasteland.",
          "Give someone the very resources that a gang is hunting for."
        ]
      },
      "Earth Itself" => %{
        lore: """
          We built a new world upon its back, glass and steel stacked toward the heavens. We
          learned how to pull electricity out of every natural element, to mechanize, to automate.
          Some of us went whole days forgetting that anything existed outside our edifice.
          
          We wounded the earth. We alienated ourselves from its touch and its harmonies.
          We broke holes in the sky. When it tried to warn us, we didn’t listen. What now?
          Will apocalypse cement that alienation for all eternity, or finally bring us home?
        """,
        desires: [
         "healing","reciprocity","strange new forms",
         "the fall of man","eden renewed","carrion",
         "trembling awe","to be reborn in fire"

        ],
        tips: [
          "Describe the smells, colours, and scurrying movements of the world.",
          "Show how the earth responds to human activity, adapting or withering.",
          "Ask compelling questions and build on the answers that others give."
        ],
        pickUpWhen: "You want to describe weather, mutation, beasts, or the natural world.",
        giveAwayWhen: "You brave the elements, investigate something organic, or walk in nature.",
        moves: [
          "Abruptly storm.",
          "Reveal an abundance or serenity.",
          "Leave something wounded."
        ]
      }
    }
  end

  def setting_names do
    ["Varied Scarcities", "Psychic Maelstrom", "Society Intact", "Digital Realm", "Outlying Gangs", "Earth Itself"]
  end

  def visuals do
    [
      "an abandoned complex", "individual homes",
      "shanties + tents", "a bustling market", "glass + concrete",
      "overgrowth", "swamp", "reclaimed green space",
      "community gardens", "tunnels", "moldy tarps", "rust",
      "quietude", "wreckage", "wilds", "blockades", "squalor",
      "heavy industry", "outdoor kitchens", "shrines", "splendor",
      "high-rises", "a train station", "trailers", "remnants of war",
      "bonfires", "the ocean", "wastelands", "scrub", "flooding",
      "mutant plants blooming", "farmland", "raging parties",
      "piles of trash", "eerie warning signs", "running water",
      "repurposed plastics", "coarse fibres", "synanthropes"
    ]
  end

  def conflicts do
    [
      "psychic privacy", "gender abolition", "spaces for women",
      "religious customs", "goddess cults", "racial identity",
      "indigenous land rights", "revolutionary fervor",
      "mutants", "scarcity thinking", "politics of the void",
      "reckless hedonism", "the need for purity", "party culture",
      "barriers to access", "the use of violence", "food justice",
      "trauma", "the limitless possibilities of queer sex",
      "known abusers", "desiring a return to society"
    ]
  end

  def get_definitions do
    %{
      rolesByName: roles_by_name(),
      roleNames: role_names(),
      settingsByName: settings_by_name(),
      settingNames: setting_names(),
      conflicts: conflicts(),
      visuals: visuals()
    }
  end
end