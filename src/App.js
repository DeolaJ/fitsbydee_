import React, { Component } from 'react'
import './App.scss'
import { HashRouter, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Sidebar, Segment } from "semantic-ui-react"
import Loadable from 'react-loadable';
import Loader from './components/Loader/loader'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import VerticalSidebar from './components/Sidebar/VerticalSidebar'
import Homepage from './components/Homepage/homepage'
import Contact from './components/Contact/contact'
import OrderPage from './components/OrderPage/orderpage'
import ProductGallery from './components/ProductGallery/productgallery'

const OrdersLoadable = Loadable({
  loader: () => import('./components/Orders/orders'),
  loading() {
    return <Loader message={""} loading={true} />
  }
});

const ThankyouLoadable = Loadable({
  loader: () => import('./components/ThankyouPage/thankyoupage'),
  loading() {
    return <Loader message={""} loading={true} />
  }
});

const ErrorLoadable = Loadable({
  loader: () => import('./components/ErrorPage/errorpage'),
  loading() {
    return <Loader message={""} loading={true} />
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
        id: 'products',
        name: 'Products',
        link: '/products'
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
    const body = document.body.clientWidth
    window.addEventListener("resize", this.updateValue)
    const url = window.location.href

    this.setState(url.includes("contact") ? { activeitem: "contact"} : (url.includes("products") ? { activeitem: "products"} : (url.includes("payment") ? { activeitem: "contact"} : { activeitem: "home"})))

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
    const body = document.body.clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }

  handleSidebar = () =>
  this.setState(prevState => ({ visible: !prevState.visible, navVisible: !prevState.navVisible }))

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateValue)
  }
 
  render () {
    const { navItems, mobile, animation, activeitem, 
      dimmed, direction, visible, navVisible } = this.state
    
    return (
      <div className={'body'}>

        <HashRouter basename={'/'}>

          <Nav 
            navItems={navItems} 
            activeitem={activeitem} 
            mobile={mobile} 
            handleSidebar={this.handleSidebar} 
            changeActiveState={this.changeActiveState} 
            navVisible={navVisible} 
          />

          <Sidebar.Pushable as={Segment} style={{margin: '0', border: 'none' }} >
            <VerticalSidebar 
              activeitem={activeitem} 
              animation={animation} 
              direction={direction} 
              visible={visible} 
              handleSidebar={this.handleSidebar}  
              changeActiveState={this.changeActiveState} 
              navItems={navItems} 
            />

            <Sidebar.Pusher 
              dimmed={dimmed && visible} 
              onClick={ !visible ? null : this.handleSidebar} 
            >
              <Switch>
                <Route exact path={'/'} component={Homepage} />
                <Route path={'/contact'} component={Contact} />
                <Route path={'/order'} component={OrderPage} /> 
                <Route path={'/products'} render={(props) => <ProductGallery {...props} mobile={mobile} />} /> 
                <Route path={'/trackorders'} component={OrdersLoadable} />
                <Route path={'/thankyou/:reference'} component={ThankyouLoadable} />
                <Route component={ErrorLoadable} />
              </Switch>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          
          <Footer/>
        </HashRouter>

      </div>
    )
  }
}

export default App;
