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
import gethardware from './api/hardwareget';
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
    height: 64,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [cpu,setCpu] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>Build Tool</FormLabel><br/>
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

      <RadioGroup aria-label="quiz" name="cpu" value={cpu} onChange={(e) => setCpu(e.target.value)}>
      <Card className={classes.cardroot}>
        
          <CardActionArea>
          <input type="radio" style={{opacity: 0}} id="myButton" value={'123'} onChange={(e) => setCpu(e.target.value)} />
          <label for="myButton">
            <CardMedia
              className={classes.media}
              image=""
              title=""
            />
            </label>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              cpu123
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        </RadioGroup>

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