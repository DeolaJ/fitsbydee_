import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Sidebar, Segment } from "semantic-ui-react"
import Loadable from 'react-loadable';
import LoaderHome from './components/Loader/loader-home'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import VerticalSidebar from './components/Sidebar/VerticalSidebar'

const HomepageLoadable = Loadable({
  loader: () => import('./components/Homepage/homepage'),
  loading() {
    return <LoaderHome />
  }
});

const ContactLoadable = Loadable({
  loader: () => import('./components/Contact/contact'),
  loading() {
    return <LoaderHome />
  }
});

const PaymentLoadable = Loadable({
  loader: () => import('./components/Payment/payment'),
  loading() {
    return <LoaderHome />
  }
});

const TransactionsLoadable = Loadable({
  loader: () => import('./components/Transactions/transactions'),
  loading() {
    return <LoaderHome />
  }
});

const VerifyLoadable = Loadable({
  loader: () => import('./components/VerifyPage/verifypage'),
  loading() {
    return <LoaderHome />
  }
});

const ErrorLoadable = Loadable({
  loader: () => import('./components/ErrorPage/errorpage'),
  loading() {
    return <LoaderHome />
  }
});

class App extends Component {
  state = {
    navItems: [
      {
        id: 'home',
        name: 'Home',
        link: '/'
      },
      {
        id: 'contact',
        name: 'Contact',
        link: '/contact'
      }
    ],
    mobile: null,
    animation: 'uncover',
    direction: 'left',
    dimmed: true,
    visible: false,
    navVisible: true,
    activeitem: ""
  }

  componentDidMount () {
    const body = document.querySelector('body').clientWidth
    window.addEventListener("resize", this.updateValue)
    const url = window.location.href

    if (url.includes("contact")) {
      this.setState({ activeitem: "contact"})
    } else {
      this.setState({ activeitem: "home"})
    }

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

  changeActiveState = (e, { id }) => {
    this.setState({ activeitem: id })
  }

  updateValue = () => {
    const body = document.querySelector('body').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }

  handleSidebar = () =>
  this.setState(prevState => ({ visible: !prevState.visible, navVisible: !prevState.navVisible }))

  componentWillMount () {
    window.removeEventListener("resize", this.updateValue)
  }
 
  render () {
    const { navItems, mobile, animation, dimmed, direction, visible, navVisible } = this.state
    
    return (
      <div className={'body'}>

        <Router basename={'/'}>

          <Nav navItems={navItems} mobile={mobile} handleSidebar={this.handleSidebar} changeActiveState={this.changeActiveState} navVisible={navVisible} />

          <Sidebar.Pushable as={Segment} style={{margin: '0', border: 'none' }} >
            <VerticalSidebar animation={animation} direction={direction} visible={visible} handleSidebar={this.handleSidebar}  changeActiveState={this.changeActiveState} navItems={navItems} />

            <Sidebar.Pusher dimmed={dimmed && visible} onClick={ !visible ? null : this.handleSidebar} >
              <Switch>
                <Route exact path={'/'} component={HomepageLoadable} />
                <Route path={'/contact'} component={ContactLoadable} />
                <Route path={'/payment'} component={PaymentLoadable} />
                <Route path={'/transactions'} component={TransactionsLoadable} />
                <Route path={'/verify/:reference'} component={VerifyLoadable} />
                <Route component={ErrorLoadable} />
              </Switch>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          
          <Footer/>
        </Router>

      </div>
    )
  }
}

export default App;
