import React, { Component } from 'react'
import './Nav.scss'
import { Icon, List, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux'
import logowhite from '../../images/logowhite.png'

class Nav extends Component {

  render () {
    const { navItems, mobile, changeActiveState, activeitem, handleSidebar, navVisible } = this.props

    return (
      <nav className={'nav'} style={{ display: navVisible ? 'block' : 'none' }}>

        {
          !mobile ?
          <Aux>
            <div className={'logo'}>
              <img alt='logo icon' className={'logo-icon'} src={logowhite} />
            </div>
            <List horizontal link className={'navLink'}>
              {
                navItems.map((item) => (
                  <List.Item as={Link}
                    key={item.id}
                    id={item.id}
                    to={item.link}
                    onClick={changeActiveState} 
                    active={activeitem === item.id}
                    >
                      {item.name}
                  </List.Item>
                ))
              }
              <List.Item>
                <Link to='/payment'>
                  <Button className={'primary-main'}>Order now</Button>
                </Link>
              </List.Item>
            </List>
          </Aux>

          :
          <Grid className={'mobile-navitems'}>
            <Grid.Row columns={3}>

              <Grid.Column textAlign='left' verticalAlign='middle'>
                <Icon onClick={handleSidebar} size='big' name='bars'/>
              </Grid.Column>

              <Grid.Column textAlign='center' verticalAlign='middle' style={{ position: 'relative'}}>
                <img alt='logo icon' className={'mobile-logo'} src={logowhite}/>
              </Grid.Column>

              <Grid.Column textAlign='right'>
                <Link to='/payment'>
                  <Button className={'primary-main icon'}>
                    <Icon size='large' name='location arrow'/>
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        }
        
      </nav>
    )
  }
}

export default Nav