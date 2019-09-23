import React, {Component} from 'react'
import { Grid, Header, Form, Button, Container, TextArea } from 'semantic-ui-react'
import Aux from '../../hoc/Aux'
import './contact.scss'
import axios from 'axios'
import firebase from '../../firebase'

class Contact extends Component {

  constructor (props) {
    super (props)
    this.state= {
      email: '',
      full_name: '',
      message: '', 
      emailValid: false,
      formValid: false,
      mobile: null,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const body = document.querySelector('.contact-container').clientWidth
    window.addEventListener("resize", this.updateValue)

    if (body <= 768 ) {
      this.setState({
        mobile: true
      })
    } else if (body > 768) {
      this.setState({
        mobile: false
      })
    }
  }

  updateValue = () => {
    const body = document.querySelector('.contact-container').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }

  handleChange = (e, { name, value }) => {
    console.log(name, value)
    if ( name === "email") {
      
      this.setState(
        { [name]: value }, 
          () => { this.validateField(name, value)
      })
    } else {
      this.setState({ [name]: value })
    }
  }


  validateField = (fieldName, value) => {
    let emailValid = this.state.emailValid;
  
    switch(fieldName) {
      case 'email':
        var re = /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
        emailValid = re.test(String(value).toLowerCase());
        // emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      default:
        break;
    }
    this.setState({
      emailValid: emailValid
    }, this.validateForm);
  }
  
  validateForm = () => {

    this.setState({
      formValid: this.state.emailValid
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateValue)
  }

  render () {

    const { email, full_name, message, mobile } = this.state;

    return (
      <Grid stackable className={'contact-container'}>
        <Grid.Column width={16}>

          <div className={"contact-form"}>

            <Header as="h2" textAlign="center">
              Contact Us
              <Header.Subheader>For requests and enquiries</Header.Subheader>
            </Header>

            <Form>
              <Form.Input width={16} required label={"Full name"} value={full_name} name="full_name" placeholder='First name, Last name' onChange={this.handleChange} />
              
              <Form.Input id={'email'} width={16} required label={"Email address"} value={email} name="email" placeholder='Enter your email address' onChange={this.handleChange} />
              
              <Form.Field width={16}>
                <label>Message</label>
                <TextArea placeholder='Enter your request or enquiry' value={message} name="messsage" rows={4} onChange={this.handleChange}></TextArea>
              </Form.Field>
              <Button type='submit' floated="right" className={'primary-sub'} onClick={this.orderNow}>Send</Button>
            </Form>
          </div>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Contact