import React from 'react';
import { Center, Box, Text, Avatar, Badge, Stack, Grid, GridItem } from '@chakra-ui/react'

const UserCard = props => {

    return (
        <Center>
        <Box display='flex' flexDirection='column' border='1px' borderRadius='10px' borderColor='gray.200' width='25rem' height='auto'>  
            <Box display='flex'>
              <Avatar size='lg' margin='1em' m={2} src={props.user.avatar_url}/>
              <Box>
                <Text fontSize='4xl' color='black.200'> {props.user.name} </Text>
                <Stack>
                  <Badge> {props.user.login} </Badge>
                  {props.user.company !== null && <Badge > Works at {props.user.company} </Badge>}
                </Stack>
              </Box>
            </Box>
            <Box>
              <Text align='center' fontSize='sm' margin='1em'> {props.user.bio} </Text>
            </Box>
            <Box>
                <Text align='center'> Followers: </Text>
                <Grid templateColumns='repeat(3, 1fr)' gap={1}>
                    {
                        props.followers !== '' &&
                        props.followers.map(follower => {
                            return (
                                <GridItem key={follower.id} align='center'>
                                    <button onClick={() => props.handleBadgeClick(follower.login)}>
                                        <Badge> {follower.login} </Badge>
                                    </button>
                                </GridItem>
                                )
                        })
                    }
                </Grid>
            </Box>
        </Box>
      </Center>
    );
}

export default UserCard;


