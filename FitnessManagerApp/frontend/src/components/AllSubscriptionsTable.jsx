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
  { width: 130, label: 'CNP Client', dataKey: 'cnp' },
  { width: 120, label: 'Serviciu', dataKey: 'serviciu' },
  { width: 120, label: 'Data', dataKey: 'data' },
  { width: 120, label: 'Preț (RON)', dataKey: 'pret', numeric: true },
  { width: 140, label: 'Suma Încasată', dataKey: 'suma_incasata', numeric: true },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer 
      {...props} 
      ref={ref} 
      sx={{ 
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.1)', borderRadius: '10px' }
      }} 
    />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow: ({ item: _item, ...props }) => (
    <TableRow 
      {...props} 
      sx={{ 
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25) !important' },
        transition: 'background-color 0.2s ease'
      }} 
    />
  ),
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
          sx={{ 
            backgroundColor: 'transparent',
            color: 'rgba(0, 0, 0, 0.5)', 
            fontWeight: 800,
            fontSize: '11px',
            textTransform: 'uppercase',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            fontFamily: 'Montserrat, sans-serif'
          }}
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
          sx={{ 
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            fontWeight: 600,
            color: '#3b2b1f',
            fontFamily: 'Montserrat, sans-serif',
            padding: '18px 15px'
          }}
        >
          {column.dataKey === 'data' 
            ? new Date(row[column.dataKey]).toLocaleDateString('ro-RO') 
            : column.numeric 
              ? `${row[column.dataKey]} RON` 
              : row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function AllSubscriptionsTable() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/subscriptions')
      .then((response) => {
        setSubscriptions(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching subscriptions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Se încarcă istoricul abonamentelor...</div>;

  return (
    <Paper 
      sx={{ 
        height: 500, 
        width: '100%', 
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        backgroundImage: 'none'
      }}
    >
      <TableVirtuoso
        data={subscriptions}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}