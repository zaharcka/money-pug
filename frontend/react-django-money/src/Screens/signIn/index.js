import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { login } from '../../redux/actionCreators';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const [email, typingEmail] = useState(null);
  const [password, typingPassword] = useState(null);
  const [shouldRememberLogin, toogleMemory] = useState(false);
  const loader = useSelector(state => state.api.loaderLogin);
  const loginError = useSelector(state => state.api.loginError);
  const dispatch = useDispatch();


  const submit = (event) => {
    event.preventDefault();
    dispatch(login({
      username: email,
      password,
      shouldRememberLogin,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBalanceWalletIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => typingEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => typingPassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" disabled />}
            label="Оставаться залогиненным"
            onChange={() => toogleMemory(!shouldRememberLogin)}
          />
          {loginError &&
          <Box fontSize={16} fontStyle="oblique" color="error.main">
          <p>{loginError}</p>
          </Box>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Потерял пароль?
              </Link>
            </Grid>
            <Grid item>

            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>

      </Box>
      <Backdrop className={classes.backdrop} open={loader} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default SignIn;
