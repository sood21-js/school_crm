import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import * as MTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from '@material-ui/core';

import { TObject, TValueOf } from '#src/redux/types/common_types';

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
    rowsPerPage?: number //Кол-во строк на странице
    pagination?: boolean

    onClickRow: (index: number) => void
}

const Table: React.FC<ITable> = ({
    headData = [],
    rowsData = [],
    rowsPerPage = 10,
    pagination = true,
    onClickRow
}: ITable) =>{
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<TRowsData>(rowsData)

    const handleChangePage = (_: any, newPage: React.SetStateAction<number>) => {
        setPage(newPage)
    }

    useEffect(() => {
        setRows(rowsData)
    }, [rowsData])

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
            {/* {pagination &&
            <TablePagination
            // rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={rowsPerPage}
                component="div"
                count={rows.length}
                page={page}
                onChangePage={handleChangePage}
            />
            } */}
        </>
    );
}

export default Table