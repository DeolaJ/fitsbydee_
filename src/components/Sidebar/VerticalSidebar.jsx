import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Sidebar, Menu, Button } from 'semantic-ui-react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'
import logo from "../../images/logo.png"

class VerticalSidebar extends Component {

  render () {

    const { animation, direction, visible, handleSidebar, navItems, changeActiveState, activeitem } = this.props 

    return (
      <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
        style={{ zIndex: '4'}}
        className={'sidebar-menu'}
      > 
          <Menu.Item>
            <img src={logo} alt="logo" />
          </Menu.Item>
          {
            navItems.map(navItem => (
              <Menu.Item key={navItem.id} as={Link} to={navItem.link} 
                onClick={changeActiveState}>
                {navItem.name}
              </Menu.Item>
            ))
          }

          <Menu.Item as='div'>
            <Link to='/payment'>
              <Button className={'primary-main'}>
                Order now
              </Button>
            </Link>
          </Menu.Item>

          <Menu.Item as='a' onClick={handleSidebar}> 
            Back
            <Icon name='chevron right' />
          </Menu.Item>
      
      </Sidebar>
    )
  }
}



export default VerticalSidebar