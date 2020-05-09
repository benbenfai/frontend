import React, { useEffect } from 'react';
import {Container, Table} from 'reactstrap';
import Typography from '@material-ui/core/Typography';

export const Buildlist = (props) => {

    return (
        <Container>

            <Typography color="inherit" variant="subtitle1" component="div">

                Your build information:

            </Typography>
            

            {Object.keys(props.data).map((item, i) => (

                <Table>
                <tr>
                    <td></td>
                </tr>

                <tr>
                <th scope="row">Hardware</th>
                <td>Cpu: {props.data[item].cpu}</td>
                <td>Display card: {props.data[item].gpu}</td>
                <td>Motherboard: {props.data[item].motherboard}</td>
                <td>powersupply: {props.data[item].powersupply}</td>
                <td>Ram: {props.data[item].ram}</td>
                <td>Storage: {props.data[item].storage}</td>
                <td>Cases: {props.data[item].cases}</td>
                </tr>

                </Table>
            ))}

        </Container>
    );
}

export default Buildlist;