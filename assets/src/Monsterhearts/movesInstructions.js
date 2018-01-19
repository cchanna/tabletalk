const numberWords = ["zero", "one", "two", "three", "four"]

export default (startingMoves, startingMoveChoices) => {
  let result = "";
  if (startingMoves.length === 0) {
    let number = null;
    result = `Choose ${numberWords[startingMoveChoices]}`
  }
  else {
    if (startingMoves.length === 1) {
      result += `You get ${startingMoves[0]}`;
    }
    else if (startingMoves.length === 2) {
      result += `You get ${startingMoves[0]} and ${startingMoves[1]}`;
    }
    else {
      const first = startingMoves.slice(0, -1)
      result += `You get ${first.join(", ")}, and ${startingMoves[startingMoves.length - 1]}`; 
    }
    if (startingMoveChoices === 0) {
      result += '.';
    }
    else {
      result += `, and choose ${numberWords[startingMoveChoices]} more:`
    }
  }
  return result;
}