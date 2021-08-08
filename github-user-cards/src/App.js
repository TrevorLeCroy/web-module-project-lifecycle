import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Center, Box, Text, Input, Avatar, Badge, Stack } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultUsername: 'pakrym',
      user: '',
      userFollowers: ''
    };
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/${this.state.defaultUsername}`)
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });

      axios.get(`https://api.github.com/users/${this.state.defaultUsername}/followers`)
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

  render() {
    return (
      <ChakraProvider>
        <Center height='25vh'>
          <Input placeholder='Enter a github user' variant='flushed' size='xs' width='50rem'/>
        </Center>
        <Center>
          <Box display='flex' flexDirection='column' border='1px' borderRadius='10px' borderColor='gray.200' width='20rem' height='10rem'>  
              <Box display='flex'>
                <Avatar size='lg' margin='1em' m={2} src={this.state.user.avatar_url}/>
                <Box>
                  <Text fontSize='4xl' color='black.200'> {this.state.user.name} </Text>
                  <Stack>
                    <Badge> {this.state.user.login} </Badge>
                    {this.state.user.company !== null && <Badge > Works at {this.state.user.company} </Badge>}
                  </Stack>
                </Box>
              </Box>
              <Box>
                <Text fontSize='sm' margin='1em'> {this.state.user.bio} </Text>
              </Box>
          </Box>
        </Center>
      </ChakraProvider>
    );
  }
}

export default App;
