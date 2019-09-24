import React, {Component} from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import './thankyoupage.scss'
import Footer from '../Footer/Footer'
import Aux from '../../hoc/Aux'

class ThankyouPage extends Component {

  constructor (props) {
    super (props)
    this.state = {
      mobile: null,
      success: null
    }
  }
  componentDidMount () {
    const { match } = this.props
    const { reference } = match.params
    var mobile = this.state.mobile;
    if (!mobile) {
      const body = document.querySelector('.thankyoupage-container').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile: mobile
      })
    }

    this.setState({
      success: (reference === 'thank-you') ? true : false
    })
    // this.thankyouTransaction(reference)
  }

  // thankyouTransaction = (reference) => {
  //   return axios.post("/paystack-thankyou",
  //     {
  //       reference: reference
  //     }).then(response => {
  //       // const modal = document.querySelector('.modal')
      
  //       const success = response.data.data.message === 'Verification successful' ? true : false
  //     this.setState({
  //       success
  //     })
  //     // this.handleOpen()
  //     // const iframe = document.querySelector('.modal iframe')
  //     // iframe.setAttribute('src', response.data.data.authorization_url);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }

  render () {
    const { success } = this.state

    return (
      <Aux>
        <Grid className={'thankyoupage-container'}>
          <Grid.Column width={16}>
            <Container textAlign='center' style={{ marginTop: '20%' }}>
              <Header as="h2">
                Thank you for filling the form. We will love to hear from you
              </Header>

              <Header as="h3">
                One of our agents will contact you soon to confirm your order

                <br/><br/>
                However, if you will like to speak to an agent, click <a href="google.com">here</a>
              </Header>
            </Container>
          </Grid.Column>
        </Grid>

        <Footer />
      </Aux>
    )
  }
}

export default ThankyouPage
