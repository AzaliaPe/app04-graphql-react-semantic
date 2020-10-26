import React, {Component, Fragment} from 'react';
import TitlePage from './TitlePage';
import {getApolloContext, gql} from '@apollo/client';
import {Table, TableBody, TableRow, TableCell} from 'semantic-ui-react';


const GET_PRODUCT_BY_ID = gql`
    query($id: ID!){
        product(id: $id){
            id
            name
            price
            productGroup{
                name
            }
        }
    }
`;


export default class Product extends Component{

    state = {
        product: {}
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        //console.log(this.props.history.location.state.productId);
        const {client} = this.context;
        const response = await client.query({
            query: GET_PRODUCT_BY_ID,
            variables: {
                id: this.props.history.location.state.productId
            }
        });
        this.setState({product: response.data.product});
        console.log(response.data.product);
    }

    render() {
        const {product} = this.state;
        return (
            <Fragment>
                <TitlePage label='Producto' icon='clipboard outline'/>
                <Table definition>
                    <TableBody>
                        <TableRow>
                            <TableCell width={2}>Nombre</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Precio</TableCell>
                            <TableCell>{product.price}</TableCell>
                        </TableRow>
                        {/* <TableRow>
                            <TableCell>Grupo</TableCell>
                            <TableCell>{product.productGroup.name}</TableCell>
                        </TableRow> */}
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>{product.id}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Fragment>
        );
    }
}