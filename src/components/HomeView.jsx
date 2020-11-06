import React, {Component} from "react";

import {Button, Divider, Grid, Header, Icon, Segment} from 'semantic-ui-react';

export default class HomeView extends Component{

    productList = ()=> this.props.history.push('/products'); 
    addProduct = ()=> this.props.history.push('/addproduct'); 
    
    render() {
        return (
            <Segment placeholder>
                <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>O</Divider>
            
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                    <Header icon>
                        <Icon name='search' />
                        Buscar productos
                    </Header>
            
                    <Button primary onClick={this.productList}>Buscar</Button>
                    </Grid.Column>
            
                    <Grid.Column>
                    <Header icon>
                        <Icon name='file' />
                        Crear nuevos productos
                    </Header>
                    <Button primary onClick={this.addProduct}>Crear</Button>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
          </Segment>
        );
    }
}