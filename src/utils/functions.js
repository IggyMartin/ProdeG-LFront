export const divideGames = (arr, division) => {
    const size = Math.ceil(arr.length / division)
    const divided = []
    for (let i = 0; i < arr.length; i += size) {
        divided.push(arr.slice(i, i + size))
    }
    return divided
}

export const getTitle = (stage, index) => {
    if(stage === "groups") {
      return `Grupo ${String.fromCharCode(65 + index)}`; // ASCII code for 'A' is 65
    } else if(stage === "quarterfinals") {
      return `Cuartos ${index + 1}`
    } else if(stage === "semifinals") {
      return `Semifinal ${index + 1}`
    }
}