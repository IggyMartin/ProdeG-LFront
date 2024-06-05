import { countriesFlags } from "./flagsJSON"
import { getAllCountriesDB } from "../services/countryService"

const countriesFlagsObj = countriesFlags
console.log(countriesFlagsObj)

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
    } else {
      if(index === 0) {
        return "Tercer Puesto"
      } else {
        return "Final"
      }
    }
}

export const convertToDateObject = (dateString) => {
  const [datePart, timePart] = dateString.split('T');
  
  const [year, month, day] = datePart.split('-');
  
  const [hours, minutes, seconds] = timePart.split(':');
  
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const topFourPredictionCountriesWithFlags = (topFourArray) => {
  const countriesWithFlags = []
  topFourArray.forEach(countryName => {
    for(let key in countriesFlagsObj) {
      if(key === countryName) {
          countriesWithFlags.push({
            name: countryName,
            flag: countriesFlags[key]
          })
      }      
    }
  })
  return countriesWithFlags
}

export const getCountriesAndSetSelectOptions = async () => {
  const countries = await getAllCountriesDB()
  const mappedCountries = countries.map(country => {
      return {
          value: country.id,
          label: country.name,
          countryImg: getCountryFlag(country.name)
      }
  })
  return mappedCountries
}

export const getCountryFlag = (country) => {
  for(let key in countriesFlagsObj) {
      if(key === country) {
          return countriesFlagsObj[key]
      }      
  }
}