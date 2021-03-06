import React, { PureComponent } from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import './orderpage.scss'
import CheckoutForm from './form'
import firebase from '../../firebase'

class OrderPage extends PureComponent {

  constructor (props) {
    super (props)
    this.state = {
      stageOne: true,
      mobile: null,
      db: {},
    }

    this.onUnload = this.onUnload.bind(this)
  }

  componentDidMount () {
    var mobile = this.state.mobile;
    window.addEventListener("resize", this.updateValue)
    window.addEventListener("beforeunload", this.onUnload)
    var db = firebase.firestore()
    if (!mobile) {
      const body = document.querySelector('body').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile,
        db
      })
    }
  }

  updateValue = () => {
    const body = document.querySelector('body').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }
    
  componentWillUnmount () {
    window.removeEventListener("resize", this.updateValue)
    window.removeEventListener("beforeunload", this.onUnload)
  }

  onUnload(event) { // the method that will be used for both add and remove event
      console.log("hellooww")
      event.returnValue = "Hellooww"
  }

  unloadForm = () => {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  render () {

    const {  mobile } = this.state
    const { db } = this.state

    return (
      <Grid className={'orderpage-container'}>

        <Grid.Column width={16}>

          <Container className={'checkout-form'}>

            <Header as="h2" className={"section-title"} textAlign="center">
              Order Form
            </Header>
            <br/>
            <CheckoutForm db={db} mobile={mobile} unloadForm={this.unloadForm} />

          </Container>

        </Grid.Column>

      </Grid>
    )
  }
}

export default OrderPage
