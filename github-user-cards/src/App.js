import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Center, Box, Text, Input, Avatar, Badge, Stack, Button } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';
import React from 'react';
import UserCard from './components/UserCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultUsername: 'pakrym',
      user: '',
      userFollowers: '',
      lastUser: ''
    };
  }

  componentDidMount() {
    this.requestUserData(this.state.defaultUsername);
    this.requestUserFollowerData(this.state.defaultUsername);
  }

  requestUserData = (user) => {
    axios.get(`https://api.github.com/users/${user}`)
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
    axios.get(`https://api.github.com/users/${user}/followers`)
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

  submitSearch = () => {
    // make another request
  }

  handleChange = () => {

  }

  handleBadgeClick = (user) => {
    this.requestUserData(user)
  }

  render() {
    return (
      <ChakraProvider>
        <Center height='25vh'>
          <Input placeholder='Enter a github user' variant='flushed' size='xs' width='50rem'/>
          <Button onClick={() => {this.submitSearch()}} size='xs' rightIcon={<AiOutlineArrowRight/>}> Search </Button>
        </Center>
        <UserCard handleBadgeClick={this.handleBadgeClick} followers={this.state.userFollowers} user={this.state.user}/>
      </ChakraProvider>
    );
  }
}

export default App;
