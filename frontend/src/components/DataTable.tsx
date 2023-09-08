import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataItem } from '../interfaces/interfaces';
import './DataTable.css';

interface DataTableProps {
    data: DataItem[];
}

function DataTable({ data }: DataTableProps) {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <TableContainer sx={{ m: 1 }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ backgroundColor: '#1e2044', color: 'white', fontWeight: 'bold' }}>Código</TableCell>
                        <TableCell style={{ backgroundColor: '#1e2044', color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
                        <TableCell style={{ backgroundColor: '#1e2044', color: 'white', fontWeight: 'bold' }}>Preço Atual</TableCell>
                        <TableCell style={{ backgroundColor: '#1e2044', color: 'white', fontWeight: 'bold' }}>Novo Preço</TableCell>
                        <TableCell style={{ backgroundColor: '#1e2044', color: 'white', fontWeight: 'bold' }}>Erros</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <TableCell>{item.code}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{formatCurrency(Number(item.sales_price))}</TableCell>
                            <TableCell>{formatCurrency(Number(item.new_price))}</TableCell>
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
