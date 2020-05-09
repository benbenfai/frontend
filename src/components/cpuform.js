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
import { useForm } from "react-hook-form"
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { FileValidator } from 'react-form-validator-core';
import {Service} from './api/cpufetch';
import {history} from './useful/history';
import {alertActions} from '../actions/alert.actions';


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
    const [vram, setVram ] = useState('');
    const [pcapacity, setPcapacity ] = useState('');
    const [bronze, setBronze ] = useState('');
    const [capacity, setCapacity ] = useState('');
    const [scapacity, setScapacity ] = useState('');
    const [frequency, setFrequency ] = useState('');
    const [port, setPort ] = useState('');
    const [crop,setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [cropdone, setCropdone] = useState(false);
    const udata = {}
    const formData = new FormData();

    
    const useStyles = makeStyles(theme => ({
        root: {
          position: 'relative',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: "20px",
        },
        formControl: {
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
          value: 'case',
          label: 'Case',
        }
      ];

      const rtype = [
        {
          value: '',
          label: '',
        },
        {
          value: 'ddr3',
          label: 'DDR3',
        },
        {
          value: 'ddr4',
          label: 'DDR4',
        }
      ];

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
          setCroppedImage(croppedImage)
          setCropdone(true)
        } catch (e) {
          console.error(e)
        }
      }, [croppedAreaPixels, rotation])
    
      const onClose = useCallback(() => {
        setCroppedImage(null)
      }, [])

      const recrop = () => {setCropdone(false)}

      formData.append('type',type)
      formData.append('name',name)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('icon',icon)
      formData.append('tdp',tdp)
      formData.append('socket',socket)
      formData.append('ramtype',ramtype)
      const url = 'http://localhost:5000/hardware/addcpu'

      

      async function add(data) {

        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
        };
    
        const response = await fetch('http://localhost:5000/hardware/addcpu', Options)
    
        }
        
        function addhardware(data){
        
            return dispatch => {
        
                add(data)
                    .then(
                        message => { 
                            dispatch(alertActions.success(message.toString()));
                            history.push('/');
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
        add(formData)
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
        setCrop('')
        setCroppedAreaPixels('')
        setCroppedImage('')
        setZoom('')
        window.location.reload();
    }

    return (
        <div         
          style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
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
                        validators={['required','trim']}
                        errorMessages={['this field is required']}
                        >
                        {hardware.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField>

                    <TextValidator style={{minWidth:'170'}} id="standard-basic" label="hardware name" 
                    name="name" type="text" onChange={(e) => setName(e.target.value)} value={name} 
                    validators={['required','maxStringLength:20','trim']}
                    errorMessages={['this field is required','Too long']}/>

                    <TextValidator
                        id="standard-multiline-static"
                        label="Description"
                        name="description"
                        multiline
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        validators={['required','maxStringLength:200','trim']}
                        errorMessages={['this field is required','Too long']}/>

                    <TextValidator style={{minWidth:'170'}} id="standard-basic" label="price" 
                    name="price" type="float" onChange={(e) => setPrice(e.target.value)} value={price} 
                    validators={['required','maxStringLength:200','isFloat','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextField
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
                    validators={['isFile', 'maxFileSize:' + 5 * 1024 * 1024, 'allowedExtensions:image/png,image/jpeg']}
                    errorMessages={['File is not valid', 'Size must not exceed 5MB', 'Only png and jpeg']}/>

                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Image upload
                      </Button>
                    </label><br/>

                    {!cropdone && icon &&
                    <div style={{position:'relative',height:'500px',width:'500px'}}>
                      <div>
                    <Cropper
                      image={icon}
                      crop={crop}
                      zoom={zoom}
                      onZoomChange={setZoom}
                      aspect={1/1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                    /></div>
                    <div>
                      <Slider
                      value={zoom}
                      min={0.5}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                      classes={{ container: 'slider' }}
                    /></div>
                    <Button variant="contained" color="primary" component="span" 
                    onClick={showCroppedImage}>
                        crop
                    </Button>
                    </div>}

                    {cropdone && croppedImage &&
                    <div style={{position:'relative',height:'500px',width:'500px'}}>
                      cropped image:<br/><br/>
                    <img src={croppedImage} style={{height:'300px',width:'300px'}}></img><br/><br/>
                    <Button variant="contained" color="primary" component="span" 
                    onClick={recrop}>
                        recrop
                    </Button></div>}

                    {type=='cpu' &&
                    <div>
                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp}
                    validators={['required','maxStringLength:20','isNumber','isPositive','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="socket" name="socket" type="text"
                    onChange={(e) => setSocket(e.target.value)} value={socket}
                    validators={['required','maxStringLength:20','isString','trim']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    <br/><br/>

                    <TextField
                        id="native-simple"
                        style={{minWidth:'340'}}
                        select
                        label="support Ram type"
                        value={ramtype}
                        onChange={(e) => setRamtype(e.target.value)}
                        helperText="Please select the Ram type"
                        name='ramtype'
                        validators={['required','trim']}
                        errorMessages={['this field is required']}
                        >
                        {rtype.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField>

                    </div>
                    }

                    {type=='gpu' &&
                    <div>
                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp}
                    validators={['required','maxStringLength:20','isString','trim']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    <br/>

                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="vram" name="vram" type="int"
                    onChange={(e) => setVram(e.target.value)} value={vram} 
                    validators={['required','maxStringLength:20','isNumber','isPositive','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    </div>
                    }

                    {type=='motherboard' &&
                    <div>
                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="	socket" name="socket" type="int"
                    onChange={(e) => setSocket(e.target.value)} value={socket} 
                    validators={['required','maxStringLength:20','isString','trim']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    <br/>
                    
                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="support ramtype" name="ramtype" type="text"
                    onChange={(e) => setRamtype(e.target.value)} value={ramtype}
                    validators={['required','maxStringLength:20','isString','trim']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    <br/>

                    <TextField
                        id="native-simple"
                        style={{minWidth:'340'}}
                        select
                        label="support Ram type"
                        value={type}
                        onChange={(e) => setRamtype(e.target.value)}
                        helperText="Please select the hardware type"
                        name='type'
                        validators={['required','trim']}
                        errorMessages={['this field is required']}
                        >
                        {rtype.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField>
                    </div>
                    }

                    {type=='powersupply' &&
                    <div>
                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="power capacity" name="pcapacity" type="int" 
                    onChange={(e) => setPcapacity(e.target.value)} value={pcapacity} 
                    validators={['required','maxStringLength:20','isNumber','isPositive','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="bronze" name="bronze" type="int"
                    onChange={(e) => setBronze(e.target.value)} value={bronze} 
                    validators={['required','maxStringLength:20','isString','trim']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    </div>
                    }

                    {type=='ram' &&
                    <div>
                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="capacity" name="capacity" type="int" 
                    onChange={(e) => setCapacity(e.target.value)} value={capacity} 
                    validators={['required','maxStringLength:20','isNumber','isPositive','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="frequency" name="frequency" type="int"
                    onChange={(e) => setFrequency(e.target.value)} value={frequency} 
                    validators={['required','maxStringLength:20','isNumber','isPositive','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>
                    
                    <TextField
                        id="native-simple"
                        style={{minWidth:'340'}}
                        select
                        label="Ram type"
                        value={type}
                        onChange={(e) => setRamtype(e.target.value)}
                        helperText="Please select the hardware type"
                        name='type'
                        validators={['required','trim']}
                        errorMessages={['this field is required']}
                        >
                        {rtype.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}</TextField>
                    </div>
                    }

                    {type=='storage' &&
                    <div>
                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} 
                    validators={['required','maxStringLength:20','isNumber','isPositive','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="capacity" name="scapacity" type="int" 
                    onChange={(e) => setScapacity(e.target.value)} value={scapacity} 
                    validators={['required','maxStringLength:20','isNumber','isPositive','trim']}
                    errorMessages={['this field is required','Too long','It is not number','can not be negative']}/>
                    <br/>

                    <TextValidator style={{minWidth:'340'}} id="standard-basic" label="port" name="port" type="int"
                    onChange={(e) => setPort(e.target.value)} value={port} 
                    validators={['required','maxStringLength:20','isString','trim']}
                    errorMessages={['this field is required','Too long','It is not text']}/>
                    </div>
                    }

                    </FormControl>

                <br/><br/><Button type="submit" 
                style={{position:'relative'}}
                fullwidth variant="contained" color="primary">Submit</Button>

            </ValidatorForm>
        </div>
    )
}

export default withRouter(HardwareForm);
