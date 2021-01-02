import React , {useEffect} from 'react';
import Nav from './components/Nav/Nav'
import routes from './routes'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUser} from './redux/userReducer'
import './App.css';

function App(props) {

  useEffect((e) => {
    const getUser = () => {
      axios.get('/auth/getUser')
      .then(res => {
          props.updateUser(res.data)
      })
      .catch(err => console.log(err))
    }
    if (props.userReducer.user_id) {
      getUser()
    }
  }, [props])
  
  return (
    <div className="App">
      <Nav />
      <div className = 'body'>
        {routes}
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {updateUser})(App);
