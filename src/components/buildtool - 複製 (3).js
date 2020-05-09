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
  const [totalprice,setTotalprice] = useState('');
  const [cpu,setCpu] = useState('');
  const [cpudata,setCpudata] = useState('');
  const [cpuprice,setCpuprice] = useState('');

  async function hget(url) {

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

  useEffect(() => { 
    hget('http://localhost:5000/hardware/allcpu')
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

  const [cpua1rry,setCpuarry] = useState([]);

  var cpuarry = [];

  function getcpudata () {for (var key in cpudata) {
    cpuarry.push(cpudata[key]);
  }}

  for (var key in cpudata) {
    cpuarry.push(cpudata[key]);}

  const [state, setState] = React.useState({
    columns: [
      { title: 'Icon', field: 'icon' },
      { title: 'Name', field: 'cpu' },
      { title: 'Price', field: 'lowprice', type: 'numeric' },
      { title: 'Tdp', field: 'tdp', },
    ],
    data: [

    ],
  });

  useEffect(()=>{
  getcpudata()
  },[])

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>Build Tool</FormLabel><br/>
    cpu: {cpu}  cpuprice: {cpuprice} totalprice: {totalprice}<br/><br/>
    123: {JSON.stringify(cpuarry)}<br/><br/>
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
      <TabPanel value={value} index={0}>

      {Object.keys(cpudata).map((item, i) => (

      <div style={{display:'inline-table', padding: '12px'}}>

      <input type="radio" id="cpu" value={cpudata[item].cpu} onClick={(e) => setCpu(e.target.value)} 
      class="option-input"
      />
      <label for="cpu" class="option__label">
      <Card className={classes.cardroot}>

          <input style={{display:'none'}} id="cpuprice" value={cpudata[item].lowprice} onChange={(e) => setCpuprice(e.target.value)}/>

          <label for="cpuprice">
            <CardMedia
              component="div"
              className={classes.media}
              image={'http://localhost:5000'+cpudata[item].icon}
            /></label>

          <div className={classes.details}>
          <CardContent>
          
              select<br/>

            Price: {cpudata[item].lowprice}<br/>
            <Button size="small" color="primary">
              information
            </Button>
          </CardContent>
          </div>
        </Card>
        </label>
        </div>
        ))}

    <MaterialTable
          title="Editable Example"
          columns={state.columns}
          data={cpuarry}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      );

      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
    </form>
    </div>
  );
}