import React, {Component} from 'react'
import { Grid, Button, List, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './errorpage.scss'
import errorIcon from '../../images/logowhiteboxmedium.png'

class ErrorPage extends Component {

  render () {

    return (
      <Grid className={'errorpage-container'}>
        <Grid.Column width={16}>
          <Container textAlign="center">
            
            <Header as='h1'>
              Oops, Lets take you home
            </Header>

            <div className={'error-image'}>
              <img src={errorIcon} alt='404 page illustration' />
            </div>

            <div>
              <List horizontal>
                <List.Item>
                  <Link to='/'>
                    <Button className={'primary-main'}>
                      Home
                    </Button>
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to='/payment'>
                    <Button className={'order-button'}>
                      Proceed to order
                    </Button>
                  </Link>
                </List.Item>
              </List>
            </div>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ErrorPage
