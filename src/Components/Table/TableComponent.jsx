import { Table } from "./TableStyled"

export const TableComponent = ({ columns, data }) => {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.headerColumn}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.columnRenderer ? col.columnRenderer(row) : row[col.columnsData]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}