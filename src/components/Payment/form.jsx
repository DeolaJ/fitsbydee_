import React, {Component} from 'react'
import { Form, Button, Checkbox, TextArea, Progress, Message } from 'semantic-ui-react'
import FileUploader from 'react-firebase-file-uploader';
import Aux from '../../hoc/Aux'
import axios from 'axios'
import firebase from '../../firebase'
import Loader from '../Loader/loader'

class CheckoutForm extends Component {

  constructor (props) {
    super (props)
    this.state= {
      file: "",
      isUploading: false,
      progress: 0,
      files: [],
      fileUploading: [],
      email: '',
      first_name: '', 
      last_name: '', 
      description: '', 
      address: '',
      size: '',
      loading: false,
      emailValid: false,
      formValid: false
    }

    this.handleProgress = this.handleProgress.bind(this)
    this.handleUploadError = this.handleUploadError.bind(this)
    this.handleUploadStart = this.handleUploadStart.bind(this)
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleUploadStart = (file) => this.setState(prevState => ({ fileUploading: prevState.fileUploading.concat(file), isUploading: true, progress: 0 }));

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  }

  handleUploadSuccess = filename => {
    this.setState(prevState => ({ file: filename, progress: 100, isUploading: false, complete: true, files: prevState.files.concat(filename) }));
    firebase
      .storage()
      .ref("cvs")
  }

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for( let i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  endLoading = () => {
    this.setState({
      loading: false
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

  orderNow = () => {
    this.setState({
      yes: 'yes'
    })
  }

  render () {
    const { progress, complete, files, fileUploading, loading,
      email, first_name, last_name, description, address, size
    } = this.state

    console.log(this.state)

    return (
      <Aux>
        <Form>
          <Form.Group style={{ marginBottom: '0' }}>
            <Form.Input width={8} required label={"First name"} value={first_name} name="first_name" placeholder='Enter your first name' onChange={this.handleChange} />
            <Form.Input width={8} required label={"Last name"} value={last_name} name="last_name" placeholder='Enter your last name' onChange={this.handleChange} />
          </Form.Group>
          <Form.Input id={'email'} required label={"Email address"} value={email} name="email" placeholder='Enter your email address' onChange={this.handleChange} />
          <Message
            error
            visible={(this.state.email.length > 0) && !this.state.emailValid}
            size="small"
          >
            <p>Email address is invalid</p>
          </Message>
          <Form.Field>
            <label>House Address (OPTIONAL)</label>
            <TextArea placeholder='Enter your Home Address' value={address} name="address" rows={2} onChange={this.handleChange}></TextArea>
          </Form.Field>
          <Form.Field>
            <label>Brief Description of Order (OPTIONAL)</label>
            <TextArea placeholder='Enter a brief description of your request' value={description} rows={2} name="description" onChange={this.handleChange}></TextArea>
          </Form.Field>
          <Form.Input id={'size'} required label={"Size"} value={size} name="size" placeholder='Enter your desired size' onChange={this.handleChange} />
          <Form.Group className={'upload-field'}>
            <Form.Field required>
              <label>
                Upload your Picture if available
              </label>

              <FileUploader
                multiple
                accept=".png,.pdf,.jpg"
                storageRef={firebase.storage().ref('cvs')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                className={'primary-sub'}
              />
              {

                this.state.isUploading && 

                fileUploading.map(file => (
                  <div key={file.size} className={'uploading'}>
                    <label>Uploading {file.name}</label>
                    <Progress percent={progress} indicating />
                  </div>
                ))
                
              }

              {
                complete &&

                files.map(file => (
                  <div className={'uploaded'} key={file}>
                    Uploaded {file}
                  </div>
                ))
              }

            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
          </Form.Group>
          <Button fluid type='submit' className={'primary-main'} onClick={this.orderNow}>Place an Order</Button>
        </Form>

      </Aux>
    )
  }
}

export default CheckoutForm
