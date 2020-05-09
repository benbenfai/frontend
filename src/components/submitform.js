import React,{ useState, useEffect, useCallback, useRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router";
import {userAction} from '../actions/userAction';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FileValidator from './FileValidator'
import {history} from './useful/history';
import {alertActions} from '../actions/alert.actions';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {Container, Table} from 'reactstrap';
import Grid from '@material-ui/core/Grid';

const HardwareForm = (props) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription ] = useState('');
    const [price, setPrice ] = useState('');
    const [icon,setIcon ] = useState('');
    const [tdp, setTdp ] = useState('');
    const [socket, setSocket ] = useState('');
    const [ramtype, setRamtype ] = useState('');
    const [m2, setM2 ] = useState('');
    const [mbsize,setMbsize] = useState('');
    const [vram, setVram ] = useState('');
    const [pcapacity, setPcapacity ] = useState('');
    const [bronze, setBronze ] = useState('');
    const [capacity, setCapacity ] = useState('');
    const [rcapacity, setRcapacity ] = useState('');
    const [scapacity, setScapacity ] = useState('');
    const [frequency, setFrequency ] = useState('');
    const [port, setPort ] = useState('');
    const [ssize,setSsize] = useState('');
    const [crop,setCrop] = useState({ x: 0, y: 0 });
    const [croppedArea, setCroppedArea] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [blobImage, setBlobImage] = useState(null)
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [cropdone, setCropdone] = useState(false);
    const cropperRef = useRef(null);
    const udata = {}
    const dispatch = useDispatch();
    
    const useStyles = makeStyles(theme => ({
        root: {
          position: 'relative',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: "20px",
        },
        formControl: {
          position: 'relative',
          margin: theme.spacing(0),
          minWidth: 340,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
          },
        uploader: {
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '128px'
          },
        input: {
            display: 'none',
        },
        crop: {
          width: '300px',
          height: '300px'
        },
        mid:{
          left: '50%'
        }
      }));      

    const classes = useStyles();

    const hardware = [
        {
          value: '',
          label: '',
        },
        {
          value: 'cpu',
          label: 'Cpu',
        },
        {
          value: 'gpu',
          label: 'Gpu',
        },
        {
          value: 'motherboard',
          label: 'Motherboard',
        },
        {
          value: 'powersupply',
          label: 'Power supply',
        },
        {
          value: 'ram',
          label: 'Ram',
          },
        {
          value: 'storage',
          label: 'Storage',
        },
        {
          value: 'cases',
          label: 'Cases',
        }
      ];

      const rtype = [
        {
          value: '',
          label: '',
        },
        {
          value: 'DDR3',
          label: 'DDR3',
        },
        {
          value: 'DDR4',
          label: 'DDR4',
        }
      ];

      const longText = "80plus is an efficiency-certification which show the power supply efficiency reaches 80% or above. "

      function readFile(file) {
        return new Promise(resolve => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result), false)
          reader.readAsDataURL(file)
        })
      }

      const onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]
          let imageDataUrl = await readFile(file)
    
          setIcon(imageDataUrl)
        }
      }
    
      const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])
    
      const showCroppedImage = useCallback(async () => {

        try {
          const croppedImage = await getCroppedImg(
            icon,
            croppedAreaPixels,
            rotation
          )
          console.log('donee', { croppedImage })
            setBlobImage(croppedImage)
            setCroppedImage(URL.createObjectURL(croppedImage))
            setCropdone(true)
        } catch (e) {
          console.error(e)
        }
      }, [croppedAreaPixels, rotation])
    
      const onClose = useCallback(() => {
        setCroppedImage(null)
      }, [])

      const recrop = () => {setCropdone(false)}

      async function add(type,name,description,price,blobImage,tdp,socket,ramtype,vram,m2,pcapacity,bronze,rcapacity,frequency,capacity,port,ssize) {

        const formData = new FormData();
        formData.append('type',type)
        formData.append('name',name)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('icon',blobImage)
        formData.append('tdp',tdp)
        formData.append('socket',socket)
        formData.append('ramtype',ramtype)
        formData.append('vram',vram)
        formData.append('m2',m2)
        formData.append('mbsize',mbsize)
        formData.append('pcapacity',pcapacity)
        formData.append('bronze',bronze)
        formData.append('rcapacity',rcapacity)
        formData.append('scapacity',scapacity)
        formData.append('frequency',frequency)
        formData.append('capacity',capacity)
        formData.append('port',port)
        formData.append('size',ssize)

        const Options = {
            method: 'POST',

            body: formData
        };
    
        const response = await fetch('http://localhost:5000/hardware/add', Options)
        }
        
        function addhardware(type,name,description,price,blobImage,tdp,socket,ramtype){
        
            return dispatch => {
        
              add(type,name,description,price,blobImage,tdp,socket,ramtype,vram,m2,pcapacity,bronze,rcapacity,frequency,capacity,port,ssize)
                    .then(
                        message => {
                          dispatch(alertActions.success('Add successful'));
                          history.push('/hardwareinfupload');
                          window.location.reload();
                        },
                        error => {
                          dispatch(alertActions.error(error.toString()));
                        }
                    );
            };
        }

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addhardware(type,name,description,price,blobImage,tdp,socket,ramtype,vram,m2,pcapacity,bronze,rcapacity,frequency,capacity,port,ssize))
        
        setType('')
        setName('')
        setDescription('')
        setPrice('')
        setIcon('')
        setTdp('')
        setRamtype('')
        setSocket('')
        setVram('')
        setPcapacity('')
        setBronze('')
        setCapacity('')
        setFrequency('')
        setPort('')
        setSsize('')
        setCrop('')
        setCroppedAreaPixels('')
        setCroppedImage('')
        setZoom('')
    }

    function blobTobase64(blob) {
      var reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = function() {
          var base64data = reader.result;                
          console.log(base64data);
      }
      }

    return (
      <div style={{flexGrow: 1,}}>
      <Grid   container
      direction="row"
      justify="center"
      alignItems="center"
      >
          
            <ValidatorForm onError={errors => console.log(errors)}
                onSubmit={handleSubmit} className={classes.root} autoComplete="off">
                <FormLabel component="legend" style={{fontSize:'24px'}}>Hardware</FormLabel><br/>
                <FormControl className={classes.formControl}>

                    <TextField
                        id="native-simple"
                        select
                        label="Hardware type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        helperText="Please select the hardware type"
                        name='type'
                        validators={['required']}
                        errorMessages={['this field is required']}
                        >
                        {hardware.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField>

                    <TextValidator style={{minWidth:'170'}} id="standard-basic" label="hardware name" 
                    name="name" type="text" onChange={(e) => setName(e.target.value)} value={name} 
                    validators={['required','maxStringLength:50']}
                    errorMessages={['this field is required','Too long']}/>

                    <TextValidator
                        id="standard-multiline-static"
                        label="Description"
                        name="description"
                        multiline
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        validators={['required','maxStringLength:200']}
                        errorMessages={['this field is required','Too long']}/>

                    <TextValidator style={{minWidth:'170'}} id="standard-basic" label="price" 
                    name="price" type="float" onChange={(e) => setPrice(e.target.value)} value={price} 
                    validators={['required','maxStringLength:200','isFloat']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <FileValidator
                    imgExtension={[".jpg",".png"]}
                    maxFileSize={5242880}
                    accept={[".jpg",".png"]}
                    fileSizeError="file size is too big"
                    fileTypeError="is not supported file extension"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    fullwidth
                    onChange={onFileChange}
                    name='icon'
                    value={icon}
                    validators={['required']}
                    errorMessages={['this field is required']}/>

                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Image upload
                      </Button>
                    </label><br/>

                    {!cropdone && icon &&
                    <div style={{position:'relative',height:'auto',width:'auto'}}>
                      <div style={{position:'relative',height:'360px',width:'360px'}}>
                    <Cropper
                      image={icon}
                      crop={crop}
                      zoom={zoom}
                      zoomWithScroll='true'
                      onZoomChange={setZoom}
                      zoomSpeed={0.1}
                      minZoom={0.5}
                      aspect={1/1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      restrictPosition={false}
                    /></div>
                    <div style={{position:'relative'}}>
                      <Slider
                      value={zoom}
                      min={0.5}
                      max={2}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                      classes={{ container: 'slider' }}
                    /></div>
                    <div style={{position:'relative'}}>
                    <Button variant="contained" color="primary" component="span" 
                    onClick={showCroppedImage}>
                        crop
                    </Button>
                    <br/><br/>
                    </div></div>}

                    {cropdone && croppedImage &&

                    <div style={{position:'relative',height:'auto',width:'100%'}}>
                      <div style={{position:'relative',display: 'block'}}>
                      cropped image:<br/><br/>
                    <img src={croppedImage} style={{display:'Block',maxHeight:'340px',maxWidth:'340px'}}></img><br/><br/>
                    </div>
                    <div style={{position:'relative'}}>
                    <Button variant="contained" color="primary" component="span"
                    onClick={recrop}>
                        recrop
                    </Button><br/><br/></div></div>}

                    {type=='cpu' &&
                    <div
                    style={{          
                    position: 'relative',
                    }}>
                      <FormControl className={classes.formControl}>
                    <TextValidator id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} placeholder='W'
                    validators={['required','maxStringLength:20','isNumber','isPositive']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator  id="standard-basic" label="socket" name="socket" type="text"
                    onChange={(e) => setSocket(e.target.value)} value={socket}
                    validators={['required','maxStringLength:20','isString']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    <br/>

                    <TextField
                        id="native-simple"
                        
                        select
                        label="support Ram type"
                        value={ramtype}
                        onChange={(e) => setRamtype(e.target.value)}
                        helperText="Please select the Ram type"
                        name='ramtype'
                        validators={['required']}
                        errorMessages={['this field is required']}
                        >
                        {rtype.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField>
                    </FormControl>
                    </div>
                    }

                    {type=='gpu' &&
                    <div
                    style={{          
                    position: 'relative',
                    }}>
                      <FormControl className={classes.formControl}>
                    <TextValidator  id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} placeholder='W'
                    validators={['required','maxStringLength:20','isString']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    <br/>

                    <TextValidator  id="standard-basic" label="vram" name="vram" type="int"
                    onChange={(e) => setVram(e.target.value)} value={vram} 
                    validators={['required','maxStringLength:20','isNumber','isPositive']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    </FormControl></div>
                    }

                    {type=='motherboard' &&
                    <div
                    style={{          
                    position: 'relative',
                    }}>
                      <FormControl className={classes.formControl}>
                    <TextValidator  id="standard-basic" label="	socket" name="socket" type="int"
                    onChange={(e) => setSocket(e.target.value)} value={socket} 
                    validators={['required','maxStringLength:20','isString']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    <br/>

                    <TextField
                        id="native-simple"
                        select
                        label="support Ram type"
                        value={ramtype}
                        onChange={(e) => setRamtype(e.target.value)}
                        helperText="Please select the hardware type"
                        name='type'
                        validators={['required']}
                        errorMessages={['this field is required']}
                        >
                        {rtype.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField><br/>

                      <TextField
                      id="native-simple"
                      select
                      label="M.2. support"
                      value={m2}
                      onChange={(e) => setM2(e.target.value)}
                      helperText="Please select the hardware type"
                      name='m2'
                      validators={['required']}
                      errorMessages={['this field is required']}
                      >
                      <MenuItem value={'yes'}>Yes</MenuItem>
                      <MenuItem value={'no'}>No</MenuItem>
                      ))}</TextField>
                      
                      <TextField
                      id="native-simple"
                      select
                      label="Size"
                      value={mbsize}
                      onChange={(e) => setMbsize(e.target.value)}
                      helperText="Please select the motherboard size"
                      name='mbsize'
                      validators={['required']}
                      errorMessages={['this field is required']}
                      >
                      <MenuItem value={'ATX'}>ATX</MenuItem>
                      <MenuItem value={'MATX'}>MATX</MenuItem>
                      <MenuItem value={'ITX'}>ITX</MenuItem>
                      ))}</TextField>
                      </FormControl>
                      </div>
                    }

                    {type=='powersupply' &&
                    <div
                    style={{          
                    position: 'relative',
                    }}>
                      <FormControl className={classes.formControl}>
                    <TextValidator  id="standard-basic" label="power capacity" name="pcapacity" type="int" 
                    onChange={(e) => setPcapacity(e.target.value)} value={pcapacity} 
                    helperText="Please input the watt of the power supply"
                    validators={['required','maxStringLength:20','isNumber','isPositive']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextField
                    id="native-simple"
                    select
                    label="80 Plus"
                    value={bronze}
                    onChange={(e) => setBronze(e.target.value)}
                    helperText="Please select the 80plus type"
                    name='bronze'
                    validators={['required']}
                    errorMessages={['this field is required']}
                    >
                    <MenuItem value={''}>no 80plus</MenuItem>
                    <MenuItem value={'bronze'}>Bronze</MenuItem>
                    <MenuItem value={'sliver'}>Silver</MenuItem>
                    <MenuItem value={'gold'}>Gold</MenuItem>
                    <MenuItem value={'platinum'}>Platinum</MenuItem>
                    <MenuItem value={'titanium'}>Titanium</MenuItem>
                    ))}
                    </TextField>
                    <Tooltip title={longText} classes={{ tooltip: classes.customWidth }}>
                      <HelpOutlineIcon />
                    </Tooltip>
                    </FormControl>
                    </div>
                    }

                    {type=='ram' &&
                    <div
                    style={{          
                    position: 'relative',
                    }}>
                      <FormControl className={classes.formControl}>
                    <TextValidator  id="standard-basic" label="capacity" name="capacity" type="int" 
                    onChange={(e) => setRcapacity(e.target.value)} value={rcapacity} 
                    validators={['required','maxStringLength:20','isNumber','isPositive']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator  id="standard-basic" label="frequency" name="frequency" type="int"
                    onChange={(e) => setFrequency(e.target.value)} value={frequency} 
                    validators={['required','maxStringLength:20','isNumber','isPositive']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>
                    
                    <TextField
                        id="native-simple"
                        
                        select
                        label="Ram type"
                        value={ramtype}
                        onChange={(e) => setRamtype(e.target.value)}
                        helperText="Please select the hardware type"
                        name='type'
                        validators={['required']}
                        errorMessages={['this field is required']}
                        >
                        {rtype.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField>
                    </FormControl></div>
                    }

                    {type=='storage' &&
                    <div
                    style={{          
                    position: 'relative',
                    }}>
                      <FormControl className={classes.formControl}>
                    <TextValidator  id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} placeholder='W'
                    validators={['required','maxStringLength:20','isNumber','isPositive']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator  id="standard-basic" label="capacity" name="scapacity" type="int" 
                    onChange={(e) => setScapacity(e.target.value)} value={scapacity} placeholder='GB'
                    validators={['required','maxStringLength:20','isNumber','isPositive']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextField
                    id="native-simple"
                    select
                    label="Port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    helperText="Please select the port"
                    name='port'
                    validators={['required']}
                    errorMessages={['this field is required']}
                    >
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'sata'}>SATA</MenuItem>
                    <MenuItem value={'m2'}>M2</MenuItem>
                    ))}
                    </TextField>

                    <TextField
                    id="native-simple"
                    select
                    label="Storage size"
                    value={ssize}
                    onChange={(e) => setSsize(e.target.value)}
                    helperText="Support storage size"
                    name='size'
                    validators={['required']}
                    errorMessages={['this field is required']}
                    >
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'3.5'}>3.5 inches</MenuItem>
                    <MenuItem value={'5.25'}>5.25 inches</MenuItem>
                    ))}
                    </TextField>

                    </FormControl></div>
                    }

                    {type=='cases' &&
                    <div
                    style={{          
                    position: 'relative',
                    }}>
                      
                      <FormControl className={classes.formControl}>

                    <TextField
                    id="native-simple"
                    select
                    label="Support storage size"
                    value={ssize}
                    onChange={(e) => setSsize(e.target.value)}
                    helperText="Support storage size"
                    name='size'
                    validators={['required']}
                    errorMessages={['this field is required']}
                    >
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'3.5'}>3.5 inches</MenuItem>
                    <MenuItem value={'5.25'}>5.25 inches</MenuItem>
                    ))}
                    </TextField>

                    <TextField
                      id="native-simple"
                      select
                      label="Size"
                      value={mbsize}
                      onChange={(e) => setMbsize(e.target.value)}
                      helperText="Please select the motherboard size"
                      name='mbsize'
                      validators={['required']}
                      errorMessages={['this field is required']}
                      >
                      <MenuItem value={'ATX'}>ATX</MenuItem>
                      <MenuItem value={'MATX'}>MATX</MenuItem>
                      <MenuItem value={'ITX'}>ITX</MenuItem>
                      ))}</TextField>

                    </FormControl></div>}<br/>

                <Button type="submit" 
                fullwidth variant="contained" color="primary">Submit</Button>

            </FormControl>

            </ValidatorForm>
            </Grid>
        </div>
    )
}

export default withRouter(HardwareForm);
