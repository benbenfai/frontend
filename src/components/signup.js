import React,{ useState, useEffect } from 'react'
import { withRouter } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import {userAction} from '../actions/userAction';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const Signup  = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submit,setSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(userAction.signup(email,username,password));
      setEmail('')
      setUsername('')
      setPassword('')
  }

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: "20px"
    },
    formControl: {
      position: 'relative',
      margin: theme.spacing(0),
      minWidth: 340,
    },
  }));      

const classes = useStyles();

  return (
    <div         
      style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth:340
    }}>
        <ValidatorForm onError={errors => console.log(errors)}
                onSubmit={handleSubmit} className={classes.root} autoComplete="off">

        <FormControl className={classes.formControl}>

          <FormLabel component="legend" style={{fontSize:'24px'}}>Sign up</FormLabel><br/>

          <TextValidator style={{minWidth:'340'}} id="standard-basic" label="Email" 
          name="Email" type="text" onChange={(e) => setEmail(e.target.value)} value={email}
          validators={['required','maxStringLength:200','isEmail','trim']}
          errorMessages={['Email is required','Too long','Please input an email']}/>
          <br/>

        <TextValidator style={{minWidth:'340'}} id="standard-basic" label="Username" 
          name="Username" type="text" onChange={(e) => setUsername(e.target.value)} value={username}
          validators={['required','maxStringLength:20','isString','trim']}
          errorMessages={['Username is required','Too long','Please input a string']}/>
          <br/>

          <TextValidator style={{minWidth:'340'}} id="standard-basic" label="Password" 
          name="Password" type="text" onChange={(e) => setPassword(e.target.value)} value={password}
          validators={['required','maxStringLength:20','isString','trim']}
          errorMessages={['Password is required','Too long','Please input a string']}/>
          <br/><br/>

          <Button type="submit" fullwidth variant="contained" color="primary">Submit</Button>

          <Link to="/login" className="btn btn-link">Sign in</Link>

          </FormControl>
          </ValidatorForm>

    </div>
)
}

export default withRouter(Signup);