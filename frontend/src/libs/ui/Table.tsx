import React, { useEffect, useMemo, useState } from 'react';

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

export const StyledHeadCell = withStyles(() =>
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

export type THeadData = {
    title: string
    name: string
    style?: TObject
}
export type TRowsData = TObject<TValueOf<THeadData>>[]

interface ITable {
    headData: THeadData[]
    rowsData: TRowsData
    pageSize?: number //Кол-во строк на странице
    pagination?: boolean
    defaultPage?: number

    onDelete?: (e: React.MouseEvent<HTMLElement>, index: number) => void
    onClickRow: (index: number) => void
}

const Table: React.FC<ITable> = ({
    headData = [],
    rowsData = [],
    pageSize = 10,
    pagination = true,
    defaultPage = 1,
    onDelete,
    onClickRow
}: ITable) =>{

    const classes = useStyles()

    const [pageCount, setPageCount] = useState<number>(Math.ceil(rowsData.length / pageSize))
    const [page, setPage] = useState<number>(defaultPage)

    const rows = useMemo(() => {
        let currentRowsData: any[] = rowsData
        if (onDelete) {
            currentRowsData = currentRowsData.map((item: any, index: number) => ({
                ...item,
                'action': <i
                    className="fas fa-trash table__delete__icon"
                    onClick={(e: React.MouseEvent<HTMLElement>) => onDelete(e, index)}
                ></i>
            }))
        }
        currentRowsData = currentRowsData.slice(pageSize * (page - 1), pageSize * page)
        return currentRowsData
    }, [rowsData, pageSize, page, onDelete])

    const heads:THeadData[] = useMemo(() => {
        const currentHeads = [...headData]
        if (onDelete) {
            currentHeads.push({ name: 'action', title: '', style: { textAlign: 'right' } })
        }
        return currentHeads
    }, [headData, onDelete])

    const handleChangePage = (_: any, number: number) => {
        setPage(number)
    }

    useEffect(() => {
        setPageCount(Math.ceil(rowsData.length / pageSize))
    }, [pageSize, rowsData])

    return (
        <>
            <TableContainer component={Paper}>
                <MTable.default className={classes.table} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            {heads.map((item: THeadData) => (
                                <StyledHeadCell align='center' key={Math.random()}>{item.title}</StyledHeadCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows && rows.map((row: any, index: number) => (
                            <StyledRow
                                key={Math.random()}
                                onClick={() => onClickRow(index)}
                            >
                                {heads.map((col: THeadData) => (
                                    <TableCell
                                        key={Math.random()}
                                        style={{ ...col.style }}
                                    >
                                        {row[col.name]}
                                    </TableCell>
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