import React, { useState } from 'react';
import {Container, Table} from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const Buildlist = (props) => {

    return (
        <Container>

            <Typography color="inherit" variant="subtitle1" component="div">

                Your build information:

            </Typography><br/>

        <Table>

        <thead>
        <tr>
        <td>Total Price</td>
        <td>Total TDP</td>
        </tr>
        </thead>

        <tbody>
        <td>{props.data.totalprice}</td>
        <td>{props.data.totaltdp}</td>
        </tbody>

        </Table>

        <tr>
        <td>
        <List>
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+props.data.cpuicon}
                /> 
                </ListItemIcon>
                <ListItemText primary='Cpu' secondary={props.data.cpu} />
                <ListItemText primary='Price' secondary={props.data.cpuprice} />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+props.data.gpuicon}
                /> 
                </ListItemIcon>
                <ListItemText primary='Display Card' secondary={props.data.gpu} />
                <ListItemText primary='Price' secondary={props.data.gpuprice} />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+props.data.motherboardicon}
                /> 
                </ListItemIcon>
                <ListItemText primary='Motherboard' secondary={props.data.motherboard} />
                <ListItemText primary='Price' secondary={props.data.motherboardprice} />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+props.data.powersupplyicon}
                /> 
                </ListItemIcon>
                <ListItemText primary='Power supply' secondary={props.data.powersupply} />
                <ListItemText primary='Price' secondary={props.data.powersupplyprice} />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+props.data.ramicon}
                /> 
                </ListItemIcon>
                <ListItemText primary='Ram' secondary={props.data.ram} />
                <ListItemText primary='Price' secondary={props.data.ramprice} />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+props.data.storageicon}
                /> 
                </ListItemIcon>
                <ListItemText primary='Storage' secondary={props.data.storage} />
                <ListItemText primary='Price' secondary={props.data.storageprice} />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+props.data.casesicon}
                /> 
                </ListItemIcon>
                <ListItemText primary='Cases' secondary={props.data.cases} />
                <ListItemText primary='Price' secondary={props.data.casesprice} />
            </ListItem>
        </List>
        </td>
        </tr>

        </Container>
    );
}

export default Buildlist;