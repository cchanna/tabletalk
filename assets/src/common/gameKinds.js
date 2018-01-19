export const kindsById = [
  "Monsterhearts",
]

export const kindsOrder = [0];

export const toClassName = kind => kind.toLowerCase().replace(/\s/g, "-");

export const kindsByName = {};
for (let i=0; i < kindsById.length; i++) {
  const name = kindsById[i];
  kindsByName[name] = i;
}