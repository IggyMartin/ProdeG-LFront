import { useEffect, useRef, useState } from "react"
import ReactSelect from "react-select"
import { getCountriesAndSetSelectOptions } from "../utils/functions"

/**
 * @module Componente_SelectCountry
 * @description Componente que maneja la selección de un país de un 'dropdown' de todos los paises posibles
 */
function SelectCountry({place = null, addToTopFour = null, selectRivals = null, matchId = null, setLeftCountry = null}) {
    const [selectOptions, setSelectOptions] = useState([])

    /**
     * Función que maneja agregar el país seleccionado al top cuatro
     * @function handleAddToTopFour
     * @param {Object} selectedCountry - El país seleccionado a agregar
     */
    const handleAddToTopFour = (selectedCountry) => {
        addToTopFour(place, selectedCountry)
    }

    /**
     * Función que maneja la selección de un país y setea rivales para un partido (para cuartos de final en adelante)
     * @function handleSelectedCountry
     * @param {Object} selectedCountry - El país seleccionado
     */
    const handleSelectedCountry = (selectedCountry) => {
        selectRivals(selectedCountry, matchId, setLeftCountry)
    }

    /**
     * Al montarse el componente, busca la lista de paises y actualiza el estado que los almacena para luego utilizarlos en las opciones del 'dropdown'
     * @function useEffect
     */
    useEffect(() => {
        (async function() {
            const countriesForSelect = await getCountriesAndSetSelectOptions()
            setSelectOptions(countriesForSelect)
        })()
    }, [])

    return (
        <div className="w-52">
            <ReactSelect
            styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "8px",
                  backgroundColor: "#F0F0F0"
                }),
              }}
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