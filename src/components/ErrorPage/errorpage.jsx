import React, {Component} from 'react'
import { Grid, Button, List, Container, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './errorpage.scss'
import Footer from '../Footer/Footer'
import Aux from '../../hoc/Aux'
import errorIcon from '../../images/logo.png'

class ErrorPage extends Component {

  render () {

    return (
      <Aux>
        <Grid className={'errorpage-container'}>
          <Grid.Column width={16}>
            <Container>
              <Header as='h1'>
                Oops, Lets take you home
              </Header>
              <img src={errorIcon} alt='404 page illustration' style={{ width: '100%' }} />
              <List horizontal>
                <List.Item>
                  <Link to='/'>
                    Home
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to='/payment'>
                    Proceed to Request
                  </Link>
                </List.Item>
              </List>
            </Container>
          </Grid.Column>
        </Grid>

        <Footer />
      </Aux>
    )
  }
}

export default ErrorPage
