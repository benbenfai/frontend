import React,{ useState, useEffect } from 'react'
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
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
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
  const [cpuprice,setCpuprice] = useState('');
  const [cputdp,setCputdp] = useState('');
  const [gpu,setGpu] = useState('');
  const [gpudata,setGpudata] = useState('');
  const [gpuprice,setGpuprice] = useState('');
  const [gputdp,setGputdp] = useState('');
  const [motherboard,setMotherboard] = useState('');
  const [motherboarddata,setMotherboarddata] = useState('');
  const [motherboardprice,setMotherboardprice] = useState('');
  const [powersupply,setPowersupply] = useState('');
  const [powersupplydata,setPowersupplydata] = useState('');
  const [powersupplyprice,setPowersupplyprice] = useState('');
  const [ram,setRam] = useState('');
  const [ramdata,setRamdata] = useState('');
  const [ramprice,setRamprice] = useState('');
  const [storage,setStorage] = useState('');
  const [storagedata,setStoragedata] = useState('');
  const [storageprice,setStorageprice] = useState('');
  const [cases,setCases] = useState('');
  const [casesdata,setCasesdata] = useState('');
  const [casesprice,setCasesprice] = useState('');

  const totalprice = cpuprice+gpuprice+motherboardprice+powersupplyprice+ramprice+storageprice+casesprice
  const totaltdp = cputdp+gputdp

  var cpuarry = [];
  var gpuarry = [];
  var motherboardarry = [];
  var powersupplyarry = [];
  var ramarry = [];
  var storagearry = [];
  var casesarry = [];

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

  for (var key in cpudata) {
    cpuarry.push(cpudata[key]);}

  for (var key in gpudata) {
    gpuarry.push(gpudata[key]);}

  for (var key in motherboarddata) {
    motherboardarry.push(motherboarddata[key]);}
  
  for (var key in powersupplydata) {
    powersupplyarry.push(powersupplydata[key]);}

  for (var key in ramdata) {
    ramarry.push(ramdata[key]);}

  for (var key in storagedata) {
     storagearry.push(storagedata[key]);}

  for (var key in casesdata) {
    casesarry.push(casesdata[key]);}

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
        /> )},
      { title: 'Name', field: 'cpu' },
      { title: 'Price', field: 'lowprice', type: 'int' },
      { title: 'Socket', field: 'socket' },
      { title: 'Tdp', field: 'tdp', },
      { title: 'Support ramtype', field: 'ramtype', },
    ],
    data: [

    ],
  });

  const [gpustate, setGpustate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> )},
      { title: 'Name', field: 'gpu' },
      { title: 'Price', field: 'lowprice', type: 'int' },
      { title: 'Tdp', field: 'tdp', },
      { title: 'Vram', field: 'vram', },
    ],
  });

  const [motherboardstate, setMotherboardstate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> )},
      { title: 'Name', field: 'motherboard' },
      { title: 'Price', field: 'lowprice', type: 'int' },
      { title: 'Socket', field: 'socket' },
      { title: 'M2 support', field: 'm2' },
      { title: 'Size', field: 'mbsize' },
    ],
  });

  const [powersupplystate, setPowersupplystate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> )},
      { title: 'Name', field: 'powersupply' },
      { title: 'Price', field: 'lowprice', type: 'int' },
      { title: 'Power', field: 'power_capacity' },
      { title: 'Bronze', field: 'bronze' },
    ],
  });

  const [ramstate, setRamstate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> )},
      { title: 'Name', field: 'ram' },
      { title: 'Price', field: 'lowprice', type:'int' },
      { title: 'Capacity', field: 'capacity' },
      { title: 'Frequency', field: 'frequency' },
      { title: 'Ramtype', field: 'ramtype' },
    ],
  });

  const [storagestate, setStoragestate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> )},
      { title: 'Name', field: 'storage' },
      { title: 'Price', field: 'lowprice', type: 'int' },
      { title: 'Capacity', field: 'capacity' },
      { title: 'Port', field: 'port' },
      { title: 'Size', field: 'size' },
    ],
  });

  const [casesstate, setCasesstate] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon',             
        render: rowData => (
        <img
          style={{ height: 36, width: 36 }}
          src={'http://localhost:5000'+rowData.icon}
        /> )},
      { title: 'Name', field: 'cases' },
      { title: 'Price', field: 'lowprice', type: 'int' },
      { title: 'Support storage size', field: 'storagesize' },
      { title: 'Support mb size', field: 'mbsize' },
    ],
  });

  return (
    <div style={{justifyContent: "center"}}>
    <form onSubmit={handleSubmit}>
    <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>Build Tool</FormLabel><br/>
    
    cpu: {cpu} gpu: {gpu} motherboard: {motherboard} powersupply: {powersupply} ram: {ram} storage: {storage} casses: {cases} <br/>
    
    totalprice: {totalprice} totaltdp: {totaltdp}<br/><br/>

    <div className={classes.tabroot}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
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
            data={cpuarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select cpu',
                onClick: function(event, rowData) {
                  setCpu(rowData.cpu);
                  setCpuprice(rowData.lowprice);
                  setCputdp(rowData.tdp);
                }
              }
            ]}
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
                  setGpu(rowData.cpu);
                  setGpuprice(rowData.lowprice);
                  setGputdp(rowData.tdp);
                }
              }
            ]}
          />

      </TabPanel>
      <TabPanel value={value} index={2}>

      <MaterialTable
            style={{height: '70%'}}
            title="Motherboard"
            columns={motherboardstate.columns}
            data={motherboardarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select motherboard',
                onClick: function(event, rowData) {
                  setMotherboard(rowData.cpu);
                  setMotherboardprice(rowData.lowprice);
                }
              }
            ]}
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
                  setPowersupply(rowData.cpu);
                  setPowersupplyprice(rowData.lowprice);
                }
              }
            ]}
          />

      </TabPanel>
      <TabPanel value={value} index={4}>

      <MaterialTable
            style={{height: '70%'}}
            title="Ram"
            columns={ramstate.columns}
            data={ramarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select ram',
                onClick: function(event, rowData) {
                  setRam(rowData.cpu);
                  setRamprice(rowData.lowprice);
                }
              }
            ]}
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
                  setStorage(rowData.cpu);
                  setStorageprice(rowData.lowprice);
                }
              }
            ]}
          />

      </TabPanel>
      <TabPanel value={value} index={6}>

      <MaterialTable
            style={{height: '70%'}}
            title="Cases"
            columns={casesstate.columns}
            data={casesarry}
            actions={[
              {
                icon: 'add',
                tooltip: 'Select cases',
                onClick: function(event, rowData) {
                  setCases(rowData.cpu);
                  setCasesprice(rowData.lowprice);
                }
              }
            ]}
          />

      </TabPanel>
    </div>
    </form>
    </div>
  );
}