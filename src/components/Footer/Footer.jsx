import React, { Component } from 'react'
import { Header, Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Footer.scss'

class Footer extends Component {

  componentDidMount () {
    const footerYear = document.querySelector('.footer-year')
    const currentYear = new Date().getFullYear()

    footerYear.innerHTML = currentYear
  }

  render () {

    return (
      <footer className={'footer'}>
        <div className={'copyright'}>
          &copy; Copyright <span className={'footer-year'}></span> FitsbyDee 
        </div>
      </footer>
    )
  }
}

export default Footer