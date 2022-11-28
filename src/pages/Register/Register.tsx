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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { postSignupApi } from '../../redux/LoginReducer/SignupReducer';


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
  name?: string;
  gender?: boolean;
  phone?: number;
}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
  initialName?: string;
  initialGender?: boolean;
  initialPhone?: number;

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
             {touched.name && errors.name && (
              <div >{errors.name}</div>
            )}
             <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="text"
              id="name"
              error={touched.name && errors.name ? true : undefined}
              autoComplete="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
 {touched.gender && errors.gender && (
              <div >{errors.gender}</div>
            )}
           <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
      
        name="gender"
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={values.gender}
      >
        <FormControlLabel value="true" control={<Radio />} label="Female" />
        <FormControlLabel value="false" control={<Radio />} label="Male" />
      
      </RadioGroup>
    </FormControl>
    {touched.phone && errors.phone && (
              <div >{errors.phone}</div>
            )}
             <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="phone"
              type="text"
              id="phone"
              error={touched.phone && errors.phone ? true : undefined}
              autoComplete="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            </form>
            </div>);
};


export default function Login(props: any) {
  const dispatch:DispatchType =useDispatch();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const LoginForm = withFormik<MyFormProps, FormValues>({

  mapPropsToValues:(props) => ({
    email: props.initialEmail,
    password: props.initialPassword,
    gender: props.initialGender,
    name: props.initialName,
    phone: props.initialPhone
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email is not validation").required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string().matches(phoneRegExp, 'Phone is not valid'),
    gender: Yup.boolean().required("gender is required"),
  }),
  handleSubmit(
    {email, password,name,phone,gender}: FormValues,
  ){
    console.log("Sign Up", email, password, name, phone, gender);
    dispatch(postSignupApi({
      email: email,
      password: password,
      gender: gender,
      name: name,
      phone: phone
    }));
  },
})(InnerForm);

const {status} = useSelector((state:RootState)=> state.signup);
let navigate = useNavigate();

useEffect(() => {
  // if isUserLoggedIn turned to true redirect to /home
  if (status == true) {
    navigate("/login"); 
 }
}, [status]); // triggers when isUserLoggedIn changes

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
          Sign Up
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