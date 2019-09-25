import React, {Component} from 'react'
import { Form, Button, Container, Transition, TextArea, Progress, Message } from 'semantic-ui-react'
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
      full_name: '',
      description: '', 
      address: '',
      size: '',
      gender: '',
      number: '',
      response: null,
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
      .ref("orderpicture")
  }

  // getReference = () => {
  //   let text = "";
  //   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

  //   for( let i=0; i < 15; i++ )
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));

  //   return text;
  // }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  endLoading = (status) => () => {
    
    if (status === "success") {
      this.setState({
        loading: false,
        email: '',
        full_name: '',
        gender: '',
        size: '',
        address: '',
        description: '',
        number: '',
        response: 'Your message was sent successfully'
      })

      setTimeout(
        function () {
          document.location.href = '/thankyou'
        },
        500);
    } else if ( status === "fail" ) {
      this.setState({
        loading: false,
        response: 'There was an error'
      })
      setTimeout(() => (this.setState({ response: null })), 3000)
    }
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

  getReference = () => {
    const { full_name } = this.state;
    let text = full_name;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for( let i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  
  validateForm = () => {

    this.setState({
      formValid: this.state.emailValid
    });
  }

  writeToFirestore = (timestamp, ref) => () => {
    const { db } = this.props;
    const { email, full_name, description, address, gender, size, number } = this.state;
    console.log(db, ref);
    db.collection("order").doc(ref).set({
      "email": email,
      "name": full_name,
      "description": description,
      "address": address,
      "size": size,
      "gender": gender,
      "number": number,
      "timestamp": timestamp
    }).then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  orderNow = () => {
    const { email, full_name, description, address, gender, size, number, formValid } = this.state
    let timestamp = Date();
    var ref = this.getReference();
    timestamp = timestamp.toString();
    if (formValid === false) {
      document.getElementById("email").focus()
    }
    console.log(timestamp, ref);

    if (formValid === true) {
      this.startLoading();
      axios.post('/order-form', {
          "email": email,
          "name": full_name,
          "description": description,
          "address": address,
          "size": size,
          "gender": gender,
          "number": number,
          "timestamp": timestamp
        }).then(response => {
          console.log(response);
          this.endLoading("success");
      }).catch(error => {
        console.log(error);
        this.endLoading("fail")
      })
    }
  }

  render () {
    const { progress, complete, files, fileUploading, gender, response, 
      email, full_name, description, address, size, number, loading
    } = this.state

    const sizes = [
      { key: 's', text: 'Small', value: 'small' },
      { key: 'm', text: 'Medium', value: 'medium' },
      { key: 'l', text: 'Large', value: 'large' },
      { key: 'xl', text: 'Extra Large', value: 'extra large' },
      { key: 'o', text: 'Other (include in description)', value: 'other' }
    ]

    const genders = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' }
    ]

    console.log(this.state)

    return (
      <Aux>
        {
          response &&
          
          <Transition.Group animation={'fly down'} duration={700}>
            <Container textAlign="center">
              <p>{response}</p>
            </Container>
          </Transition.Group>
        }

        <Form>

          <Form.Input width={16} required label={"First name"} value={full_name} name="full_name" placeholder='First name, Last name' onChange={this.handleChange} />
          
          <Form.Input id={'email'} required label={"Email address"} value={email} name="email" placeholder='Enter your email address' onChange={this.handleChange} />

          <Form.Input id={'number'} required label={"Phone number"} value={number} name="number" placeholder='+234----------' onChange={this.handleChange} />
          <Message
            error
            visible={(this.state.email.length > 0) && !this.state.emailValid}
            size="small"
          >
            <p>Email address is invalid</p>
          </Message>
          <Form.Field>
            <label>Delivery Address (OPTIONAL)</label>
            <TextArea placeholder='Enter desired delivery address' value={address} name="address" rows={2} onChange={this.handleChange}></TextArea>
          </Form.Field>
          <Form.Select options={sizes} id={'size'} label={"Size (OPTIONAL)"} value={size} name="size" placeholder='Enter your desired size' onChange={this.handleChange} />
          <Form.Select options={genders} label={"Gender (OPTIONAL)"} value={gender} name="gender" placeholder='Gender' onChange={this.handleChange} />
          <Form.Field>
            <label>Brief Description (OPTIONAL)</label>
            <TextArea placeholder='Enter a brief description of your order' value={description} rows={2} name="description" onChange={this.handleChange}></TextArea>
          </Form.Field>
          <Form.Group className={'upload-field'}>
            <Form.Field required>
              <label>
                Upload your Picture, named appropriately (OPTIONAL)
              </label>

              <FileUploader
                multiple
                accept=".png,.pdf,.jpg"
                storageRef={firebase.storage().ref('orderpicture')}
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
          {/* <Form.Group>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
          </Form.Group> */}
          <Button type='submit' className={'order-button'} floated="right" onClick={this.orderNow}>Place an Order</Button>
        </Form>


        {
          loading && 

          <Loader loading={loading} message={"Processing order"} />
        }

      </Aux>
    )
  }
}

export default CheckoutForm
