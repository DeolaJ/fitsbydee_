import React from 'react'
import PropTypes from 'prop-types'
import { Container, Grid, Header, Image, Segment } from 'semantic-ui-react'
import loader from '../../images/logowhitebox.png'
import Typist from 'react-typist'

export default class Loader extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }
  render () {
    const { loading, message } = this.props
    const loaderStyles = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '70vh',
    }
    return (
      loading &&
        <Container text>
          <Grid.Column width={16}>
            <Segment
              basic
              padded={'very'}
              textAlign={'center'}
              style={loaderStyles}
            >
              {<Image
                alt={'Loader image'}
                centered
                size={'small'}
                src={loader}
              />}
              {
                message &&

                <Header as={'h3'} size={'large'} style={{ color: 'white', fontFamily: "'Asap Condensed', 'Lato', sans-serif !important" }}>
                  <Typist cursor={{
                  show: false,
                  blink: true,
                  element: '|',
                  hideWhenDone: true,
                  hideWhenDoneDelay: 1000,
                }} avgTypingDelay={100}>
                  {message} ...
                  </Typist>
              </Header>
              }
            </Segment>
          </Grid.Column>
        </Container>
    )
  }
}
