import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

const TableOfTransaction = props => {
    const {
      transactionsList = [],
    } = props;

    const pockets = useSelector(state => state.api.pockets);
    const newListOfPocket = pockets.filter(item => transactionsList.some(transaction => transaction.pocket.id === item.id));

  const createOldList = (item, i, arr) => {
    if (i === 0) {
      const newItem = item;
      for (const pocket of newListOfPocket) {
        const { name } = pocket;
        newItem[name] = newItem.pocket.id === pocket.id ? newItem.debit - newItem.credit : 0;
      }
      return newItem;
    } else {
      const newItem = item;
      const oldItem = arr[i - 1];
      for (const pocket of newListOfPocket) {
        const { name } = pocket;
        newItem[name] = newItem.pocket.id === pocket.id ? newItem.debit - newItem.credit + oldItem[name] : oldItem[name];
      }
      return newItem;
    }
  };


    const CreateHeader = () => {
      return (
        <TableHead>
          <TableRow>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Категория</TableCell>
            <TableCell align="right">Описание</TableCell>
            <TableCell align="right">Доход</TableCell>
            <TableCell align="right">Расход</TableCell>
            <TableCell align="right">Источник</TableCell>
            {newListOfPocket.length !== 0 && newListOfPocket.map(item => (
              <TableCell align="right">{item.name}</TableCell>))}

            <TableCell align="right">Всего</TableCell>
          </TableRow>
        </TableHead>
      );
    };

    const renderRow = (item) => {
      let total = 0;
      newListOfPocket.forEach(pocket => total += item[pocket.name]);

      return (
        <Tooltip title={item.description} placement="right" onClick={() => alert('!!!')} leaveDelay={300}>
        <TableRow key={`${item.id}${item.debit}${item.date}`}>
          <TableCell align="right">{item.date}</TableCell>
          <TableCell align="right">{item.title}</TableCell>
          <TableCell align="right">{item.category.name}</TableCell>
          <TableCell align="right">{item.debit}</TableCell>
          <TableCell align="right">{item.credit}</TableCell>
          <TableCell align="right">{item.pocket.name}</TableCell>
          {
            newListOfPocket.map(pocket => <TableCell align="right">{item[pocket.name]}</TableCell>)
          }
          <TableCell align="right">{total}</TableCell>
        </TableRow>
        </Tooltip>
      );
    };

    const data = transactionsList.length > 0 ? transactionsList.map(createOldList) : transactionsList;

    return (
      <TableContainer component={Paper}>
        <Table className={{ maxWidth: 650 }} size="small" aria-label="a dense table">
          {transactionsList.length !== 0 && <CreateHeader />}
          <TableBody>
            {transactionsList.length !== 0 && transactionsList.map(transaction => (
              renderRow(transaction, newListOfPocket)
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
;


export default TableOfTransaction;
