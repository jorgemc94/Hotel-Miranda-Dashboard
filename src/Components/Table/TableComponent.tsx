import { MouseEventHandler } from 'react';
import { ContentTable, PaginationTable, TableStyled } from "./TableStyled";
import { ButtonStyled } from "../styled/ButtonStyled";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Column {
    headerColumn: string;
    columnsData: string;
    columnRenderer?: (row: any) => JSX.Element;
}

interface TableComponentProps {
    columns: Column[];
    data: any[];
    detailPage?: string;
}

export const TableComponent: React.FC<TableComponentProps> = ({ columns, data, detailPage }) => {
    const pageSize = 5;
    const navigate = useNavigate();

    const createPagination = (array: any[], size: number) => {
        const aux: any[][] = [];
        for (let i = 0; i < array.length; i += size)
            aux.push(array.slice(i, i + size));
        return aux;
    };

    const [num, setNum] = useState<number>(0);
    const [pages, setPages] = useState<any[][]>(createPagination(data, pageSize));

    const handlePrev = () => {
        if (num > 0) setNum(num - 1);
    };

    const handleNext = () => {
        if (num + 1 < pages.length) setNum(num + 1);
    };

    useEffect(() => {
        setPages(createPagination(data, pageSize));
        setNum(0);
    }, [data]);

    const clickDetailsHandle = (id: number) => {
        if (detailPage) {
            navigate(`${detailPage}/${id}`);
        }
    };

    const stopPropagation: MouseEventHandler<HTMLTableCellElement> = (event) => {
        event.stopPropagation();
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
                    {pages[num]?.map((row: any) => (
                        <tr key={row.id} onClick={() => clickDetailsHandle(row.id)}>
                            {columns.map((col, colIndex) => (
                                <ContentTable 
                                    key={colIndex} 
                                    onClick={col.headerColumn === 'Actions' ? stopPropagation : undefined}
                                >
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
