import { useEffect, useState } from "react"
import { getAllCountriesDB } from "../services/countryService"
import ReactSelect from "react-select"
import getCountryFlag from "../utils/flagsJSON"

function SelectCountry() {
    const [selectOptions, setSelectOptions] = useState([])

    useEffect(() => {
        (async function getCountriesAndSetSelectOptions() {
            const countries = await getAllCountriesDB()
            const mappedCountries = countries.map(country => {
                return {
                    value: country.id,
                    label: country.name,
                    countryImg: getCountryFlag(country.name)
                }
            })
            setSelectOptions(mappedCountries)
        })()
    }, [])

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
            />
        </div>
    )
}

export default SelectCountry