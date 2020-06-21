import React from 'react'
import parse from 'html-react-parser';
import SortArray from '../../../utils/sort_array';

export default function TableContent(props) {

    const { fields, cols, rows, handleEdit, handleDelete, sortedby } = props;
    //console.log(rows);
    let lines = [...rows];
    if(sortedby) { 
        try {
            let sort_type = sortedby.split('|');
            lines = SortArray(rows, sort_type[0], sort_type[1])
        } catch (error) { }   
    };
    return (
        <div className="card m-1">
            <div className="card-body">
                <table className={props.css}>
                    <thead>
                        <tr>
                            {
                                cols.map(col => {
                                    let colStyle = {
                                        width: col.width ? col.width : ''
                                    }
                                    return (<th key={col.name} style={colStyle} className={(col.align ? 'text-'.concat(col.align) : 'text-left')}>{parse(col.name)}</th>);
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 && 
                            lines.map((row, index) => 
                                (<tr key={index}>
                                    {
                                        fields.map((col, i) => {

                                            //console.log(rows[index].col.name)
                                            if (!col.type) {
                                                return (<td key={i} className={(col.align ? 'text-'.concat(col.align) : 'text-left')}>{row[col.name]}</td>)
                                            } else {
                                                switch (col.type) {
                                                    case 'boolean':
                                                        if (row[col.name] === true || row[col.name] === "true") {
                                                            //console.log('campo', row[col.name])
                                                            return (<td key={i} className="text-center"><i className="fa fa-check text-success"></i></td>)
                                                        } else {
                                                            return (<td key={i} className="text-center"><i className="fa fa-times text-danger"></i></td>)
                                                        }
                                                    case 'image':
                                                        let imgStyle = {
                                                            width: '48px',
                                                            height: '48px',
                                                        }
                                                        return (<td key={i} className="text-center">
                                                            <img src={row[col.name]} className="rounded" style={imgStyle} alt={row[col.name]} />
                                                        </td>)
                                                    case 'delete':
                                                        return (<td key={i} className="text-center">
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row)}>Excluir</button>
                                                        </td>)
                                                    case 'edit':
                                                        return (<td key={i} className="text-center">
                                                            <button className="btn btn-sm  amber accent-4 text-white" onClick={() => handleEdit(row)}>Editar</button>
                                                        </td>)
                                                    case 'nested':
                                                        return (<td key={i} className={(col.align ? 'text-'.concat(col.align) : 'text-left')}>{row[col.name][col.child_node]}</td>)
                                                    case 'edit|delete':
                                                        
                                                        return (<td key={i} className="text-center w-25">
                                                            <button className="btn btn-sm amber accent-4 text-white" onClick={() => handleEdit(row)}>Editar</button>
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row)}>Excluir</button>
                                                        </td>)
                                                    default:
                                                        return (<td key={i} className={(col.align ? 'text-'.concat(col.align) : 'text-left')}>{row[col.name]}</td>)
                                                }
                                            }
                                        })
                                    
                                    }
                                </tr>)
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

