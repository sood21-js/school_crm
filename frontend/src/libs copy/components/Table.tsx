import React, { useCallback, useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import * as MTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TObject, TValueOf } from '#src/redux/types/common_types';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const StyledHeadCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            fontWeight: 600
        },
    }),
)(TableCell);

export const StyledRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

export type THeadData = string[]
export type TRowsData = TObject<TValueOf<THeadData>>[]

interface ITable {
    headData: THeadData
    rowsData: TRowsData
    pageSize?: number //Кол-во строк на странице
    pagination?: boolean
    defaultPage?: number

    onClickRow: (index: number) => void
}

const Table: React.FC<ITable> = ({
    headData = [],
    rowsData = [],
    pageSize = 10,
    pagination = true,
    defaultPage = 1,
    onClickRow
}: ITable) =>{

    const classes = useStyles()

    const [pageCount, setPageCount] = useState<number>(Math.ceil(rowsData.length / pageSize))
    const [page, setPage] = useState<number>(defaultPage)

    const getRows = useCallback(() => rowsData.slice(pageSize * (page - 1), pageSize * page),
        [
            rowsData,
            pageSize,
            page
        ])

    const [rows, setRows] = useState<TRowsData>([...getRows()])

    const handleChangePage = (_: any, number: number) => {
        setPage(number)
    }

    useEffect(() => {
        setPageCount(Math.ceil(rowsData.length / pageSize))
    }, [pageSize, rowsData])

    useEffect(() => {
        setRows([...getRows()])
    }, [rowsData, page, pageSize, getRows])

    return (
        <>
            <TableContainer component={Paper}>
                <MTable.default className={classes.table} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            {headData.map((title: string) => (
                                <StyledHeadCell align='center' key={Math.random()}>{title}</StyledHeadCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows && rows.map((row: any, index: number) => (
                            <StyledRow 
                                key={Math.random()} 
                                onClick={() => onClickRow(index)}
                            >
                                {headData.map((col: any) => (
                                    <TableCell key={Math.random()}>{row[col]}</TableCell>
                                ))}
                            </StyledRow>
                        ))}
                    </TableBody>
                </MTable.default>
            </TableContainer>
            {pagination &&
                <div style={{margin: `1rem 0`, display: `flex`, width: `100%`}} >
                    <Pagination
                        count={pageCount}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChangePage}
                    />
                </div>
            }
        </>
    );
}

export default Table