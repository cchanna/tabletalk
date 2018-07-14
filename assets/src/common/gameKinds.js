export const kindsById = [
  "Monsterhearts",
  "Swords Without Master",
  "Dream Askew"
]

export const kindsOrder = [2, 0, 1];

export const toClassName = kind => kind.toLowerCase().replace(/\s/g, "-");

export const kindsByName = {};
for (let i=0; i < kindsById.length; i++) {
  const name = kindsById[i];
  kindsByName[name] = i;
}