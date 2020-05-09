import React,{ useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Service} from './api/hardwareget';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './button.css';
import {Container, Table} from 'reactstrap';
import Grid from '@material-ui/core/Grid';

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

export default function Buildtool() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [cpu,setCpu] = useState('');
  const [cpudata,setCpudata] = useState('');
  const [cpusocket,setCpusocket] = useState('');
  const [cpuprice,setCpuprice] = useState('');
  const [cputdp,setCputdp] = useState('');
  const [cpuram,setCpuram] = useState('');
  const [gpu,setGpu] = useState('');
  const [gpudata,setGpudata] = useState('');
  const [gpuprice,setGpuprice] = useState('');
  const [gputdp,setGputdp] = useState('');
  const [motherboard,setMotherboard] = useState('');
  const [motherboarddata,setMotherboarddata] = useState('');
  const [motherboardprice,setMotherboardprice] = useState('');
  const [motherboardsocket,setMotherboardsocket] = useState('');
  const [motherboardram,setMotherboardram] = useState('');
  const [motherboardmbsize,setMotherboardmbsize] = useState('');
  const [powersupply,setPowersupply] = useState('');
  const [powersupplydata,setPowersupplydata] = useState('');
  const [powersupplyprice,setPowersupplyprice] = useState('');
  const [ram,setRam] = useState('');
  const [ramdata,setRamdata] = useState('');
  const [ramprice,setRamprice] = useState('');
  const [ramtype,setRamtype] = useState('');
  const [storage,setStorage] = useState('');
  const [storagedata,setStoragedata] = useState('');
  const [storageprice,setStorageprice] = useState('');
  const [storagetdp,setStoragetdp] = useState('');
  const [cases,setCases] = useState('');
  const [casesdata,setCasesdata] = useState('');
  const [casesprice,setCasesprice] = useState('');
  const [mbsize,setMbsize] = useState('');

  const [total,setTotal] = useState('');

  const totalprice = Number(cpuprice)+Number(gpuprice)+Number(motherboardprice)+Number(powersupplyprice)+Number(ramprice)+Number(storageprice)+Number(casesprice)
  const totaltdp = Number(cputdp)+Number(gputdp)+Number(storagetdp)

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
      if ( motherboardmbsize && motherboardmbsize == 'ATX'){
        arr.push(casesdata[key]);}
      else {
        if ( motherboardmbsize == casesdata[key].mbsize)
          arr.push(casesdata[key]);}
      }
    return arr
  })

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
      { title: 'Socket', field: 'socket', defaultFilter: motherboardsocket },
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
      <Table>

      <thead>
      <tr>
        <th></th>
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
        <td></td>
        <td>{totalprice}</td>
        <td>{totaltdp}</td>
        <td><Button onClick={reset}>Reset</Button></td>
        <td><Button>Confirm</Button></td>
      </tr>
      </tbody>

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
    
    <br/><br/>

    <Container>
    <div className={classes.tabroot}>

      <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
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
            columns={cpustate.columns}
            data={ ((!ramtype) || (!motherboard)) ? cpuarry : scpudata()}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select cpu',
                onClick: function(event, rowData) {
                  setCpu(rowData.cpu);
                  setCpusocket(rowData);
                  setCpuprice(rowData.lowprice);
                  setCputdp(rowData.tdp);
                  setCpuram(rowData.ramtype);
                  setRamtype(rowData.ramtype);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>
                <tr>
                  <td>
                  <img
                    style={{ height: 'auto', width: 'auto', maxHeight: 512, maxWidth: 512 }}
                    src={'http://localhost:5000'+rowData.icon}
                  />
                  </td>
                </tr>

                  <div style={{}}>

                  Name: {rowData.cpu}<br/>
                  Information: {cpuarry.desciption}

                  </div>

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
            columns={gpustate.columns}
            data={gpuarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select gpu',
                onClick: function(event, rowData) {
                  setGpu(rowData.gpu);
                  setGpuprice(rowData.lowprice);
                  setGputdp(rowData.tdp);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>
                <tr>
                  <td>
                  <img
                    style={{ height: 'auto', width: 'auto', maxHeight: 512, maxWidth: 512 }}
                    src={'http://localhost:5000'+rowData.icon}
                  />
                  </td>
                  <td style={{positiion: 'top',fontSize:'12px'}}>
                    <ul>
                      <li>
                        Name: {rowData.gpu}
                      </li>
                      <li>
                        Information: {gpuarry.desciption}
                      </li>
                    </ul>
                  </td>
                </tr>
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
            columns={motherboardstate.columns}
            data={ ((!cpu) || (!mbsize)) ? motherboardarry : smotherboarddata()}
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
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>
                <tr>
                  <td>
                  <img
                    style={{ height: 'auto', width: 'auto', maxHeight: 512, maxWidth: 512 }}
                    src={'http://localhost:5000'+rowData.icon}
                  />
                  </td>
                  <td style={{positiion: 'top',fontSize:'12px'}}>
                    <ul>
                      <li>
                        cpu: {rowData.motherboard}
                      </li>
                      <li>
                        information: {motherboardarry.desciption}
                      </li>
                    </ul>
                  </td>
                </tr>
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
            columns={powersupplystate.columns}
            data={powersupplyarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select powersupply',
                onClick: function(event, rowData) {
                  setPowersupply(rowData.powersupply);
                  setPowersupplyprice(rowData.lowprice);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>
                <tr>
                  <td>
                  <img
                    style={{ height: 'auto', width: 'auto', maxHeight: 512, maxWidth: 512 }}
                    src={'http://localhost:5000'+rowData.icon}
                  />
                  </td>
                  <td style={{positiion: 'top',fontSize:'12px'}}>
                    <ul>
                      <li>
                        Name: {rowData.powersupply}
                      </li>
                      <li>
                        Information: {powersupplyarry.desciption}
                      </li>
                    </ul>
                  </td>
                </tr>
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
            columns={ramstate.columns}
            data={ !ramtype ? ramarry : sramdata()}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select ram',
                onClick: function(event, rowData) {
                  setRam(rowData.ram);
                  setRamprice(rowData.lowprice);
                  setRamtype(rowData.ramtype);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>
                <tr>
                  <td>
                  <img
                    style={{ height: 'auto', width: 'auto', maxHeight: 512, maxWidth: 512 }}
                    src={'http://localhost:5000'+rowData.icon}
                  />
                  </td>
                  <td style={{positiion: 'top',fontSize:'12px'}}>
                    <ul>
                      <li>
                        Name: {rowData.ram}
                      </li>
                      <li>
                        Information: {ramarry.desciption}
                      </li>
                    </ul>
                  </td>
                </tr>
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
            columns={storagestate.columns}
            data={storagearry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select storage',
                onClick: function(event, rowData) {
                  setStorage(rowData.storage);
                  setStorageprice(rowData.lowprice);
                  setStoragetdp(rowData.tdp);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>
                <tr>
                  <td>
                  <img
                    style={{ height: 'auto', width: 'auto', maxHeight: 512, maxWidth: 512 }}
                    src={'http://localhost:5000'+rowData.icon}
                  />
                  </td>
                  <td style={{positiion: 'top',fontSize:'12px'}}>
                    <ul>
                      <li>
                        Name: {rowData.storage}
                      </li>
                      <li>
                        Information: {storagearry.desciption}
                      </li>
                    </ul>
                  </td>
                </tr>
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
            columns={casesstate.columns}
            data={ !motherboardmbsize ? casesarry : scasesdata()}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select cases',
                onClick: function(event, rowData) {
                  setCases(rowData.cases);
                  setCasesprice(rowData.lowprice);
                  setMbsize(rowData.mbsize);
                }
              }
            ]}
            detailPanel={rowData => {
              return (
                <div>
                <tr>
                  <td>
                  <img
                    style={{ height: 'auto', width: 'auto', maxHeight: 512, maxWidth: 512 }}
                    src={'http://localhost:5000'+rowData.icon}
                  />
                  </td>
                  <td style={{positiion: 'top',fontSize:'12px'}}>
                    <ul>
                      <li>
                        Name: {rowData.cases}
                      </li>
                      <li>
                        Information: {casesarry.desciption}
                      </li>
                    </ul>
                  </td>
                </tr>
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