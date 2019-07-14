import React, {Fragment, useEffect} from 'react';
import './style/App.css';
import './style/Loader.css';
import './style/Customize.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import CreateItem from './components/layout/CreateItem';
import Main from './components/layout/Main';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import UpdateItem from './components/layout/UpdateItem';
import Landing from './components/layout/Landing';
import Setting from './components/setting/Setting';
import CreateNote from './components/setting/CreateNote';
import ViewMyNote from './components/setting/ViewMyNote';
import UpdateNote from './components/setting/UpdateNote';
import ViewProfile from './components/setting/ViewProfile';
import ChangePassword from './components/setting/ChangePassword';
import Recovery from './components/auth/Recovery';
import ResetPasswordQuestion from './components/auth/ResetPasswordQuestion';
import ResetPassword from './components/auth/ResetPassword';
import MonthlyChart from './components/chart/MonthlyChart';
//redux
import Store from './store';
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';
import setAuthToken from './utility/setAuthToken';



if (localStorage.token){ //set the default token or it won't work
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    Store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={Store}>
      <Router>
      <Navbar/>
        <section className="container">
          <Fragment>
          
            <Alert/>
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/recovery' component={Recovery}/>
              <Route exact path='/resetpassword/:id' component={ResetPasswordQuestion}/>
              <Route exact path='/newpassword/:id' component={ResetPassword}/>
              <PrivateRoute exact path='/create' component={CreateItem}/>
              <PrivateRoute exact path='/main' component={Main}/>
              <PrivateRoute exact path='/api/item/:id' component={UpdateItem}/>
              <PrivateRoute exact path='/setting' component={Setting}/>
              <PrivateRoute exact path='/createnote' component={CreateNote}/>
              <PrivateRoute exact path='/monthlychart' component={MonthlyChart}/>
              <PrivateRoute exact path='/viewmynote' component={ViewMyNote}/>
              <PrivateRoute exact path='/api/note/:id' component={UpdateNote}/>
              <PrivateRoute exact path='/viewprofile' component={ViewProfile}/>
              <PrivateRoute exact path='/changepassword' component={ChangePassword}/>
            </Switch>
          </Fragment>
        </section>
      </Router>
    </Provider>
  );

}

export default App;
