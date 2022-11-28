import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { display } from '@mui/system';
import { colors } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/ConfigStore'
import loginReducer, { LoginAction, postSigninApi } from '../../redux/LoginReducer/loginReducer';
import { useNavigate, redirect} from 'react-router-dom';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
interface FormValues {
  email?: string;
  password?: string;
}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      title
  } = props;
  return (
    <div>
        <form onSubmit={handleSubmit}>
        {touched.email && errors.email && (
              <div>{errors.email}</div>
            )}
           <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={touched.email && errors.email ? true : undefined}
              autoComplete="email"
             
              onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
            />
            {touched.password && errors.password && (
              <div >{errors.password}</div>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={touched.password && errors.password ? true : undefined}
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
           
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </form>
            </div>);
};


export default function Login(props: any) {
  const dispatch:DispatchType =useDispatch();
const LoginForm = withFormik<MyFormProps, FormValues>({

  mapPropsToValues:(props) => ({
    email: props.initialEmail,
    password: props.initialPassword
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email is not validation").required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),
  handleSubmit(
    {email, password}: FormValues,
  ){
    console.log("Email and pass", email, password);
    dispatch(postSigninApi({
      email: email,
      password: password
    }));
  },
})(InnerForm);

const {logging} = useSelector((state:RootState)=> state.login);
let navigate = useNavigate();

useEffect(() => {
  // if isUserLoggedIn turned to true redirect to /home
  console.log("logging", logging)
  if (logging == true) {
     navigate("/"); 
  }
}, [logging]); // triggers when isUserLoggedIn changes

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
          <LoginForm />
          </div>  
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}