import React,{ useState, useEffect} from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import {Collapse,Navbar,NavbarBrand,Nav,NavItem} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/useful/PrivateRoute';
import {history} from './components/useful/history';
import Home from './components/Home';
import Form from './components/login';
import Signup from './components/signup';
import AuthHome from './components/AuthHome';
import HardwareForm from './components/submitform';
import Buildtool from './components/buildtool';
import Tutorial from './components/tutorial';
import Buildlist from './components/buildlist';

const App = () => {

  const user = useSelector(state => state.authentication.user);
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  const [data,setData] = useState({});

  useEffect(() => {
      history.listen((location, action) => {
          dispatch(alertActions.clear());
      });
  }, []);

  return (
    <div>
      <Router history={history}>
        <div className="App">
        <Navbar bg="white" expand="lg">
        <Navbar.Brand href="/">Hi!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {user ?
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
            <div className="justify-content-end">
            <Nav.Link href="/login">Logout</Nav.Link>
            </div>
            </Navbar.Collapse>
          :
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/hardwareinfupload">Hardware</Nav.Link>
            <Nav.Link href="/buildtool">build tool</Nav.Link>
            <Nav.Link href="/tutorial">Tutorial</Nav.Link>
          </Nav>
          <div className="justify-content-end">
            <Nav.Link href="/login"><Navbar.Text>Sign in</Navbar.Text></Nav.Link>
            </div>
          </Navbar.Collapse>
          }

      </Navbar>
      <div>
      {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
      </div>
          <Switch>
            <Route exact path='/' component={() => <Home />}/>
            <PrivateRoute path='/home' component={() => <AuthHome />}/>
            <Route path='/hardwareinfupload' component={() => <HardwareForm />}/>
            <Route path='/buildtool' component={() => <Buildtool data={data} setData={setData}/>}/>
            <Route path='/buildlist' component={() => <Buildlist data={data} setData={setData}/>}/>
            <Route path='/tutorial' component={() => <Tutorial />}/>
            <Route path='/login' component={() => <Form />}/>
            <Route path='/signup' component={() => <Signup />}/>
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
      </div>
    );
}

export default App;
