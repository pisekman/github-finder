import React, { Fragment, Component } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from './components/layout/NavBar'
import axios from 'axios'
import Search from './components/users/Search'
import Users from './components/users/Users'
import './App.css';
import Alert from './components/layout/Alert'
import About from './components/pages/About'
class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null, 
    }
    // async componentDidMount() {
    //     this.setState ({loading: true})
    //     const res = await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    //     console.log(res.data)
    //     this.setState({ users: res.data, loading: false});
    // };

    searchUsers = async (text) => {
        this.setState({loading: true})  
        console.log(this.state.loading)
        const res = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({ users: res.data.items, loading: false});
        console.log(res.data)

    }
    getUser = async (username) => {
        this.setState({loading: true})  
        console.log(this.state.loading)
        const res = await axios.get(`http://api.github.com/search/users/${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({ users: res.data.items, loading: false});
        console.log(res.data)
    }

    clearUsers = () => this.setState({users: [], loading: false});
    setAlert = (msg, type) => {
        this.setState({ alert: { msg: msg, type: type} });
        setTimeout(() => this.setState({alert: null}), 5000)
    }

    render() { 
        const {users, loading} = this.state
        return (
            <Router>
            <div className="App">
                <NavBar/>
                    <div className='container'>
                    <Alert alert={this.state.alert}/>
                    <Switch>
                        <Route exact path='/' 
                        render={props => (
                            <Fragment>
                            <Search 
                            searchUsers={this.searchUsers} 
                            clearUsers={this.clearUsers} 
                            showClear={users.length > 0 ? true : false}
                            setAlert={this.setAlert}
                            />
                            <Users loading={loading} users={users}/>
                            </Fragment>
                        )}/>
                        <Route exact path='/about' component={About}/>
                    </Switch>

                </div>
            </div>
            </Router>
         ) }

}

export default App;
