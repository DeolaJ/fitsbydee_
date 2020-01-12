import React, {Component} from 'react'
import { Grid, Button, List, Container, Header } from 'semantic-ui-react'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import './productgallery.scss'
import axios from 'axios'

class ProductGallery extends Component {

  state = {
    gallery: []
  }

  componentDidMount () {
    axios.get('https://res.cloudinary.com/dzpntisxj/image/list/fbd.json')
    .then(res => {
      console.log(res.data.resources);
      this.setState({
        gallery: res.data.resources
      })
    })
  }

  render () {
    const { gallery } = this.state
    const { mobile } = this.props

    return (
      <Grid className={'productgallery-container'}>
        <Grid.Column width={16}>
          <Container textAlign="center" className={"products-body"}>

            <Header as="h2" textAlign={"left"}>
              Products Gallery
            </Header>

            <div id={"products"}>

              <CloudinaryContext cloudName="dzpntisxj">
                {
                  gallery.length !== 0 && gallery.map(data => (
                    <div className="responsive" key={data.public_id}>
                      <div className="img">
                        <a 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          href={`https://res.cloudinary.com/dzpntisxj/image/upload/${data.public_id}.jpg`}
                        >
                          <Image publicId={data.public_id}>
                            <Transformation
                              crop="scale"
                              width={mobile ? "140" : "250"}
                              dpr="auto"
                              responsive_placeholder="blank"
                            />
                          </Image>
                        </a>
                        <div className="desc">Created at {data.created_at}</div>
                      </div>
                    </div>
                  ))
                }
              </CloudinaryContext>

            </div>

          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ProductGallery