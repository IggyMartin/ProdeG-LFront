import { useEffect, useState } from "react"
import { getAllCountriesDB } from "../services/countryService"
import ReactSelect from "react-select"
import objetoBanderas from "../utils/flagsJSON"

function SelectCountry() {
    const [selectOptions, setSelectOptions] = useState([])

    const getCountryFlag = (country) => {
        for(let key in objetoBanderas) {
            if(key === country) {
                return objetoBanderas[key]
            }      
        }
    }

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
                <img className=" w-6 h-auto aspect-auto" src={country.countryImg} alt="country image" />
                <span>{country.label}</span>
                </div>
            )}
            />
        </div>
    )
}

export default SelectCountry