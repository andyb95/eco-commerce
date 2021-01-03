import React , {useEffect, useState} from 'react';
import Nav from './components/Nav/Nav'
import routes from './routes'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUser} from './redux/userReducer'
import {updateCart} from './redux/cartReducer'
import './App.css';

function App(props) {
  const [userRetrieved, setUserRetrieved] = useState(false)

  useEffect((e) => {
    const getUser = async () => {
      await axios.get('/auth/getUser')
      .then(res => {
          props.updateUser(res.data)
      })
      .catch(err => console.log(err))
    }
    const getCart = async (id) => {
      await axios.get(`/api/users/${id}/cart`)
      .then(res => {
        props.updateCart(res.data.length)
      })
      .catch(e => console.error(e))
      setUserRetrieved(true)
    }
    if (!userRetrieved) {
      getUser()
      if (props.userReducer.user_id) {
        getCart(props.userReducer.user_id)
      }
    }
  }, [props, userRetrieved])
  
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

export default connect(mapStateToProps, { updateUser, updateCart })(App);
