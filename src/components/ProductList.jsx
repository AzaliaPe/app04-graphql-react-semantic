import React, {Component, Fragment} from 'react';
import {Header, Divider, Icon} from 'semantic-ui-react';

import {getApolloContext, gql} from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
    {
        products{
            id
            name
            price
            productGroup{
                name
            }
        }
    }
`;

export default class ProductList extends Component{

    state = {
        products: []
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        const {client} = this.context;
        const response = await client.query({query: GET_ALL_PRODUCTS});
        this.setState({products: response.data.products});
        console.log(response.data.products);
    }

    render() {
        return (
            <Fragment>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='list alternate outline'/>
                        Product List
                    </Header>
                </Divider>
                {this.state.products.map(p => <div key={p.id}>{p.name}</div>)}
            </Fragment>
        );
    }
}