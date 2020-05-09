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
    maxWidth: 256,
    maxHeight: 256,
  },
  media: {
    height: 160,
    width: 192
  },
}));

export default function Buildtool() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [cpu,setCpu] = useState('');
  const [cpudata,setCpudata] = useState('');
  const [fulldataback,setFulldataback] = useState('');

  async function hget(url) {

    const Options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    response
        .json()
        .then(response => (
            setFulldataback(response),
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

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>Build Tool</FormLabel><br/>
    cpu: {cpu}<br/>
    <div>
    456: {Object.keys(cpudata).map((item, i) => (
    <tr>
      <td>{cpudata[item].cpu}</td>
      <td>{cpudata[item].icon}</td><br/>
      <img src={'http://localhost:5000'+cpudata[item].icon} />
    </tr>))}
    </div><br/><br/>
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

      <Card className={classes.cardroot}>

          <CardActionArea>
          <input type="radio" style={{display:'none'}} id="myButton" value={cpudata[item].cpu} onChange={(e) => setCpu(e.target.value)} />
          <label for="myButton">
            <CardMedia
              component="div"
              className={classes.media}
              image={'http://localhost:5000'+cpudata[item].icon}
            /></label>

          </CardActionArea>
          
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              More inf
            </Button>
          </CardActions>
        </Card>
        ))}

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