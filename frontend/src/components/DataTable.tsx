import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataItem } from '../interfaces/interfaces';

interface DataTableProps {
    data: DataItem[];
}

function DataTable({ data }: DataTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Preço Atual</TableCell>
                        <TableCell>Novo Preço</TableCell>
                        <TableCell>Erros</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.code}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.sales_price}</TableCell>
                            <TableCell>{item.new_price}</TableCell>
                            <TableCell>
                                {item.errors.map((error: string, errorIndex: number) => (
                                    <div key={errorIndex}>{error}</div>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;
