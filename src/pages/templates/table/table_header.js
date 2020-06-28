import React from 'react'
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
