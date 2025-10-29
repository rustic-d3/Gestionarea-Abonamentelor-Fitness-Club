import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useState, useEffect } from 'react';
import axios from 'axios';

const columns = [
  { width: 100, label: 'CNP', dataKey: 'cnp' },
  { width: 100, label: 'Nume', dataKey: 'nume' },
  { width: 100, label: 'Prenume', dataKey: 'prenume' },
  { width: 150, label: 'Adresa', dataKey: 'adresa', numeric: true },
  { width: 100, label: 'Telefon', dataKey: 'telefon' },
  { width: 130, label: 'Disponibil', dataKey: 'disponibil' },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function AllUsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then((response) => {
        setUsers(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  // Build rows from users
  const rows = users.map(user => ({
    cnp: user.cnp,
    nume: user.nume,
    prenume: user.prenume,
    adresa: user.adresa,
    telefon: user.telefon,
    disponibil: user.disponibil,
  }));

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
