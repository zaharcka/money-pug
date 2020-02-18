import React from 'react';
import NavigationBar from '../../Components/NavigationBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  Container,
  Grid,
} from '@material-ui/core';
import Table from '../../Components/ListOfTransaction';
import BudgetCard from '../../Components/BadgetCard';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import MoneyMenu from '../../Components/MoneyMenu';
import {
  getTransactionByBudjetId,
  logout,
} from '../../redux/actionCreators';
import AddTransactionModal from '../../Components/AddTransactionsModal';


const Dashboard = () => {
  const budgets = useSelector(state => state.api.budgets);
  const currentBudget = useSelector(state => state.api.currentBudget);
  const fullListOfTransactions = useSelector(state => state.api.fullListOfTransactions);
  const [open, setOpen] = React.useState(false);
  const [isAddModalOpen, toggleAddModal] = React.useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTransactionOfBudget = id => {
    dispatch(getTransactionByBudjetId(id));
  };

  const tryLogout = () => {
    (
      dispatch(logout())
    );
  };

  return (
    <div>
      <NavigationBar clickMenuBtn={handleDrawerOpen} onLogout={tryLogout} />
      <MoneyMenu handleDrawerClose={handleDrawerClose} isOpen={open} />
      <Container fixed style={{ marginTop: '20px' }}>
        <Table transactionsList={fullListOfTransactions} />
        <div style={{ marginTop: 20 }}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
          >
            {
              !currentBudget && budgets && budgets.length && budgets.map(
                (item, index) =>
                  (<Grid item md={4} key={index}>
                    <BudgetCard item={item} onOpenClick={getTransactionOfBudget} index={index}
                      isActive={currentBudget === item.id} />
                  </Grid>))
            }
          </Grid>
        </div>
        {currentBudget && <Fab color="primary" aria-label="add" style={{
          position: 'absolute',
          bottom: 150,
          right: 150,
        }}>
          <AddIcon onClick={() => toggleAddModal(!isAddModalOpen)} />
        </Fab>}
      </Container>
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => toggleAddModal(!isAddModalOpen)} />
    </div>
  );
};

export default Dashboard;
