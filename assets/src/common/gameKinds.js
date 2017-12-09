export const kindsById = [
  "The Sprawl",
  "Blades in the Dark",
  "Stranger Roads"
]

export const toClassName = kind => kind.toLowerCase().replace(/\s/g, "-");

export const kindsByName = {};
for (let i=0; i < kindsById.length; i++) {
  const name = kindsById[i];
  kindsByName[name] = i;
}