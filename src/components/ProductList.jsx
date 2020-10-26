import React, {Component, Fragment} from 'react';
import {Divider, Table, TableBody, TableRow, TableCell, Button} from 'semantic-ui-react';
import TitlePage from './TitlePage';

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

    inspectProduct = id => this.props.history.push({pathname: '/product', state: {productId: id}});

    showTacos = ()=>{
        return this.state.products.map(p =>{
            //return <div key={p.id}>{p.name}</div>;
            return <Fragment>
                <Button floated='right' primary content='Inspeccionar' onClick={()=>this.inspectProduct(p.id)}/>
                <Divider hidden/>
                <Table definition>
                    <TableBody>
                        <TableRow>
                            <TableCell width={2}>Nombre</TableCell>
                            <TableCell>{p.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Precio</TableCell>
                            <TableCell>{p.price}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Grupo</TableCell>
                            <TableCell>{p.productGroup.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>{p.id}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Divider/>                   
            </Fragment>
        });
    }

    render() {
        return (
            <Fragment>
                <TitlePage label='Lista de Productos'/>
                {this.showTacos()}
            </Fragment>
        );
    }
}