import { useEffect, useRef, useState } from "react"
import ReactSelect from "react-select"
import { getCountriesAndSetSelectOptions } from "../utils/functions"

function SelectCountry({place = null, addToTopFour = null, selectRivals = null, matchId = null, setLeftCountry = null}) {
    const [selectOptions, setSelectOptions] = useState([])

    const handleAddToTopFour = (selectedCountry) => {
        addToTopFour(place, selectedCountry)
    }

    const handleSelectedCountry = (selectedCountry) => {
        selectRivals(selectedCountry, matchId, setLeftCountry)
    }

    useEffect(() => {
        (async function() {
            const countriesForSelect = await getCountriesAndSetSelectOptions()
            setSelectOptions(countriesForSelect)
        })()
    }, [])

    useEffect(() => {
        console.log(selectOptions)
    }, [selectOptions])

    return (
        <div className="w-52">
            <ReactSelect
            options={selectOptions}
            placeholder="Paises"
            isSearchable={false}
            formatOptionLabel={country => (
                <div className="flex gap-2 text-black">
                    <img className=" w-6 h-auto object-contain" src={country.countryImg} alt="country image" />
                    <span>{country.label}</span>
                </div>
            )}
            onChange={place ? handleAddToTopFour : handleSelectedCountry}
            menuPortalTarget={document.body}
            />
        </div>
    )
}

export default SelectCountry