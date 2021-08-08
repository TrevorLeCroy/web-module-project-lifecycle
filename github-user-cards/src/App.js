import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Center, Input, Button } from '@chakra-ui/react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import React from 'react';
import UserCard from './components/UserCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultUsername: 'pakrym',
      searchName: '',
      user: '',
      userFollowers: '',
      lastUsers: [],
    };
  }

  componentDidMount() {
    this.requestUserData(this.state.defaultUsername);
    this.requestUserFollowerData(this.state.defaultUsername);
  }

  requestUserData = (user) => {
    axios.get(`https://api.github.com/users/${user}`, {headers: {'User-Agent': 'https://api.github.com/meta'}})
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  requestUserFollowerData = (user) => {
    axios.get(`https://api.github.com/users/${user}/followers`, {headers: {'User-Agent': 'User-Card-App'}})
    .then(res => {
      console.log(res);
      this.setState({
        ...this.state,
        userFollowers: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  submitSearch = e => {
    e.preventDefault();
    
    this.addPreviousUser();
    this.requestUserData(this.state.searchName);
    this.requestUserFollowerData(this.state.searchName);
    this.clearSearchField();
  }

  submitBack = e => {
    e.preventDefault();

    let lastUser = this.state.lastUsers.pop();
    this.requestUserData(lastUser);
    this.requestUserFollowerData(lastUser);
  }

  doDisableBackButton = () => {
    if (this.state.lastUsers.length === 0) {
      return true;
    } 
    return false;
  }

  clearSearchField = e => {
    this.setState({
      ...this.state,
      searchName: ''
    });
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value
    })
  }

  addPreviousUser = () => {
    this.setState({
      ...this.state,
      lastUsers: [...this.state.lastUsers, this.state.user.login],
    });
  }

  handleBadgeClick = user => {
    this.addPreviousUser();

    this.requestUserData(user);
    this.requestUserFollowerData(user);
  }

  render() {
    return (
      <ChakraProvider>
        <Center height='25vh'>
          <Button onClick={this.submitBack} size='xs' isDisabled={this.doDisableBackButton()}> <AiOutlineArrowLeft/> </Button>
          <Input name='searchName' value={this.state.searchName} onChange={this.handleChange} placeholder='Enter a github user' variant='flushed' size='xs' width='50rem'/>
          <Button onClick={this.submitSearch} size='xs' rightIcon={<AiOutlineArrowRight/>}> Search </Button>
        </Center>
        <UserCard handleBadgeClick={this.handleBadgeClick} followers={this.state.userFollowers} user={this.state.user}/>
      </ChakraProvider>
    );
  }
}

export default App;
