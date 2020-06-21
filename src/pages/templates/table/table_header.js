import React from 'react'
import { func } from 'prop-types'

export default function TableHeader(props) {
    return (
        <>
            <table className={props.css}>
                <thead>
                    <tr>
                        {
                            props.cols.map(col => (<th key={col}>{col}</th>))
                        }
                    </tr>
                </thead>
            </table>
        </>
    )

}          
