import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import useForm from '../../hooks/useForm';
import validate from '../../rules/RegisterFormValidationRules';
import { AuthContext } from '../Auth/AuthProvider';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {

  let [confirmSignUp, setConfirmSignUp] = useState(false); 

  const { values, handleChange, handleChangeCheckbox, handleSubmit, errors } = useForm(handleRegister, validate);
  let { register } = useContext(AuthContext);

  function handleRegister() {
      checkRegister(values);
  }

  function checkRegister(values){
      if(!values.newsletterAccepted){
          values.newsletterAccepted = false;
      }
      if(register(values.firstName, values.lastName, values.email, values.password, values.newsletterAccepted)) {
        setConfirmSignUp(true);
      }

  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {confirmSignUp ? props.history.push('/sucessRegistered') : ''}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={errors.firstName ? errors.firstName : "firstName"}
                autoFocus
                onChange={handleChange}
                value={values.firstName || ''}
                error={errors.firstName ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={errors.lastName ? errors.lastName : "lastName"}
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                value={values.lastName || ''}
                error={errors.lastName ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={errors.email ? errors.email : "Email Address"}
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={values.email || ''}
                error={errors.email ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={errors.password ? errors.password : "Password"}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={values.password || ''}
                error={errors.password ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                onChange={handleChangeCheckbox}
                name="newsletterAccepted"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
  }