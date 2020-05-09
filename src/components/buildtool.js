import React,{ useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './button.css';
import {Container, Table} from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MaterialTable from 'material-table'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={7}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabroot: {
    flexGrow: 1,
    justifyContent: "center"
  },
  cardroot: {
    display: 'flex',
    Width: 144,
    Height: 144,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 144,
    width: 144
  },
}));

export default function Buildtool(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [cpu,setCpu] = useState('');
  const [cpudata,setCpudata] = useState('');
  const [cpusocket,setCpusocket] = useState('');
  const [cpuprice,setCpuprice] = useState('');
  const [cputdp,setCputdp] = useState('');
  const [cpuram,setCpuram] = useState('');
  const [cpuicon,setCpuicon] = useState('');
  const [gpu,setGpu] = useState('');
  const [gpudata,setGpudata] = useState('');
  const [gpuprice,setGpuprice] = useState('');
  const [gputdp,setGputdp] = useState('');
  const [gpuicon,setGpuicon] = useState('');
  const [motherboard,setMotherboard] = useState('');
  const [motherboarddata,setMotherboarddata] = useState('');
  const [motherboardprice,setMotherboardprice] = useState('');
  const [motherboardsocket,setMotherboardsocket] = useState('');
  const [motherboardram,setMotherboardram] = useState('');
  const [motherboardmbsize,setMotherboardmbsize] = useState('');
  const [motherboardicon,setMotherboardicon] = useState('');
  const [powersupply,setPowersupply] = useState('');
  const [powersupplydata,setPowersupplydata] = useState('');
  const [powersupplyprice,setPowersupplyprice] = useState('');
  const [powercapacity,setPowercapacity] = useState('');
  const [powersupplyicon,setPowersupplyicon] = useState('');
  const [ram,setRam] = useState('');
  const [ramdata,setRamdata] = useState('');
  const [ramprice,setRamprice] = useState('');
  const [ramtype,setRamtype] = useState('');
  const [ramicon,setRamicon] = useState('');
  const [storage,setStorage] = useState('');
  const [storagedata,setStoragedata] = useState('');
  const [storageprice,setStorageprice] = useState('');
  const [storagetdp,setStoragetdp] = useState('');
  const [storageicon,setStorageicon] = useState('');
  const [cases,setCases] = useState('');
  const [casesdata,setCasesdata] = useState('');
  const [casesprice,setCasesprice] = useState('');
  const [casesicon,setCasesicon] = useState('');
  const [mbsize,setMbsize] = useState('');
  const [data,setData] = useState({});

  const totalprice = Number(cpuprice)+Number(gpuprice)+Number(motherboardprice)+Number(powersupplyprice)+Number(ramprice)+Number(storageprice)+Number(casesprice)
  const totaltdp = Number(cputdp)+Number(gputdp)+Number(storagetdp)

  const listdata = {
    'cpu':cpu,
    'cpuprice':cpuprice,
    'cpuicon':cpuicon,
    'gpu':gpu,
    'gpuprice':gpuprice,
    'gpuicon':gpuicon,
    'motherboard':motherboard,
    'motherboardprice':motherboardprice,
    'motherboardicon':motherboardicon,
    'powersupply':powersupply,
    'powersupplyprice':powersupplyprice,
    'powersupplyicon':powersupplyicon,
    'ram':ram,
    'ramprice':ramprice,
    'ramicon':ramicon,
    'storage':storage,
    'storageprice':storageprice,
    'storageicon':storageicon,
    'cases':cases,
    'casesprice':casesprice,
    'casesicon':casesicon,
    'totalprice':totalprice,
    'totaltdp':totaltdp,
  }

  async function cpuget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setCpudata(response.data)))
  }

  async function gpuget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setGpudata(response.data)))
  }

  async function motherboardget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setMotherboarddata(response.data)))
  }

  async function powersupplyget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setPowersupplydata(response.data)))
  }

  async function ramget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setRamdata(response.data)))
  }

  async function storageget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setStoragedata(response.data)))
  }

  async function casesget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setCasesdata(response.data)))
  }

  var cpuarry = [];
  var gpuarry = [];
  var motherboardarry = [];
  var powersupplyarry = [];
  var ramarry = [];
  var storagearry = [];
  var casesarry = [];

  for (var key in cpudata) {
    cpuarry.push(cpudata[key]);}

  const scpudata = useCallback(() => {
    var arr = [];
    for (var key in cpudata) {
      if (motherboard && ramtype){
        if ( motherboardsocket == cpudata[key].socket && motherboardram == cpudata[key].ramtype && ramtype == cpudata[key].ramtype){
          arr.push(cpudata[key]);}
      else {
        if ( motherboard && motherboardsocket == cpudata[key].socket && motherboardram == cpudata[key].ramtype){
          arr.push(cpudata[key]);}
        else{
          if ( ramtype && ramtype == cpudata[key].ramtype)
            arr.push(cpudata[key]);}
        }}}
    return arr
  })

  for (var key in gpudata) {
    gpuarry.push(gpudata[key]);}

  for (var key in motherboarddata) {
    motherboardarry.push(motherboarddata[key]);}

  const smotherboarddata = useCallback(() => {
    var arr = [];
    for (var key in motherboarddata) {
      if (cpu && mbsize){
        if ( cpusocket == motherboarddata[key].socket && mbsize == motherboarddata[key].mbsize)
          arr.push(motherboarddata[key]);}
      else{
        if (cpu && cpusocket == motherboarddata[key].socket){
          arr.push(motherboarddata[key]);}
        else{
          if (mbsize == motherboarddata[key].mbsize)
            arr.push(motherboarddata[key]);
          }
        }
      }
    return arr
  })
  
  for (var key in powersupplydata) {
    powersupplyarry.push(powersupplydata[key]);}

  for (var key in ramdata) {
    ramarry.push(ramdata[key]);}

  const sramdata = useCallback(() => {
    var arr = [];
    for (var key in ramdata) {
      if ( ramtype && ramtype == ramdata[key].ramtype){
        arr.push(ramdata[key]);}}
    return arr
  })

  for (var key in storagedata) {
     storagearry.push(storagedata[key]);}

  for (var key in casesdata) {
    casesarry.push(casesdata[key]);}

  const scasesdata = useCallback(() => {
    var arr = [];
    for (var key in casesdata) {
      if ( mbsize && mbsize == 'ATX'){
        arr.push(casesdata[key]);
        return arr}
      if ( mbsize && mbsize != 'ATX') {
        if ( mbsize == casesdata[key].mbsize)
          arr.push(casesdata[key]);}
          return arr
      }
      if ( motherboardmbsize && motherboardmbsize == 'ATX'){
        arr.push(casesdata[key]);
        return arr}
      if ( motherboardmbsize && motherboardmbsize != 'ATX') {
        if ( motherboardmbsize == casesdata[key].mbsize)
          arr.push(casesdata[key]);}
          return arr
  })

  const handlelist = () => {
    props.setData(listdata)
  }

  let submitbutton;
  if(cpu && gpu && motherboard && powersupply && ram && storage && cases){
    submitbutton = <Link
          to={{
            pathname: "/buildlist",
        }}
        >
        <Button onClick={handlelist}>Confirm</Button>
        </Link>}

  useEffect(() => { 
    cpuget('http://localhost:5000/hardware/allcpu')
    gpuget('http://localhost:5000/hardware/allgpu')
    motherboardget('http://localhost:5000/hardware/allmotherboard')
    powersupplyget('http://localhost:5000/hardware/allpowersupply')
    ramget('http://localhost:5000/hardware/allram')
    storageget('http://localhost:5000/hardware/allstorage')
    casesget('http://localhost:5000/hardware/allcases')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reset = () =>{
    window.location.reload();
  }

  var reader = new FileReader();
  reader.onload = () => {
    console.log(reader.result);  
  }

  const [cpustate, setCpustate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> ), filtering: false},
      { title: 'Name', field: 'cpu', filtering: false },
      { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
      { title: 'Socket', field: 'socket', lookup: {'socket': 'mb socket:'+motherboardsocket} },
      { title: 'Tdp', field: 'tdp', type: 'numeric', filtering: false },
      { title: 'Support ramtype', field: 'ramtype', lookup: {'DDR3':'DDR3','DDR4':'DDR4'} },
    ],
  });

  const [gpustate, setGpustate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> ), filtering: false},
      { title: 'Name', field: 'gpu', filtering: false },
      { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
      { title: 'Tdp', field: 'tdp', type: 'numeric', filtering: false },
      { title: 'Vram', field: 'vram', customFilterAndSearch: (term, rowData) => term >= rowData.capacity },
    ],
  });

  const [motherboardstate, setMotherboardstate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> ), filtering: false},
      { title: 'Name', field: 'motherboard', filtering: false },
      { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
      { title: 'Socket', field: 'socket', filtering: false },
      { title: 'Support ramtype', field: 'ramtype', lookup: {'DDR3':'DDR3','DDR4':'DDR4'} },
      { title: 'Size', field: 'mbsize', lookup: {'ATX':'ATX','MATX':'MATX','ITX':'ITX'} },
      { title: 'M2 support', field: 'm2', lookup: {'yes':'yes','no':'no'} },
    ],
  });

  const [powersupplystate, setPowersupplystate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> ), filtering: false},
      { title: 'Name', field: 'powersupply', filtering: false },
      { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
      { title: 'Power', field: 'power_capacity', customFilterAndSearch: (term, rowData) => term >= rowData.power_capacity },
      { title: 'Bronze', field: 'bronze', lookup: {'bronze':'bronze','sliver':'sliver','gold':'gold','platinum':'platinum','titanium':'titanium'}, }
    ],
  });

  const [ramstate, setRamstate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> ), filtering: false},
      { title: 'Name', field: 'ram', filtering: false },
      { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
      { title: 'Capacity', field: 'capacity', customFilterAndSearch: (term, rowData) => term >= rowData.capacity },
      { title: 'Frequency', field: 'frequency', customFilterAndSearch: (term, rowData) => term >= rowData.frequency },
      { title: 'Ramtype', field: 'ramtype', lookup: {'DDR3':'DDR3','DDR4':'DDR4'} },
    ],
  });

  const [storagestate, setStoragestate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> ), filtering: false},
      { title: 'Name', field: 'storage', filtering: false },
      { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
      { title: 'Capacity', field: 'capacity', filtering: false },
      { title: 'Tdp', field: 'tdp', type: 'numeric', filtering: false },
      { title: 'Port', field: 'port', lookup: {'sata':'sata','m2':'m2'} },
      { title: 'Size', field: 'size', lookup: {'3.5':'3.5','5.25':'5.25'} },
    ],
  });

  const [casesstate, setCasesstate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> ), filtering: false},
      { title: 'Name', field: 'cases', filtering: false },
      { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
      { title: 'Support storage size', field: 'storagesize', lookup: {'3.5':'3.5','5.25':'5.25'} },
      { title: 'Support mb size', field: 'mbsize', lookup: {'ATX':'ATX','MATX':'MATX','ITX':'ITX'} },
    ],
  });

  return (
    <div style={{flexGrow: 1,}}>
    <Grid   container
    direction="row"
    justify="center"
    alignItems="center"
    >
    <form onSubmit={handleSubmit}>
    <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>Build Tool</FormLabel><br/>

    <div>
    <Container>
      <Table style={{tableLayout: 'fixed', width: '100%'}}>

      <thead>
      <tr>
        <th></th>
        <th></th>
        <th>Total price</th>
        <th>Total tdp</th>
        <th></th>
        <th></th>
      </tr>
      </thead>

      <tbody>
      <tr>
        <td></td>
        <td></td>
        <td>{totalprice}</td>
        <td>{totaltdp}</td>
        <td><Button onClick={reset}>Reset</Button></td>
        <td>
          {submitbutton}
        </td>
      </tr>
      </tbody>

      </Table>

      <Table style={{tableLayout: 'fixed', width: '100%'}}>

      <thead>
      <tr>
        <th>Cpu</th>
        <th>Gpu</th>
        <th>Motherboard</th>
        <th>Powersupply</th>
        <th>Ram</th>
        <th>Storage</th>
        <th>Cases</th>
      </tr>
      </thead>
        
      <tbody>
      <tr>
      <td>{cpu}</td>
      <td>{gpu}</td>
      <td>{motherboard}</td>
      <td>{powersupply}</td>
      <td>{ram}</td>
      <td>{storage}</td>
      <td>{cases}</td>
      </tr>
      </tbody>

      </Table>
    </Container>
    </div>
    
    <br/>
    <Container>
    { cpusocket != motherboardsocket && cpusocket && motherboardsocket && <Container style={{backgroundColor: 'rgb(255, 230, 230)',margin: '8px'}} >Socket problem: cpu socket {cpusocket} motherboard socket {motherboardsocket} not match — check it out!</Container>}
    { cpuram != ramtype && cpuram && ramtype && !motherboard && <Container style={{backgroundColor: 'rgb(255, 230, 230)',margin: '8px'}} >Ram type problem: cpu support ram type {cpuram} ram type {ramtype} not match — check it out!</Container>}
    { motherboardram != ramtype && motherboardram && ramtype && !cpuram && <Container style={{backgroundColor: 'rgb(255, 230, 230)',margin: '8px'}} >Ram type problem: motherboard support ram type {motherboardram} ram type {ramtype} not match — check it out!</Container>}
    { cpuram != motherboardram && cpuram && motherboardram && <Container style={{backgroundColor: 'rgb(255, 230, 230)',margin: '8px'}} >Ram type problem: cpu support ram type {cpuram} motherboard support ram type {motherboardram} not match — check it out!</Container>}
    { motherboardmbsize != mbsize && mbsize && motherboardmbsize && mbsize != 'ATX' && <Container style={{backgroundColor: 'rgb(255, 230, 230)',margin: '8px'}} >MB size problem: motherboard size {motherboardmbsize} cases support size {mbsize} not match — check it out!</Container>}
    { powercapacity < totaltdp && totaltdp && powersupply && <Container style={{backgroundColor: 'rgb(255, 230, 230)',margin: '8px'}} >Power supply problem: Powersupply power {powercapacity} can no cover the power consumption {totaltdp}</Container>}
    { powercapacity*0.8 < totaltdp && totaltdp && powersupply && <Container style={{backgroundColor: 'rgb(255,255,224)',margin: '8px'}} >Warning: Powersupply power {powercapacity} may no cover the power consumption {totaltdp}</Container>}
    </Container>
    <br/>

    <Container>
    <div className={classes.tabroot}>

      <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          
        <Tab label="CPU" {...a11yProps(0)} />
        <Tab label="GPU" {...a11yProps(1)} />
        <Tab label="Motherboard" {...a11yProps(2)} />
        <Tab label="Power supply" {...a11yProps(3)} />
        <Tab label="Ram" {...a11yProps(4)} />
        <Tab label="Storage" {...a11yProps(5)} />
        <Tab label="Cases" {...a11yProps(6)} />
        
      </Tabs>

      <TabPanel value={value} index={0} style={{justifyContent: "center"}}>

      <MaterialTable
            style={{height: '70%'}}
            title="Cpu"
            columns={[
              { title: 'Icon', field: 'icon',             
                render: rowData => (
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+rowData.icon}
                /> ), filtering: false},
              { title: 'Name', field: 'cpu', filtering: false },
              { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
              { title: 'Socket', field: 'socket', defaultFilter: motherboardsocket },
              { title: 'Tdp', field: 'tdp', type: 'numeric', filtering: false },
              { title: 'Support ramtype', field: 'ramtype', defaultFilter: ramtype },
              { title: 'Information', field: 'description', hidden: true },
            ]}
            data={cpuarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select cpu',
                onClick: function(event, rowData) {
                  setCpu(rowData.cpu);
                  setCpusocket(rowData.socket);
                  setCpuprice(rowData.lowprice);
                  setCputdp(rowData.tdp);
                  setCpuram(rowData.ramtype);
                  setRamtype(rowData.ramtype);
                  setCpuicon(rowData.icon);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>

                <Table>

                  <thead>
                    <td>Information</td>
                    <td></td>
                  </thead>

                  <tbody>
                    <td>
                      <img
                      style={{ height: 'auto', width: 'auto', maxHeight: 256, maxWidth: 256 }}
                      src={'http://localhost:5000'+rowData.icon}/>
                    </td>
                    <td>
                      <List>
                        <ListItem>
                          <ListItemText primary='Name' secondary={rowData.cpu} />
                          <ListItemText primary='Price' secondary={rowData.lowprice} />
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemText primary='information' secondary={rowData.description} />
                        </ListItem>
                      </List>
                    </td>
                    <td></td>
                    <td clospane='6'></td>

                  </tbody>

                </Table>

                </div>
              )}}
              options={{
                filtering: true
              }}
          />

      </TabPanel>
      <TabPanel value={value} index={1}>

      <MaterialTable
            style={{height: '70%'}}
            title="Gpu"
            columns={[
              { title: 'Icon', field: 'icon',             
                render: rowData => (
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+rowData.icon}
                /> ), filtering: false},
              { title: 'Name', field: 'gpu', filtering: false },
              { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
              { title: 'Tdp', field: 'tdp', type: 'numeric', filtering: false },
              { title: 'Vram', field: 'vram', customFilterAndSearch: (term, rowData) => term >= rowData.capacity },
              { title: 'Information', field: 'description', hidden: true },
            ]}
            data={gpuarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select gpu',
                onClick: function(event, rowData) {
                  setGpu(rowData.gpu);
                  setGpuprice(rowData.lowprice);
                  setGputdp(rowData.tdp);
                  setGpuicon(rowData.icon);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>

                <Table>

                  <thead>
                    <td>Information</td>
                    <td></td>
                  </thead>

                  <tbody>
                    <td>
                      <img
                      style={{ height: 'auto', width: 'auto', maxHeight: 256, maxWidth: 256 }}
                      src={'http://localhost:5000'+rowData.icon}/>
                    </td>
                    <td>
                      <List>
                        <ListItem>
                          <ListItemText primary='Name' secondary={rowData.gpu} />
                          <ListItemText primary='Price' secondary={rowData.lowprice} />
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemText primary='information' secondary={rowData.description} />
                        </ListItem>
                      </List>
                    </td>
                    <td></td>
                    <td clospane='6'></td>

                  </tbody>

                </Table>

                </div>
              )}}
              options={{
                filtering: true
              }}
          />

      </TabPanel>
      <TabPanel value={value} index={2}>

      <MaterialTable
            style={{height: '70%'}}
            title="Motherboard"
            columns={[
              { title: 'Icon', field: 'icon',             
                render: rowData => (
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+rowData.icon}
                /> ), filtering: false},
              { title: 'Name', field: 'motherboard', filtering: false },
              { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
              { title: 'Socket', field: 'socket', defaultFilter: cpusocket },
              { title: 'Support ramtype', field: 'ramtype', defaultFilter: ramtype },
              { title: 'Size', field: 'mbsize', lookup: {'ATX':'ATX','MATX':'MATX','ITX':'ITX'} },
              { title: 'M2 support', field: 'm2', lookup: {'yes':'yes','no':'no'} },
              { title: 'Information', field: 'description', hidden: true },
            ]}
            data={motherboardarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select motherboard',
                onClick: function(event, rowData) {
                  setMotherboard(rowData.motherboard);
                  setMotherboardprice(rowData.lowprice);
                  setMotherboardsocket(rowData.socket);
                  setMotherboardmbsize(rowData.mbsize);
                  setMotherboardram(rowData.ramtype);
                  setRamtype(rowData.ramtype);
                  setMotherboardicon(rowData.icon);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>

                <Table>

                  <thead>
                    <td>Information</td>
                    <td></td>
                  </thead>

                  <tbody>
                    <td>
                      <img
                      style={{ height: 'auto', width: 'auto', maxHeight: 256, maxWidth: 256 }}
                      src={'http://localhost:5000'+rowData.icon}/>
                    </td>
                    <td>
                      <List>
                        <ListItem>
                          <ListItemText primary='Name' secondary={rowData.motherboard} />
                          <ListItemText primary='Price' secondary={rowData.lowprice} />
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemText primary='information' secondary={rowData.description} />
                        </ListItem>
                      </List>
                    </td>
                    <td></td>
                    <td clospane='6'></td>

                  </tbody>

                </Table>

                </div>
              )}}
              options={{
                filtering: true
              }}
          />

      </TabPanel>
      <TabPanel value={value} index={3}>

      <MaterialTable
            style={{height: '70%'}}
            title="Powersupply"
            columns={[
              { title: 'Icon', field: 'icon',             
                render: rowData => (
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+rowData.icon}
                /> ), filtering: false},
              { title: 'Name', field: 'powersupply', filtering: false },
              { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
              { title: 'Power', field: 'power_capacity', customFilterAndSearch: (term, rowData) => term >= rowData.power_capacity },
              { title: 'Bronze', field: 'bronze', lookup: {'bronze':'bronze','sliver':'sliver','gold':'gold','platinum':'platinum','titanium':'titanium'}, },
              { title: 'Information', field: 'description', hidden: true },
            ]}
            data={powersupplyarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select powersupply',
                onClick: function(event, rowData) {
                  setPowersupply(rowData.powersupply);
                  setPowersupplyprice(rowData.lowprice);
                  setPowercapacity(rowData.power_capacity);
                  setPowersupplyicon(rowData.icon);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>

                <Table>

                  <thead>
                    <td>Information</td>
                    <td></td>
                  </thead>

                  <tbody>
                    <td>
                      <img
                      style={{ height: 'auto', width: 'auto', maxHeight: 256, maxWidth: 256 }}
                      src={'http://localhost:5000'+rowData.icon}/>
                    </td>
                    <td>
                      <List>
                        <ListItem>
                          <ListItemText primary='Name' secondary={rowData.powersupply} />
                          <ListItemText primary='Price' secondary={rowData.lowprice} />
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemText primary='information' secondary={rowData.description} />
                        </ListItem>
                      </List>
                    </td>
                    <td></td>
                    <td clospane='6'></td>

                  </tbody>

                </Table>

                </div>
              )}}
              options={{
                filtering: true
              }}
          />

      </TabPanel>
      <TabPanel value={value} index={4}>

      <MaterialTable
            style={{height: '70%'}}
            title="Ram"
            columns={[
              { title: 'Icon', field: 'icon',             
                render: rowData => (
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+rowData.icon}
                /> ), filtering: false},
              { title: 'Name', field: 'ram', filtering: false },
              { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
              { title: 'Capacity', field: 'capacity', customFilterAndSearch: (term, rowData) => term >= rowData.capacity },
              { title: 'Frequency', field: 'frequency', customFilterAndSearch: (term, rowData) => term >= rowData.frequency },
              { title: 'Ramtype', field: 'ramtype', defaultFilter: ramtype },
              { title: 'Information', field: 'description', hidden: true },
            ]}
            data={ramarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select ram',
                onClick: function(event, rowData) {
                  setRam(rowData.ram);
                  setRamprice(rowData.lowprice);
                  setRamtype(rowData.ramtype);
                  setRamicon(rowData.icon);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>

                <Table>

                  <thead>
                    <td>Information</td>
                    <td></td>
                  </thead>

                  <tbody>
                    <td>
                      <img
                      style={{ height: 'auto', width: 'auto', maxHeight: 256, maxWidth: 256 }}
                      src={'http://localhost:5000'+rowData.icon}/>
                    </td>
                    <td>
                      <List>
                        <ListItem>
                          <ListItemText primary='Name' secondary={rowData.ram} />
                          <ListItemText primary='Price' secondary={rowData.lowprice} />
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemText primary='information' secondary={rowData.description} />
                        </ListItem>
                      </List>
                    </td>
                    <td></td>
                    <td clospane='6'></td>

                  </tbody>

                </Table>

                </div>
              )}}
              options={{
                filtering: true
              }}
          />

      </TabPanel>
      <TabPanel value={value} index={5}>

      <MaterialTable
            style={{height: '70%'}}
            title="Storage"
            columns={[
              { title: 'Icon', field: 'icon',             
                render: rowData => (
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+rowData.icon}
                /> ), filtering: false},
              { title: 'Name', field: 'storage', filtering: false },
              { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
              { title: 'Capacity', field: 'capacity', customFilterAndSearch: (term, rowData) => term >= rowData.capacity },
              { title: 'Tdp', field: 'tdp', type: 'numeric', filtering: false },
              { title: 'Port', field: 'port', lookup: {'sata':'sata','m2':'m2'} },
              { title: 'Size', field: 'size', lookup: {'3.5':'3.5','5.25':'5.25'} },
              { title: 'Information', field: 'description', hidden: true },
            ]}
            data={storagearry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select storage',
                onClick: function(event, rowData) {
                  setStorage(rowData.storage);
                  setStorageprice(rowData.lowprice);
                  setStoragetdp(rowData.tdp);
                  setStorageicon(rowData.icon);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>

                <Table>

                  <thead>
                    <td>Information</td>
                    <td></td>
                  </thead>

                  <tbody>
                    <td>
                      <img
                      style={{ height: 'auto', width: 'auto', maxHeight: 256, maxWidth: 256 }}
                      src={'http://localhost:5000'+rowData.icon}/>
                    </td>
                    <td>
                      <List>
                        <ListItem>
                          <ListItemText primary='Name' secondary={rowData.storage} />
                          <ListItemText primary='Price' secondary={rowData.lowprice} />
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemText primary='information' secondary={rowData.description} />
                        </ListItem>
                      </List>
                    </td>
                    <td></td>
                    <td clospane='6'></td>

                  </tbody>

                </Table>

                </div>
              )}}
              options={{
                filtering: true
              }}
          />

      </TabPanel>
      <TabPanel value={value} index={6}>

      <MaterialTable
            style={{height: '70%'}}
            title="Cases"
            columns={[
              { title: 'Icon', field: 'icon',             
                render: rowData => (
                <img
                  style={{ height: 36, width: 36 }}
                  src={'http://localhost:5000'+rowData.icon}
                /> ), filtering: false},
              { title: 'Name', field: 'cases', filtering: false },
              { title: 'Price', field: 'lowprice', type: 'numeric', customFilterAndSearch: (term, rowData) => term >= rowData.lowprice },
              { title: 'Support storage size', field: 'storagesize', lookup: {'3.5':'3.5','5.25':'5.25'} },
              { title: 'Support mb size', field: 'mbsize', defaultFilter: motherboardmbsize },
              { title: 'Information', field: 'description', hidden: true },
            ]}
            data={ casesarry }
            actions={[
              {
                icon: 'add',
                tooltip: 'Select cases',
                onClick: function(event, rowData) {
                  setCases(rowData.cases);
                  setCasesprice(rowData.lowprice);
                  setMbsize(rowData.mbsize);
                  setCasesicon(rowData.icon);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>

                <Table>

                  <thead>
                    <td>Information</td>
                    <td></td>
                  </thead>

                  <tbody>
                    <td>
                      <img
                      style={{ height: 'auto', width: 'auto', maxHeight: 256, maxWidth: 256 }}
                      src={'http://localhost:5000'+rowData.icon}/>
                    </td>
                    <td>
                      <List>
                        <ListItem>
                          <ListItemText primary='Name' secondary={rowData.cases} />
                          <ListItemText primary='Price' secondary={rowData.lowprice} />
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemText primary='information' secondary={rowData.description} />
                        </ListItem>
                      </List>
                    </td>
                    <td></td>
                    <td clospane='6'></td>

                  </tbody>

                </Table>

                </div>
              )}}
              options={{
                filtering: true
              }}
          />

      </TabPanel>
    </div>
    </Container>
    </form>
    </Grid>
    </div>
  );
}