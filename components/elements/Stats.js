import React from 'react'
import PropTypes from 'prop-types'
import { H2 } from './Headers';

export const StatsContainer = ({ header, children }) => {
    if (!children) throw Error("You must provide StatBox children to the StatsContainer.")
    return (
        <div>
            {header && <H2>
                {header}
            </H2>}

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {children}
            </div>
        </div>
    )
}


export const StatBox = ({ header, data }) => {
    return <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                    {header}
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                    {data}
                </dd>
            </dl>
        </div>
    </div>
}
