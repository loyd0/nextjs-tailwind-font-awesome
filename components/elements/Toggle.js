import React from 'react'
import PropTypes from 'prop-types'

const Toggle = ({ toggled, setToggled }) => {

    return (
        <span 
            role="checkbox" 
            tabindex="0" 
            onClick={() => setToggled(!toggled)}
            aria-checked="false" className={`${toggled ? "bg-indigo-600" : "bg-gray-200"} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}>
            <span aria-hidden="true" className={`${toggled ? "translate-x-5" : "translate-x-0"} inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}></span>
        </span>
    )
}

Toggle.propTypes = {

}

export default Toggle
