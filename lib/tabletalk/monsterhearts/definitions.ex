defmodule Tabletalk.Monsterhearts.Definitions do
  def moves_by_name do
    %{
      "True Love" => %{
        text: """
          You always have exactly one 
          Lover. The first is chosen during
          Your Backstory. If you ever fall in
          love with someone else instead,
          give them a String and they
          become your new Lover. You
          always carry 1 forward to earning
          your Lover’s heart or fancy
        """,
        notes: true
      },
      "Excuses Are My Armour" => %{
        text: """
          When you ignore some blatant
          problem with your Lover or how
          they treat you, mark experience.
        """,
        notes: false
      },
      "Entrenched" => %{
        text: """
          If you and another character have
          a combined total of 5 or more
          Strings on one another, gain 1 to
          all rolls against them.
        """,
        notes: false
      },
      "Mess With Me, Mess With Him" => %{
        text: """
          When using your Lover’s name as
          a threat, add 2 to your roll to _Shut
          Someone Down_ or _Keep Your Cool_.
          Your Lover gains a String on you
        """,
        notes: false
      },
      "Sympathy is My Weapon" => %{
        text: """
          Every time you forgive someone
          for hurting you, and excuse their
          base nature, gain a String on them.
        """,
        notes: false
      },
      "Downward Spiral" => %{
        text: """
          When you _Gaze Into the Abyss_, you
          may cause yourself 1 Harm. If you
          do, add 2 to your roll.
        """,
        notes: false
      },
      "Down the Rabbit Hole" => %{
        text: """
          When you go poking your nose in
          affairs not meant for your kind,
          someone involved in the situation
          gains a String on you, and you
          mark experience.
        """,
        notes: false
      },
      "Faery Contract" => %{
        text: """
If someone breaks a promise or
contract made to you, take a
String on them. When spending a
String to even out the score
and get justice on a broken
promise, add these options to
*Pulling Strings*:

- they fuck up something simple
at a crucial moment, suffering
1 Harm if appropriate,
- add 2 to your roll on an act of
vengeance.
        """,
        notes: true
      },
      "Unashamed" => %{
        text: """
You can give someone a String on
you to add 3 to your attempt to
*Turn Them On*.
        """,
        notes: false
      },
      "The Wild Hunt" => %{
        text: """
When you draw upon your
most feral manner, echoing the
lithe movements of a cat or the
voracity of a wolf, add 1 to your
roll to *Turn Someone On*.
        """,
        notes: false
      },
      "Lure" => %{
        text: """
Whenever someone makes
a promise to you, they mark
experience. Whenever someone
breaks a promise to you, you
mark experience.
        """,
        notes: false
      },
      "Guide" => %{
        text: """
If you spend a String on someone
willing, you can bring them
across the veil, into the faery
realm. The spell lasts for a scene
or two, before you’re both
returned to the mundane world.
        """,
        notes: false
      },
      "Beyond The Veil" => %{
        text: """
To seek audience with the Faery
King, Gaze Into the Abyss. On a 10
up, in addition to other results,
the Faery King reveals to you a
hidden String on someone. Gain
it. • On a 7 to 9, in addition to
other results, the Faery King
demands a favour of you.
        """,
        notes: false
      },
      "Unresolved Trauma" => %{
        text: """
Whenever something brings to
mind your death, you choke
up and gain the Condition
**traumatized** if you don’t have it
already. Whenever someone helps
you resolve this Condition, you
both mark experience.
        """,
        notes: false
      },
      "Helpful Spirit" => %{
        text: """
When you help someone resolve a
Condition, gain a String on them.
        """,
        notes: false
      },
      "Transference" => %{
        text: """
Whenever you spend time truly
listening to someone else’s
struggles, they heal 1 Harm, and
then transfer their remaining
harm to you.
        """,
        notes: false
      },
      "Projected Blame" => %{
        text: """
While you’ve got the Condition
**traumatized**, you may act as
though others had the Condition
**at fault for my death**.
        """,
        notes: false
      },
      "Creep" => %{
        text: """
When you silently witness
someone in one of their most
private moments, perhaps
sleeping or putting on makeup,
gain a String on them.
        """,
        notes: false
      },
      "Limitless" => %{
        text: """
You can walk through walls and
fly.
        """,
        notes: false
      },
      "The Hunger" => %{
        text: """
You have a Hunger for (circle 1):
fear, power, plunder, thrills.

When you heedlessly pursue
a Hunger, add 1 to rolls. When
you ignore a promising feeding
opportunity, roll to Keep Your Cool.
        """,
        notes: true
      },
      "What the Right Hand Wants" => %{
        text: """
Your body contains many
histories, and it desires many
things. Create another Hunger.
        """,
        notes: false
      },
      "Satiety" => %{
        text: """
When you satiate a Hunger,
choose one:

- heal 1 Harm;
- mark experience;
- take 1 Forward.
        """,
        notes: false
      },
      "Short Rest for the Wicked" => %{
        text: """
When you die, wait it out. A few
hours later, you wake up fully
healed.
        """,
        notes: false
      },
      "Watchful Golem" => %{
        text: """
When you defend someone
without them ever knowing
about it, mark experience.
        """,
        notes: false
      },
      "Ending" => %{
        text: """
You remember every detail
of your death. When you tell
someone about it, give them the
Condition **morbid** and roll to *Turn
Them On* with Cold.
        """,
        notes: false
      },
      "Esprit de Corpse" => %{
        text: """
When you *Gaze Into the Abyss*,
the abyss will share with you
its Hunger. Treat that Hunger
as one of your own until you
satiate it, and mark experience
when you do so.
        """,
        notes: false
      },
      "Better Than Nothing" => %{
        text: """
When you gain a Condition, mark
experience.
        """,
        notes: false
      },
      "A Blank Canvas" => %{
        text: """
When you take an action that
embodies one of your Conditions,
allowing that Condition to alter
your sense of self, cross it off and
add 1 to your roll.
        """,
        notes: false
      },
      "Try Harder Next Time" => %{
        text: """
When you screw up, give yourself
an appropriate Condition and
take 1 Forward.
        """,
        notes: false
      },
      "Fake" => %{
        text: """
Add 1 to any rolls you make while
lying.
        """,
        notes: false
      },
      "Metamorphosis" => %{
        text: """
When you *Gaze Into the Abyss*,
on a 7 or higher the abyss
will also show you what you
must become, and you can
permanently swap two of your
stats.
        """,
        notes: false
      },
      "Strange Impressions" => %{
        text: """
When a main character either
harms you or helps you heal,
you can respond by studying
them with wide eyes. If you do,
temporarily gain one of their
Skin Moves and add it to your
character sheet. It disappears
once you use it.
        """,
        notes: false
      },
      "Soul Debt" => %{
        text: """
You owe a debt to a Dark
Power. Name it, and choose
two Bargains it has made
with you.

The Dark Power can gain
Strings. If ever it has 5
Strings on you, trigger your
Darkest Self.
        """,
        notes: true
      },
      "Dark Recruiter" => %{
        text: """
When you bring an innocent
soul to the Dark Power, mark
experience.
        """,
        notes: false
      },
      "Under Pressure" => %{
        text: """
If someone has 3 or more
Strings on you, add 1 to
your rolls to carry out their
bidding.
        """,
        notes: false
      },
      "Can’t Save Myself" => %{
        text: """
When somebody saves you
from forces too powerful
for you to reckon with, they
mark experience, and you
gain a String on them.
        """,
        notes: false
      },
      "The Power Flows Through You" => %{
        text: """
You can give the Dark Power a
String in order to add 2 to your
next roll.
        """,
        notes: false
      },
      "Numbing It Out" => %{
        text: """
You can give the Dark Power
a String in order to remove a
Condition or up to two harm.
        """,
        notes: false
      },
      "Elsewise Power" => %{
        text: """
You can give the Dark Power a
String to use a move you don’t
have, just this once. This move
can come from any Skin.
        """,
        notes: false
      },
      "Uncanny Voices" => %{
        text: """
You can give the Dark Power a
String in order to realize a secret
about someone you’re talking to.
The owner of that character will
reveal one of their secret fears,
secret desires, or secret strengths
(they choose which.)
        """,
        notes: false
      },
      "Strings Attached" => %{
        text: """
You can ask the Dark Power
for something that you really,
really want. The MC will attach a
price to the thing you want, and
hint at an undesired twist in its
nature. If you pay the price, you’ll
get what you’re after. 
        """,
        notes: false
      },
      "The Clique" => %{
        text: """
You’re at the head of the
toughest, coolest, most powerful
clique around. They count as a
gang. Choose one of the following
strengths for your gang:

- they’re armed (with guns and
real dangerous stuff),
- they’re connected (with
money and designer drugs),
- they’re talented (in a band or
sports team),
- they’re cultists (with dark
oaths and willingness to die).
        """,
        notes: true
      },
      "The Other Clique" => %{
        text: """
You have another gang, as described in *The Clique*.
        """,
        notes: true
      },
      "The Shield" => %{
        text: """
When you’re surrounded by your
gang, subtract 1 from any rolls
against you.
        """,
        notes: false
      },
      "Bought Loyalty" => %{
        text: """
You can give a side character a
String on you to tempt them to
do your bidding. The MC will tell
you what sort of bribe, threat,
or coaxing it’ll take to get that
character to do what you want
right now.
        """,
        notes: false
      },
      "And Your Enemies Closer" => %{
        text: """
When someone betrays you, gain
a String on them.
        """,
        notes: false
      },
      "Many Bodies" => %{
        text: """
When you promise one of your
gang members to someone, add
2 to your roll to *Turn Them On*.

When one of your gang members
has sex with someone, it triggers
your Sex Move.
        """,
        notes: false
      },
      "Streaming" => %{
        text: """
You have a telepathic connection
with your gang members. You can
always hear their emotions and
fears. If you try to hear specific
thoughts, *Gaze Into the Abyss*
about it and add 1 to your roll.
        """,
        notes: false
      },
      "Invited" => %{
        text: """
You cannot enter a home
without being invited. Whenever
someone invites you in, gain a
String on them.
        """,
        notes: false
      },
      "Hypnotic" => %{
        text: """
You can hypnotize people who
have no Strings on you. Roll with
Hot. On a 10 up, they do exactly
what you wish and have no idea
that anything is wrong. • On
a 7-9, the hypnosis works, but
choose one:

- they realize exactly what
you’ve done to them,
- they fuck up your commands,
- their sanity is unhinged.
        """,
        notes: false
      },
      "Cold as Ice" => %{
        text: """
When you *Shut Someone Down* and
roll a 7 or higher, you may choose
an extra option from the list.
        """,
        notes: false
      },
      "The Feeding" => %{
        text: """
You feed on hot blood, direct
from the source. If this is the first
time they’ve ever been fed upon,
you both mark experience. When
you feed, choose two:

- you heal 1 Harm,
- you take 1 Forward,
- they definitely don’t die.
        """,
        notes: false
      },
      "Marked for the Hunt" => %{
        text: """
Feeding on someone establishes
a preternatural bond. From that
point forward, whenever you
*Gaze Into the Abyss* concerning
their whereabouts or well-being,
roll as if you had Dark 3.
        """,
        notes: false
      },
      "Inescapable" => %{
        text: """
You may spend a String on
someone to demand that they
remain in your presence. If they
still walk out on you, gain 2
Strings on them.
        """,
        notes: false
      },
      "Primal Dominance" => %{
        text: """
When you harm someone, take a
String on them.
        """,
        notes: false
      },
      "Scent of Blood" => %{
        text: """
Add 1 to all rolls against those
who have been harmed in this
scene already.
        """,
        notes: false
      },
      "Howl at the Moon" => %{
        text: """
When basked in moonlight, you
may act as if you had Dark 3.
        """,
        notes: false
      },
      "Spirit Armour" => %{
        text: """
When basked in moonlight, any
harm that you suffer is reduced
by 1, and you add 2 to all rolls to
Keep Your Cool.
        """,
        notes: false
      },
      "Heightened Senses" => %{
        text: """
When you rely on your animal
instincts to make sense of a
charged situation, roll with Dark.
On a 10 up, ask the MC three
questions from below and take
1 Forward. • On a 7-9, ask one
question from below and take 1
Forward:

- Where’s my best escape route
or way in?
- Which enemy is the most
vulnerable to me?
- What’s their secret weakness?
- What poses the biggest threat
to me?
- Who’s in control here?
        """,
        notes: false
      },
      "Unstable" => %{
        text: """
When you become your Darkest
Self, mark experience.
        """,
        notes: false
      },
      "Sympathetic Tokens" => %{
        text: """
You gain power from
Sympathetic Tokens - items of
personal significance taken from
others. Sympathetic Tokens
count as Strings.
        """,
        notes: false
      },
      "Hex-Casting" => %{
        text: """
You can cast Hexes. Choose two
that you know. To cast them,
either expend a Sympathetic
Token during a secret ritual, or
meet the target’s gaze and chant
at them in tongues. Then roll
with Dark. On a 10 up, the Hex
works, and can easily be reversed.
On a 7-9, it works but choose one:

- the casting does you 1 Harm;
- the Hex has weird side
effects;
- trigger your Darkest Self
        """,
        notes: true
      },
      "Transgressive Magic" => %{
        text: """
If your ritual transgresses the
community’s moral or sexual
standards, add 1 to your *Hex-Casting*
roll.
        """,
        notes: false
      },
      "Sanctuary" => %{
        text: """
You have a secret place for
practicing witchcraft. Add 1 to all
rolls you make within this space.
        """,
        notes: false
      },
      "Wither" => %{
        text: """
The hexed loses all of their hair,
or their teeth start falling out, or
their period arrives unexpected
and heavy, or their skin gets
all sickly yellow and spotty.
Whatever the specifics, it’s bad.
        """,
        notes: false
      },
      "Binding" => %{
        text: """
The person cannot physically
harm others
        """,
        notes: false
      },
      "Ring of Lies" => %{
        text: """
Whenever the person attempts to
lie, they hear a piercing ringing
noise. Big lies will often make
their knees buckle and disorient
them. Severe lies can cause harm
or even brain damage.
        """,
        notes: false
      },
      "Watching" => %{
        text: """
You enter a deep sleep, and begin
to see the world through the eyes
of the hexed. You can feel their
reactions to and impressions of
what they are seeing.
        """,
        notes: false
      },
      "Illusions" => %{
        text: """
Pick one: snakes and bugs,
demonic visages, false prophecies,
non-existent subtext. The hexed
sees that thing everywhere. You
have no control over the exact
images or manifestations.
        """,
        notes: false
      },
      "Failing Dynasty" => %{
        text: """
In the age of serpents, your
family was powerful and prolific.
Now, they live in a shadow of
their former glory. They want to
regain (choose one):

- their political clout,
- their old wealth,
- their failing beauty,
- their secret allies.

Whenever you are convinced
to do the bidding of a family
member, take 1 Forward to doing
it and that family member gains a
String on you. Whenever you help
your family regain some of their
former glory, mark experience.
        """,
        notes: true
      },
      "Mesmerizing" => %{
        text: """
When you stare at someone
without blinking, roll with Hot.
On a 10 up, they freeze up until
you blink or someone touches
them, and afterwards they
don’t really remember anything
unusual happening. • On a 7-9,
it’ll still work, but only if you hiss
loudly the entire time (and they’ll
definitely know something weird
happened).
        """,
        notes: false
      },
      "The Big Reveal" => %{
        text: """
When you reveal your true form
to someone, they gain a String
on you. If they accept you as you
truly are, they mark experience.
If they reject you, take 1 Forward
against them.
        """,
        notes: false
      },
      "The New Order" => %{
        text: """
When you learn to meet one of
your needs within human society
rather than within your family,
mark experience. When others
help you fit in better with human
society, they mark experience.
        """,
        notes: false
      },
      "Patience is a Virtue" => %{
        text: """
When you bite your tongue and
don’t respond to an antagonist,
roll with Cold. On a 10 up, gain a
String on them. • On a 7-9, take 1
Forward to striking the next time
you see them.
        """,
        notes: false
      },
    }
  end

  def advancements_by_id do
    %{
      "+stat" => %{
        text: "Add +1 to one of your stats."
      },
      "self" => %{
        text: "Take another {playbook} move."
      },
      "any" => %{
        text: "Take a move from any Skin."
      },
      "jury" => %{
        text: "You belong to a *Jury of Fae*."
      },
      "house" => %{
        text: "You reside in a *Haunted House*."
      },
      "crew" => %{
        text: "You're part of a *Reckless Crew*."
      },
      "sibs" => %{
        text: "You've found *Hollow Siblings*."
      },
      "fiend" => %{
        text: "You supply for *Needy Fiends."
      },
      "bargn" => %{
        text: "Take the remaining Bargains."
      },
      "cliq" => %{
        text: "Take _The Clique_ again and detail another gang."
      },
      "vamp" => %{
        text: "You're in a *Vampiric Coterie*."
      },
      "pack" => %{
        text: "You belong to a *Wolf Pack*."
      },
      "coven" => %{
        text: "You belong to a *Coven*."
      },
      "hex" => %{
        text: "Take all the remaining Hexes."
      },
      "nhex" => %{
        text: "Create a new Hex."
      },
      "nest" => %{
        text: "You belong to a *Nest of Humans*."
      }
    }
  end

  def playbooks do
    ["Fae", "Ghost", "Ghoul", "Hollow", "Infernal", "Mortal", "Queen", "Serpentine", "Vampire", "Werewolf", "Witch"]
  end

  def playbooks_by_name do
    %{
      "Fae" => %{
        sexMove: """
          When you lie naked with another, you can ask them for a
          promise. If they refuse, take 2 Strings on them. 
        """,
        names: ["Anders", "Aurora", "Crow", "Gail", "Harmony", "Iris", "Lilith", "Ping","Selene", "Sienna", "Walthus"],
        looks: ["dainty", "girlish", "gaunt",
"mysterious", "dishevelled"],
        eyesList: ["quick eyes", "lyrical eyes",
"mesmerizing eyes", "laughing eyes",
"piercing eyes"],
        origins: [" fae born", "fae blooded",
"swapped at birth", "stole the gift",
"touched with the gift"],
        backstory: [
          "You wear your heart on your sleeve. Give everyone one String.", 
          "You’ve captured someone’s fancy. Gain 2 Strings on them."
        ],
        darkestSelf: """
          Everything you say seems a
          promise. Everything you hear
          seems a promise. If a promise is
          broken, justice must be wrought
          in trickery or blood. You aren’t
          subject to the human rules of
          mercy. To escape your Darkest
          Self, you must in some way
          re-balance the scales of justice.
        """,
        advice: """
          Alluring, otherworldly, fickle, and vengeful. The Fae
          entices people into making promises, and wields faerie
          vengeance when those promises are broken. They also
          have the ability to commune with ethereal forces, just
          beyond the veil.

          The two stat choices for the Fae allow you to slant
          toward being either beautiful and mysterious (Hot 2
          & Dark 1) or audacious and alien (Volatile 2 & Hot 1).
          With a consistently-low Cold stat, they aren’t prone to
          being very chill, cynical, or wry. From their forward
          sensuality to their unwavering sense of justice, sincerity
          is a big theme for the Fae.

          When you play the Fae, promises matter. Use the Fae’s
          allure and wit to tease those promises out of other
          characters. You can add mechanical incentive for others
          to make promises to you by spending Strings to tempt
          them to do what you want, or through the move Lure.
          Keep track of the promises that others make to you, in
          the margins of your character sheet or on scrap paper.

          Beyond the Veil, Guide, the option to join a Jury of Fae,
          and talk of faery justice all invite you to collaboratively
          imagine the world of faery. To do so, ask questions
          of the MC, anticipate questions being asked of you in
          return, and brace yourself for surprise.
        """,
        flavour: """
          At the edges of this world, just beyond the veil, there are colours that few
          mortals even dream of. Beauty enough to shatter any heart. The Fae live and
          breathe at the edges of this world. They keep a dusting of that magic tucked
          behind their ears, just in case.

          And the Fae are willing to share. They’re nothing if not generous, asking for
          only one thing in return. A promise. Keep it, and the true beauty of the world
          will be revealed. Break it, and feel the wrath of faery vengeance.
        """,
        stats: [[2, -1, -1, 1], [1, -1, 2, -1]],
        advancements: ["+stat", "self", "self", "any", "any", "jury"],
        moves: ["Faery Contract", "Unashamed", "The Wild Hunt", "Lure", "Guide", "Beyond The Veil"],
        startingMoves: ["Faery Contract"],
        startingMoveChoices: 1 
      },
      "Ghost" => %{
        names: [" Alastor", "Avira", "Catherine",
"Daniel", "Kara", "Lenora", "Orville",
"Rufus", "Spencer", "Tien"],
        looks: ["forlorn", "scared", "stuffy",
"out of place", "brooding"],
        eyesList: ["hollow eyes", "pained eyes",
"dull eyes", "unnerving eyes",
"piercing eyes"],
        origins: ["left to die",
"murdered in cold blood",
"murdered in hot passion",
"a tragic accident", "a confused death"],
        backstory: [
          "Someone knows that you’re dead and how you died. They gain 2 Strings on you.", 
          "You’ve been inside someone’s bedroom while they were sleeping. Take a String on them."
        ],
        sexMove: """
When you have sex with someone, you both get to ask a
question of one another. This can be asked in character or
player-to-player. They must answer honestly and directly.
        """,
        darkestSelf: """
You become invisible,
unnoticeable. No one can see you,
feel you, or hear your voice. You
can still affect inanimate objects,
but this is your only avenue
of communication. You escape
your Darkest Self when someone
acknowledges your presence, and
demonstrates how much they
want you around.
        """,
        advice: """
Lonely, wounded, caring, and creepy. The Ghost has
experienced intense trauma, and now seeks validation
and intimacy. They have the potential to provide care
and healing for others, but also tend to ignore personal
and physical boundaries.

The two stat choices for the Ghost let you steer toward
being either icy and distant (Cold 2 & Dark 1), or scary
and moody (Dark 2 & Volatile 1). Your ghost might end
up crying out for help, pushing away the very people
they care about, or burning themself out trying to take
care of others.

At the start of the game, the Ghost’s low Hot stat
means that they aren’t good at Turning Someone On. This
plays into their core dilemma – without social power,
how does the Ghost get the attention and emotional
support that they need? Maybe they’re endlessly giving,
hoping for reciprocation. Helpful Spirit and Transference
both point in that direction. Maybe they’re mean and
spiteful, assuming from the outset that they aren’t
worthy of affection. Unresolved Trauma and Projected
Blame provide a different dynamic, suggesting a mean
and spiteful Ghost who lashes out at those who remind
them of what they’ve lost. Creep and Limitless add a
voyeuristic element, encouraging the Ghost to ignore
others’ boundaries. Lots of other possibilities exist in
the interactions between these moves, too.
        """,
        flavour: """
You used to have a future. Growing up was a painful tumult at times, but at
least you were growing. Now you only have a past - unfinished business to
take care of before you can leave this world behind.

Life is precious. You understand that, now that you’ve lost yours. You just
want to help. You just want to be seen. But sometimes even the simplest
desires feel so difficult to grasp.

Ghosty ghost, you’re dead. 
        """,
        stats: [[-1, 2, -1, 1], [-1, -1, 1, 2]],
        advancements: ["+stat", "self", "self", "any", "any", "house"],
        moves: ["Unresolved Trauma", "Helpful Spirit", "Transference", "Projected Blame", "Creep", "Limitless"],
        startingMoves: ["Unresolved Trauma"],
        startingMoveChoices: 2
      },
      "Ghoul" => %{
        names: ["Akuji", "Cage", "Cole", "Georgia",
"Horace", "Iggy", "Mara", "Morrigan",
"Silas", "Sharona", "Victor", "Zed"],
        looks: ["gaunt", "stiff", "disfigured",
"detached", "wrecked"],
        eyesList: ["hollow eyes", "quiet eyes",
"calculating eyes", "harsh eyes",
"hungry eyes"],
        origins: ["resurrected", "constructed",
"disturbed", "rejected", "sent"],
        backstory: [
          "Someone reminded you what love was, when you thought that death had stolen it away from you forever. Give them a String.",
          "Did anyone watch you die? If so, you gain 2 Strings on each other."
        ],
        sexMove: """
When you have sex with someone, create a new Hunger.
        """,
        darkestSelf: """
Your dull hunger sharpens. You
can’t focus on anything else but
feeding. And in addition to your
peculiar cravings, you recognize
something else. That primordial
hunger which connects all
hungers. Flesh, blood, meat. You
escape your Darkest Self once
you’ve overindulged, or you’ve
been locked out for long enough
to regain composure.
        """,
        advice: """
Obsessive, dangerous, morbid, and quiet. The Ghoul is
constantly contending with voracious Hunger, and the
emotional distance brought on by death makes it easier
to do bad things in pursuit of feeding. They might be a
flesh-eating zombie, or something a little more subtle
and strange.

The two stat choices for the Ghoul paint a portrait of
the character as either cruel and erratic (Volatile 2 &
Cold 1) or disaffected and portentous (Cold 2 & Dark 1).
Since The Hunger forces you to Keep Your Cool to avoid a
feeding opportunity, your Cold stat plays a pivotal role
in maintaining self-control.

Watchful Golem and Esprit de Corpse both present
the ability to steer the Ghoul in a couple different
directions. Are you watching over others out of a
deep-rooted but unexpressed sense of care? Or are you
skulking around serving them because death took away
your sense of independence?

Short Rest For the Wicked is a recipe for pandemonium.
It’s also an invitation to the MC to frame you into a
new, dramatic situation. A lot can happen in a few
hours.

Your Sex Move prompts you to create a new Hunger.
It can be anything you like, and it’s added to your
character alongside their existing Hungers. If you have
sex often, you’ll find your appetite growing wider and
weirder all the time.
        """,
        flavour: """
Death changed you. It took away your contemplative joy, it dulled your
senses, and it left you impossibly hungry. That hunger is always with you,
like a hum in your ears that swells and crescendos until you can’t hear
anything else. Unattended, it will come to dominate you - but feeding it may
be just as bad.
There is a certain beauty to what you’ve become. Your gaunt body, its
unnatural form - it draws people in. Your stark disinterest is beguiling. But
underneath that disaffected presentation - the hunger, the hunger. 
        """,
        stats: [[-1, 1, 2, -1], [-1, 2, -1, 1]],
        advancements: ["+stat", "self", "self", "any", "any", "crew"],
        moves: ["The Hunger", "What the Right Hand Wants", "Satiety", "Short Rest for the Wicked", "Watchful Golem", "Ending", "Esprit de Corpse"],
        startingMoves: ["The Hunger"],
        startingMoveChoices: 2
      },
      "Hollow" => %{
        names: ["Adam", "Baby", "Bryce",
"Dorothy", "Eva", "Franklin", "January",
"Max", "Nix", "Raymond", "Summer"],
        looks: ["immaculate", "disheveled",
"haunted", "inexperienced", "earnest"],
        eyesList: ["shifty eyes", "soulless eyes",
"wide eyes", "vacant eyes",
"desperate eyes"],
        origins: ["born of a wish",
"a failed experiment", "once a toy",
"amnesiac", "machine"],
        backstory: [
          "You’ve been taking your social cues from someone, and doing so has taught you a lot about them. Gain 2 Strings on them.",
          "Someone’s seen through your invented past, and realized it’s all lies. They gain 2 Strings on you."
        ],
        sexMove: """
When you have sex with someone, both players secretly
write down whether the sex was confusing or soothing
for their character. If you reveal the same answer, both
characters mark experience.
        """,
        darkestSelf: """
Your body is a prison. You don’t
belong inside of it. You need to
put it in harm’s way, and make
it suffer, just like it’s made you
suffer. There’s got to be a way to
cut yourself out of it. You need to
meet your makers, and hold them
accountable for what they’ve
done to you. To escape your
Darkest Self, you must come to
see how someone else feels more
trapped than you do.
        """,
        advice: """
Uncertain, unstable, impressionable, and lost. The
Hollow doesn’t have a past, and is struggling to imagine
their future. They’re in the midst of an existential crisis,
and being not-quite-real they can only look to those
around them for the answers.

The Hollow’s two stat options slant toward being
either beautiful enigma (Hot 1 & Dark 2) or an erratic
misfit (Volatile 2 & Dark 1). Their Cold stat is low,
making it hard for them to confront their fears or
stand up to others.

The Hollow is yearning for a sense of self, and clinging
to any labels which seem like they might help cobble
together an identity, which is why so many of their
moves revolve around Conditions.

When you use Strange Impressions, you can gain any of
the Skin Moves on the relevant sheet. You aren’t limited
only to the ones which have been selected for that
character. When you temporarily gain a move in this
way, it doesn’t affect the other character’s access to it.

If the Hollow has sex with more than one person
at once, everyone does the writing and revealing
simultaneously. If the Hollow shared an answer with
one or more characters, that’s the set of characters who
mark experience.
        """,
        flavour: """
They set out to make something from nothing. It’s not clear whether
they succeeded or not. See, it turns out there’s a lot of grey area between
something and nothing.

You’re alive, but you’re not real. You don’t have a soul. You don’t have childhood
memories, because you don’t have a childhood. You don’t have parents;
you have makers. And those makers forgot to give you a place in the world.
        """,
        stats: [[1, -1, -1, 2], [-1, -1, 2, 1]],
        advancements: ["+stat", "self", "self", "any", "any", "sibs"],
        moves: ["Better Than Nothing", "A Blank Canvas", "Try Harder Next Time", "Fake", "Metamorphosis", "Strange Impressions"],
        startingMoves: [],
        startingMoveChoices: 2
      },
      "Infernal" => %{
        names: ["Baron", "Cain", "Chloe",
"Damien", "Logan", "Mark", "Mika",
"Omar", "Ophelia", "Poe", "Yoanna"],
        looks: ["quiet", "frantic", "venomous",
"spoiled", "spooked"],
        eyesList: ["empty eyes", "calculating eyes", "burning eyes", "flickering eyes",
"piercing eyes"],
        origins: ["bartered soul", "emissary", "last-chancer", "legion", "lackey",
"chosen"],
        backstory: [
          "You owe debts. Give away 3 Strings, divided any way you like between the Dark Power and the other characters.",
          "Someone thinks they can save you. Gain a String on them."
        ],
        sexMove: """
When you have sex, the Dark Power loses a String on you
and gains a String on whoever you had sex with.
        """,
        darkestSelf: """
You find yourself shivering, needy,
and alone. The Dark Power will
make some daunting, open-ended
demands. Every demand fulfilled
brings you closer to feeling whole
again, and removes one of the
Dark Power’s Strings on you. You
escape your Darkest Self when
the Dark Power is out of Strings,
or you make a bargain with an
even more dangerous entity.
        """,
        advice: """
Tempted, impulsive, and in over their head. The Infernal
has a demonic patron – someone who gets them things
they want, at an unspecified price. The Infernal plays
with themes of temptation, addiction, and dependency.

The Infernal is extremely powerful while sinking
into debt with their Dark Power, though that pushes
them toward an inevitable crash. The crash isn’t a
punishment to be avoided, but rather a dramatic height
in the character arc. When you play the Infernal, don’t
stop just shy of that fifth String of debt or try to play
it safe. The Infernal is most interesting when they are
swinging chaotically between power and powerlessness.

With Dark Recruiter, the specifics of what it means
to bring someone to the Dark Power is left up to
interpretation and context. It might involve ritual
sacrifice, or a simple introduction at the cafe.

The Strings Attached Bargain plays with the “be careful
what you wish for” trope from stories of witches and
genies. Taking this Bargain communicates to the MC
that you want to be punched in the gut by tragic irony
every now and again.
        """,
        flavour: """
At first, it seemed innocent. It gave you things, made you feel good about
yourself. You came to it with your problems, and it fixed them. When you
asked how you could return the favour, it told you to be patient - that all
debts would be settled in due time. That was the first time you heard it
mention debts.

You’ve got Satan as your cornerman, or a demon in your brain. Or maybe
the stars glow just for you. Regardless, you owe a debt to something much
bigger and scarier than you’ll ever be. 
        """,
        stats: [[-1, -1, 2, 1], [1, -1, -1, 2]],
        advancements: ["+stat", "self", "bargn", "any", "any", "fiend"],
        moves: ["Soul Debt", "Dark Recruiter", "Under Pressure", "Can’t Save Myself"],
        startingMoves: ["Soul Debt"],
        startingMoveChoices: 1
      },
      "Queen" => %{
        names: ["Burton", "Brittany",
"Cordelia", "Drake", "Jacqueline",
"Kimball", "Raymond", "Reyes", "Varun",
"Veronica"],
        looks: ["stunning", "domineering", "icy",
"neurotic", "talkative"],
        eyesList: ["calculating eyes",
"captivating eyes", "murky eyes",
"vacant eyes", "pretty eyes"
],
        origins: ["most popular",
"most dangerous", "cult leader",
"source of the infection",
"firstborn of the hive mind"],
        backstory: [
          "Name three side characters who are members of your gang. Gain a String on each.",
          "You find someone threatening. Give them a String on you, and take a String on them."
        ],
        sexMove: """
When you have sex with someone, they gain the Condition
one of them. While the Condition remains, they count as
part of your gang.
        """,
        darkestSelf: """
They’ve failed you. Again. This
whole mess is their fault, and
why should you have to suffer
the consequences of their idiocy?
You need to make an example
out of each of them -- a cruel
and unwavering example. You
escape your Darkest Self when
you relinquish part of your power
to someone more deserving, or
when you destroy an innocent
person in order to prove your
might.
        """,
        advice: """
Popular, dangerous, bitchy, and commanding. The
Queen has a powerful clique who serves as their gang.
Loyalty and control are crucial if the Queen is to retain
their power, but everyone in the clique has their own
set of needs and desires to contend with.

The two stat choices for the Queen allow you to slant
toward being either desirable and commanding (Hot 2
& Cold 1) or cutthroat and secretive (Cold 2 & Dark 1).
Either way, you’re not very good at getting your own
hands dirty – with a low Volatile stat, you depend on
others to fight your battles and keep you safe.

Depending on the origin you pick and your moves, the
Queen can range from being a mundane human teen all
the way to weird cosmic horror. More than any other
Skin, you’re in control of just how supernatural to
make them. Are you a bossy cheerleading captain,
or a brooding alien swarm queen here to repopulate
the earth?
        """,
        flavour: """
You’re one of the special ones. A sovereign beauty. You deserve more than the
rest of this wretched world does. You deserve the will and worship of those
around you.

And it’s not only because you’re better than them. It’s because you make them
better. Stronger, more beautiful, complete. They’d be nothing without you.
        """,
        stats: [[2, 1, -1, -1], [-1, 2, -1, 1]],
        advancements: ["+stat", "self", "self", "any", "any", "cliq"],
        moves: ["The Clique", "The Shield", "Bought Loyalty", "And Your Enemies Closer", "Many Bodies", "Streaming"],
        startingMoves: ["The Clique"],
        startingMoveChoices: 1
      },
      "Serpentine" => %{
        names: ["Adelinde", "Attor", "Dana",
"Hester", "Jasdeen", "Lucian", "Nuna",
"Russel", "Seth", "Zachariah"],
        looks: ["sleek",
"beguiling", "sleazy", "lithe", "skittish"],
        eyesList: ["darting eyes", "cold eyes",
"apprehensive eyes", "hypnotic eyes",
"snake eyes"],
        origins: ["from old money",
"from the swamps", "in exile",
"secretive travellers", "demons"],
        backstory: [
          "You’ve been watching someone, trying to learn from them what it means to be human. Gain two Strings on them.",
          "Your family seeks to control your every move, and they will not be denied. The head of your family gains two Strings on you."
        ],
        sexMove: """
If your family learns that you’ve had sex with someone,
that person becomes part of your family’s Failing Dynasty. If
they’re a main character, they add the move to their sheet.
        """,
        darkestSelf: """
The human and serpent worlds
are too different, and you’ll
never be able to reconcile their
demands. The only way out is
to choose a side, as decisively
and irrevocably as possible.
Watch carefully and quietly for
an opportunity, and then strike,
regardless of who needs to be
hobbled or devoured in the
process. It’s the only way to make
the world simple again, and find
your place at last. You escape
your Darkest Self when you
accept your complicated place in
the world, or when you moult.
        """,
        advice: """
Indoctrinated, uncertain, beguiling, and abrupt. The
Serpentine belongs to a sprawling, controlling family
and is uncertain about their place in the modern world.
They struggle with balancing family obligations with a
wider social network.

The stats you choose will slant your character toward
being either seductive and aloof (Hot 2 & Cold 1) or
fierce and dangerous (Cold 2 & Volatile 1). Either way,
your Serpentine will be caught between worlds and
forced to decide who deserves their trust and intimacy.

Your family is obsessed with and anxious about their
legacy. Your sex move reflects this: anyone who you
become emotionally and sexually entangled with is at
risk of being pulled into their power games.

The true form referenced in The Big Reveal is a
terrifying snake-person visage. You get to decide the
details: whether you slither out of your human skin,
grow fangs and a tail, or something else entirely.

If you’re the MC, find ways for the family to meddle
in the Serpentine’s social life. Maybe their strict
father imposes arbitrary and stifling rules, or their
grandmother tries to dictate who they are to befriend
next. Play the family members in a way that makes
them at least somewhat sympathetic, but ultimately
in conflict with the larger world. Find out what the
Serpentine does about that conflict.
        """,
        flavour: """
In ancient days, your family held dominion over this world. They were
powerful, deadly, and wise. At least, that’s what they tell you. But all you’ve
ever seen is empty faith and crumbling dreams. You just want to live your
life like any other kid, but they have bigger plans for you.

They say that there will come a day when the serpent rules once more. That
once again they will swap secrets with powerful allies and venom with powerful
enemies. But they need your help first. After all, what else is family for?
        """,
        stats: [[2, 1, -1, -1], [-1, 2, 1, -1]],
        advancements: ["+stat", "self", "self", "any", "any", "nest"],
        moves: ["Failing Dynasty", "Mesmerizing", "The Big Reveal", "The New Order", "Patience is a Virtue"],
        startingMoves: ["Failing Dynasty"],
        startingMoveChoices: 1
      },
      "Vampire" => %{
        names: ["Amanda", "Cassius", "Clayton",
"Helene", "Isaiah", "Jessamine", "Jong",
"Lucian", "Marcell", "Morana", "Serina"],
        looks: ["intense", "aloof", "predatory",
"smoldering", "old-fashioned"],
        eyesList: ["dead eyes", "lusty eyes",
"pained eyes", "hungry eyes",
"thirsty eyes"],
        origins: ["newly reborn",
"taken this century", "many ages old",
"lord", "cursed blood"],
        backstory: [
          "You’re beautiful. Gain a String on everyone.",
          "Someone once saved your unlife. They gain 2 Strings on you."
        ],
        sexMove: """
When you deny someone sexually, gain a String on them.
When you have sex with someone, lose all Strings on them.
        """,
        darkestSelf: """
Everyone is your pawn, your
plaything. You hurt them and
make them vulnerable, for sport
-- like a cat does with a mouse.
Maybe you’ll even drain them
dry, though you’ll certainly take
your time first. You escape your
Darkest Self when you’re put in
your rightful place, by someone
more powerful than you. 
        """,
        advice: """
Icy, manipulative, hypnotic, and cruel. The Vampire
thrives on emotional entrenchment and control. The
Vampire knows how to undermine the will of others,
and often possesses an unsettling attitude toward
consent.

Both stat options showcase the Vampire’s Hot and
Cold nature, passionately romantic one minute and
downright mean the next. Your choice is about which
way the scale tends to lean: sexy or disdainful.

The Vampire has some moves that are downright scary,
not because of anything supernatural, but because
they are calculatingly and intimately violent. Playing a
Vampire means contending with being a person who
wilfully causes harm. Do you work toward redemption?
Do you give in to dark temptation? Remember that
you’re a main character in this story, and that means
having a character arc beyond simply hurting others.
Or, if not, be prepared to have your role change from
protagonist to villain, as the other characters start
sharpening up their stakes.
        """,
        flavour: """
You are beauty eternal. You are the darkness that everyone wants to taste,
but no one dares understand. It’s there in your eyes, your carefully chosen
words, and your every gesture: you no longer have a soul.

Some vampires revel in that fact, their afterlife a tapestry of hedonism and
exsanguination. Others hate the evil in their skin, solemnly vowing to a
chaste and lonely existence. Either way, someone suffers. The choice is yours.
        """,
        stats: [[2, 1, -1, -1], [1, 2, -1, -1]],
        advancements: ["+stat", "self", "self", "any", "any", "vamp"],
        moves: ["Invited", "Hypnotic", "Cold as Ice", "The Feeding", "Marked for the Hunt", "Inescapable"],
        startingMoves: [],
        startingMoveChoices: 2
      },
      "Werewolf" => %{
        names: ["Cassidy", "Candika", "Flinch",
"Levi", "Margot", "Lorrie", "Luna", "Peter",
"Tucker", "Zachary"],
        looks: ["primal", "unkempt", "wiry",
"rugged", "feisty"],
        eyesList: ["cunning eyes",
"predatory eyes", "fierce eyes",
"savage eyes", "wolf eyes"],
        origins: ["born a wolf", "bitten",
"raised by wolves", "ancestral power",
"awoken", "favoured by the moon"],
        backstory: [
          "You lack subtlety. Give a String to everyone.",
          "You’ve spent weeks watching someone from a distance. Their scent and mannerisms are unmistakable to you now. Gain two Strings on them."
        ],
        sexMove: """
When you have sex with someone, you establish a deep
spiritual connection with them. Until either of you breaks
that spirit connection (by having sex with someone else)
add 1 to all rolls made to defend them. You can tell when
that connection has been broken.
        """,
        darkestSelf: """
You transform into a terrifying
wolf-creature. You crave power
and dominance, and those are
earned through bloodshed. If
anyone attempts to stand in your
way, they must be brought down
and made to bleed. You escape
your Darkest Self when you
wound someone you really care
about or the sun rises, whichever
happens first.
        """,
        advice: """
Aggressive, domineering, primal, and amorous. The
Werewolf is primed for violence, and knows that
physical dominance is the root of social power. They
are territorial and dangerous, but they draw people in
with their rough, lusty gorgeousness. Rounding out the
Werewolf is a mystical, animal side: they are strongest
when basked in moonlight and guided by primal
instincts.

Both stat options highlight the Werewolf’s sexy,
dangerous nature. Your choice is about whether they
lean more toward a heart-breaker with a mean streak
(Hot 2 & Volatile 1), or an unpredictable loose-cannon
who it’s dangerous to get too close to (Hot 1 & Volatile
2).

The question of whether you can transform into the
form of a wolf when not your Darkest Self is left up to
individual groups to decide. You have the same stats
and moves regardless of your current form.
        """,
        flavour: """
Everyone around you seems so willing to play the roles they are handed, to
quietly colour within the lines. They’ve been tamed, domesticated. You’re of
a different stock: you’ve broken down the fence built to contain you. You’ve
howled at the moon, and heard it howl back.

Now, the transformation is complete. This is what you were always meant
to be. Wild. Unwavering. Alive.
        """,
        stats: [[1, -1, 2, -1], [2, -1, 1, -1]],
        advancements: ["+stat", "self", "self", "any", "any", "pack"],
        moves: ["Primal Dominance", "Scent of Blood", "Howl at the Moon", "Spirit Armour", "Heightened Senses", "Unstable"],
        startingMoves: [],
        startingMoveChoices: 2
      },
      "Mortal" => %{
        sexMove: """
          When you have sex with someone, it awakens something
          sinister within. The next time you take your eyes off them,
          they become their Darkest Self.
        """,
        names: ["Anne", "Carla", "Deirdre","James", "Jonathan", "Laeli", "Patrick","Robin", "Shen", "Timothy", "Wendy"],
        looks: ["quiet", "desperate", "awkward","beautiful", "displaced"],
        eyesList: ["doe eyes", "sad eyes", "darting eyes", "nervous eyes", "human eyes"],
        origins: ["new kid in town", "kid next door", "your barista", "someone’s girlfriend", "someone’s boyfriend", "nobody"],
        backstory: [
          "Declare your backstory last.",
          "Choose one person to be your Lover. Give them three Strings on you. Take one string on them."
        ],
        darkestSelf: """
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
        """,
        advice: """
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
        """,
        flavour: """
          None of them would understand. What you have here, in this dark and
          secret place, it’s beautiful. They’d warn you that this sort of beauty is
          dangerous, like a raging fire. Well some things are worth getting burned for.
          
          Love has eclipsed all hope, and the dark has left you feeling beautiful.
        """,
        stats: [[2, -1, -1, 1], [2, -1, 1, -1]],
        advancements: ["+stat", "self", "self", "any", "any", "any"],
        moves: [
          "True Love", "Mess With Me, Mess With Him", "Entrenched", "Sympathy is My Weapon",
          "Excuses Are My Armour", "Downward Spiral", "Down the Rabbit Hole"
        ],
        startingMoves: [
          "True Love"
        ],
        startingMoveChoices: 2
      },
      "Witch" => %{
        names: ["Abrielle", "Annalee",
"Cordelia", "Darius", "Evelyn", "Gerard",
"Lucca", "Merrill", "Sabrina", "Vanessa"],
        looks: ["lithe", "guarded", "coy", "edgy",
"meticulous"],
        eyesList: ["calculating eyes", "smirking eyes", "playful eyes", "wicked eyes",
"deep eyes"],
        origins: ["taught by grandma",
"awoken", "pagan initiate", "tumblr",
"avid reader"],
        backstory: [
          "You start the game with two Sympathetic Tokens. Decide whose and what they are.",
          "One of the others caught you rummaging through their friend’s stuff, but hasn’t said anything. They get a String on you."
        ],
        sexMove: """
After sex, you can take a Sympathetic Token from them.
They know about it, and it’s cool.
        """,
        darkestSelf: """
The time for subtlety and
patience is over. You’re too
powerful to put up with their
garbage any longer. You hex
anyone who slights you. All of
your hexes have unexpected side
effects, and are more effective
than you are comfortable with.
To escape your Darkest Self, you
must offer peace to the one you
have hurt the most.
        """,
        advice: """
Brooding, vengeful, secretive, and occult. The Witch
bides their time, silently judging others until an
opportunity for magical retribution and mischief
presents itself.

The two stat options for the Witch slant toward being
either calculating and venomous (Cold 2 & Dark 1) or
seductive and spooky (Hot 1 & Dark 2). Either way, the
Witch relies on patience to be at the height of their
power. Unless they’re willing to chant in tongues, eyes
swirling a cloudy crimson, their low Volatile stat means
they’re not very good at reacting to unexpected threats.

If a character of another Skin takes the Hex-Casting
move without also taking Sympathetic Tokens, the only
way they can cast a Hex is by meeting their target’s
gaze and chanting in tongues – not exactly a subtle
approach.
        """,
        flavour: """
In every lock of hair, every furtive glance, every secret note that transfers
hands during history class – there is an invitation. An invitation to be fucked
with. Not that witchcraft is about fucking with others, exactly, but it’s hard
not to notice how utterly malleable the world is, once you know a thing or
two about magic.

Of course, a good witch like you knows restraint. A good witch turns a blind eye
to all those invitations, and doesn’t think about how sweet vengeance and control
might be. A good witch is above that sort of thing. At least, most of the time.
        """,
        stats: [[-1, 2, -1, 1], [1, -1, -1, 2]],
        advancements: ["+stat", "self", "hex", "nhex", "any", "any", "coven"],
        moves: ["Sympathetic Tokens", "Hex-Casting", "Transgressive Magic", "Sanctuary"],
        startingMoves: ["Sympathetic Tokens", "Hex-Casting"],
        startingMoveChoices: 0
      }
    }
  end
end