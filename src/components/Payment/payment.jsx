import React, { PureComponent } from 'react'
import { Grid, Button, Container, Icon, Dropdown, Header, Divider, Table, Step } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './payment.scss'
import CheckoutForm from './form'
import firebase from '../../firebase'
import Aux from '../../hoc/Aux'

class Payment extends PureComponent {

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
    const { match } = this.props
    var mobile = this.state.mobile;
    window.addEventListener("resize", this.updateValue)
    window.addEventListener("beforeunload", this.onUnload)
    var db = firebase.firestore()
    if (!mobile) {
      const body = document.querySelector('.payment-container').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile,
        db
      })
    }
  }

  updateValue = () => {
    const body = document.querySelector('.payment-container').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }
    
  componentWillMount () {
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
      <Grid className={'payment-container'}>

          <Grid.Column width={16} className={'stageone-row'}>
            <div className={'return-link'}>
              <Link to='/'>
                <Button className={'primary-sub'}>
                  <Icon name='chevron left' /> Return to Home
                </Button>
              </Link>
            </div>
          </Grid.Column>

          <CheckoutForm db={db} mobile={mobile} unload={this.unloadForm} />

      </Grid>
    )
  }
}

export default Payment
