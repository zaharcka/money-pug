import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import moment from 'moment';
import {
  sendNewTransaction,
  getTransactionByBudjetId,
} from '../../redux/actionCreators';
import Divider from '@material-ui/core/Divider';

const AddTransactionModal = props => {
  const { isOpen, onClose } = props;


  const [type, setType] = React.useState('credit');
  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [category, setCategory] = React.useState(null);
  const [pocket, setPocket] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [amount, setAmount] = React.useState(0);


  const categories = useSelector(state => state.api.categories);
  const pockets = useSelector(state => state.api.pockets);
  const currentBudget = useSelector(state => state.api.currentBudget);

  const handleTitle = event => setTitle(event.target.value);
  const handleDescription = event => setDescription(event.target.value);
  const handleChange = event => setType(event.target.value);
  const handleDateChange = date => setSelectedDate(date);
  const handleCategoryChange = event => setCategory(event.target.value);
  const handlePocketChange = event => setPocket(event.target.value);

  const dispatch = useDispatch();

  const getCurrentCategories = () => categories.filter(item => item.budget === currentBudget);
  const getCurrentPockets = () => pockets.filter(item => item.budget === currentBudget);


  const sentTransaction = () => {
    const data = {
      title,
      description,
      category: category.id,
      date: selectedDate,
      debit: type === 'Credit' ? 0 : Number(amount),
      credit: type !== 'Credit' ? 0 : Number(amount),
      pocket: pocket.id,
    };
    dispatch(sendNewTransaction(data));
    onClose();
  };



  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Новая транзакция</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Заголовок транзакции"
          fullWidth
          onChange={event => handleTitle(event)}
          value={title}
        />
        <TextField
          autoFocus
          margin="description"
          id="description"
          label="Описание"
          fullWidth
          onChange={event => handleDescription(event)}
        />
        <RadioGroup aria-label="gender" name="gender1" value={type} onChange={handleChange}>
          <FormControlLabel value="Debit" control={<Radio />} label="Доход" />
          <FormControlLabel value="Credit" control={<Radio />} label="Расход" defaultChecked />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="Бюджет"
          />
        </RadioGroup>
        <InputLabel id="category-label">
          Категория
        </InputLabel>
        <Select
          labelId="category-label"
          id="category-selector"
          onChange={handleCategoryChange}
          fullWidth
        >
          {categories.length !== 0 && getCurrentCategories(categories).map(item => <MenuItem
            value={item}>{item.name}</MenuItem>)}

        </Select>
        <InputLabel id="pocket-label">
          Карман
        </InputLabel>
        <Select
          labelId="pocket-label"
          id="pocket-selector"
          onChange={handlePocketChange}
          fullWidth

        >
          {pockets.length !== 0 && getCurrentPockets(pockets).map(item => <MenuItem
            value={item}>{item.name}</MenuItem>)}

        </Select>
        <TextField
          autoFocus
          margin="dense"
          id="value"
          label="Сумма"
          type="number"
          fullWidth
          onChange={(event) => setAmount(event.target.value)}
        />
      </DialogContent>


      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отменить
        </Button>
        <Button onClick={sentTransaction} color="primary">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionModal;
