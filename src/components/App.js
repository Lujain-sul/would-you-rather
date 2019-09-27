import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Login from './Login'
import NewQuestion from './NewQuestion'
import Navigation from './Nav'
import LeaderBoard from './LeaderBoard'
import Poll from './Poll'
import 'bootstrap/dist/css/bootstrap.min.css';

/**
* development guide from:
* https://github.com/udacity/reactnd-chirper-app
*/
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {
              this.props.loading ?
              <Login />
                : <div>
                <Navigation />
                <Route path='/' exact component={Dashboard}/>
                <Route path='/leaderboard' exact component={LeaderBoard}/>
                <Route path='/add' exact component={NewQuestion}/>
                <Route path='/questions/:question_id' exact component={Poll}/>
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
