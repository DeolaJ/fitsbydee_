import React, { Component } from 'react'
import { Grid, Table } from 'semantic-ui-react'
import './transactions.scss'
import axios from 'axios'

class Transactions extends Component {

  constructor (props) {
    super (props)
    this.state = {
      mobile: null,
      success: null
    }
  }

  componentDidMount () {
    var mobile = this.state.mobile;
    if (!mobile) {
      const body = document.querySelector('.transactions-container').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile: mobile
      })
    }
    this.getTransactions()
  }

  getTransactions = () => {
    return axios.get('/paystack-transactions').then(response => {
      console.log(response)
      const transactions = response.data.data.data

      var success = [];

      for (let i=0; i<transactions.length; i++) {
        if(transactions[i].status === 'success') {
          success.push(transactions[i])
        }
      }


      console.log(success[0].metadata.custom_fields[0].first_name)

      this.setState({
        success
      })
    }).catch(error => {
      console.log(error);
    })
  }

  render () {

    const { success, mobile } = this.state

    console.log(this.state)
    return (
      <Grid className={'transactions-container'}>
        
        <Grid.Column width={16}>

        {
          success &&
          
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Paid At
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Email
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Reference
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Amount
                </Table.HeaderCell>
                <Table.HeaderCell>
                  First Name
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Last Name
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Address
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Consultant
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                success.map(transaction => (
                  <Table.Row key={transaction.id}>
                    <Table.Cell>
                      {transaction.paid_at}
                    </Table.Cell>
                    <Table.Cell>
                      {transaction.customer.email}
                    </Table.Cell>
                    <Table.Cell>
                      {transaction.reference}
                    </Table.Cell>
                    <Table.Cell>
                      {transaction.currency}{transaction.amount}
                    </Table.Cell>

                    <Table.Cell>
                      {transaction.metadata['custom_fields'] ? transaction.metadata['custom_fields'][0]['first_name'] : 'empty'}
                    </Table.Cell>
                    <Table.Cell>
                      {transaction.metadata['custom_fields'] ? transaction.metadata['custom_fields'][0]['last_name'] : 'empty'}
                    </Table.Cell>
                    <Table.Cell>
                      {transaction.metadata['custom_fields'] ? transaction.metadata['custom_fields'][0]['address'] : 'empty'}
                    </Table.Cell>
                    <Table.Cell>
                      {transaction.metadata['custom_fields'] ? transaction.metadata['custom_fields'][0]['description'] : 'empty'}
                    </Table.Cell>
                    <Table.Cell>
                      {transaction.metadata['custom_fields'] ? transaction.metadata['custom_fields'][0]['consultant'] : 'empty'}
                    </Table.Cell>
                    {/* {
                      Object.keys(transaction.metadata.custom_fields).map(key => (
                        <Table.Cell key={key}>
                          {key}
                        </Table.Cell>
                      ))
                    } */}
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        }
        </Grid.Column>

      </Grid>
    )
  }
}

export default Transactions
