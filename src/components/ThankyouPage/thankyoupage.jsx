import React, {Component} from 'react'
import { Grid, Container } from 'semantic-ui-react'
import './thankyoupage.scss'
import Footer from '../Footer/Footer'
import Aux from '../../hoc/Aux'

class VerifyPage extends Component {

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
      const body = document.querySelector('.verifypage-container').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile: mobile
      })
    }

    this.setState({
      success: (reference === 'thank-you') ? true : false
    })
    // this.verifyTransaction(reference)
  }

  // verifyTransaction = (reference) => {
  //   return axios.post("/paystack-verify",
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
        <Grid className={'verifypage-container'}>
          <Grid.Column width={16}>
            <Container textAlign='center' style={{ marginTop: '20%' }}>
              {
                success ? 
                <h2>
                  Thank you for paying for our services. We will love to hear from you
                </h2>

                : 
                <h2>
                  The payment was not successful. Contact us for more details
                </h2>
              }
            </Container>
          </Grid.Column>
        </Grid>

        <Footer />
      </Aux>
    )
  }
}

export default VerifyPage
