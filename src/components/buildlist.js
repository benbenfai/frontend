import React, { useState } from 'react';
import {Container, Table} from 'reactstrap';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const Buildlist = (props) => {

    return (
        <Container>

            <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>
                Your Build Information
            </FormLabel><br/>


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
            <Table style={{tableLayout: 'fixed', width: '100%'}}>
            <tr>
            <td>
                <ListItemIcon>
                <img
                  style={{ height: 64, width: 64 }}
                  src={'http://localhost:5000'+props.data.cpuicon}
                />
                </ListItemIcon></td>
                <td><ListItemText primary='Cpu' secondary={props.data.cpu} /></td>
                <td><ListItemText primary='Price' secondary={props.data.cpuprice} /></td>
                </tr>
                </Table>
            </ListItem>
            <ListItem alignItems="flex-start">
            <Table style={{tableLayout: 'fixed', width: '100%'}}>
            <tr>
            <td>
                <ListItemIcon>
                <img
                  style={{ height: 64, width: 64 }}
                  src={'http://localhost:5000'+props.data.gpuicon}
                />
                </ListItemIcon></td>
                <td><ListItemText primary='Display Card' secondary={props.data.gpu} /></td>
                <td><ListItemText primary='Price' secondary={props.data.gpuprice} /></td>
                </tr>
                </Table>
            </ListItem>
            <ListItem alignItems="flex-start">
            <Table style={{tableLayout: 'fixed', width: '100%'}}>
            <tr>
            <td>
                <ListItemIcon>
                <img
                  style={{ height: 64, width: 64 }}
                  src={'http://localhost:5000'+props.data.motherboardicon}
                />
                </ListItemIcon></td>
                <td><ListItemText primary='Motherboard' secondary={props.data.motherboard} /></td>
                <td><ListItemText primary='Price' secondary={props.data.motherboardprice} /></td>
                </tr>
                </Table>
            </ListItem>
            <ListItem alignItems="flex-start">
            <Table style={{tableLayout: 'fixed', width: '100%'}}>
            <tr>
            <td>
                <ListItemIcon>
                <img
                  style={{ height: 64, width: 64 }}
                  src={'http://localhost:5000'+props.data.powersupplyicon}
                />
                </ListItemIcon></td>
                <td><ListItemText primary='Power supply' secondary={props.data.powersupply} /></td>
                <td><ListItemText primary='Price' secondary={props.data.powersupplyprice} /></td>
                </tr>
                </Table>
            </ListItem>
            <ListItem alignItems="flex-start">
            <Table style={{tableLayout: 'fixed', width: '100%'}}>
            <tr>
            <td>
                <ListItemIcon>
                <img
                  style={{ height: 64, width: 64 }}
                  src={'http://localhost:5000'+props.data.ramicon}
                />
                </ListItemIcon></td>
                <td><ListItemText primary='Ram' secondary={props.data.ram} /></td>
                <td><ListItemText primary='Price' secondary={props.data.ramprice} /></td>
                </tr>
                </Table>
            </ListItem>
            <ListItem alignItems="flex-start">
            <Table style={{tableLayout: 'fixed', width: '100%'}}>
            <tr>
            <td>
                <ListItemIcon>
                <img
                  style={{ height: 64, width: 64 }}
                  src={'http://localhost:5000'+props.data.storageicon}
                />
                </ListItemIcon></td>
                <td><ListItemText primary='Storage' secondary={props.data.storage} /></td>
                <td><ListItemText primary='Price' secondary={props.data.storageprice} /></td>
                </tr>
                </Table>
            </ListItem>
            <ListItem alignItems="flex-start">
            <Table style={{tableLayout: 'fixed', width: '100%'}}>
            <tr>
            <td>
                <ListItemIcon>
                <img
                  style={{ height: 64, width: 64 }}
                  src={'http://localhost:5000'+props.data.casesicon}
                />
                </ListItemIcon></td>
                <td><ListItemText primary='Cases' secondary={props.data.cases} /></td>
                <td><ListItemText primary='Price' secondary={props.data.casesprice} /></td>
                </tr>
                </Table>
            </ListItem>
        </List>
        </td>
        </tr>

        </Container>
    );
}

export default Buildlist;