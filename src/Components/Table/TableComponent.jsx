import { ContentTable, PaginationTable, TableStyled } from "./TableStyled";
import { ButtonStyled } from "../styled/ButtonStyled";
import { useState } from "react";

export const TableComponent = ({ columns, data }) => {
    const pageSize = 5;

    const createPagination = (array, size) => {
        const aux = [];
        for (let i = 0; i < array.length; i += size)
          aux.push(array.slice(i, i + size));
        return aux;
    };

    const [num, setNum] = useState(0);
    const [pages, setPages] = useState(createPagination(data, pageSize));

    const handlePrev = () => {
        num > 0 && setNum(num - 1);
    };

    const handleNext = () => {
        num + 1 < pages.length && setNum(num + 1);
    };

    return (
        <>
            <TableStyled>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.headerColumn}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pages[num]?.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col, colIndex) => (
                                <ContentTable key={colIndex}>
                                    {col.columnRenderer ? col.columnRenderer(row) : row[col.columnsData]}
                                </ContentTable>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </TableStyled>
            <PaginationTable>
                {num === 0 ? (
                    <ButtonStyled styled='view'>Prev</ButtonStyled>
                ) : (
                    <ButtonStyled onClick={handlePrev} styled='viewBorder'>Prev</ButtonStyled>
                )}

                {num + 1 >= pages.length ? (
                    <ButtonStyled styled='view'>Next</ButtonStyled>
                ) : (
                    <ButtonStyled onClick={handleNext} styled='viewBorder'>Next</ButtonStyled>
                )}
            </PaginationTable>
        </>
    );
};
