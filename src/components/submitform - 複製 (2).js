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
import { useForm } from "react-hook-form"
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import * as yup from 'yup'

const HardwareForm = (props) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription ] = useState('');
    const [price, setPrice ] = useState('');
    const [icon,setIcon ] = useState('');
    const [tdp, setTdp ] = useState('');
    const [socket, setSocket ] = useState('');
    const [vram, setVram ] = useState('');
    const [pcapacity, setPcapacity ] = useState('');
    const [bronze, setBronze ] = useState('');
    const [capacity, setCapacity ] = useState('');
    const [frequency, setFrequency ] = useState('');
    const [port, setPort ] = useState('');
    const [crop,setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [cropdone, setCropdone] = useState(false);
    const [rstate, setRstate] = useState(false)
    const [crstate, setCrstate] = useState(false)
    const dispatch = useDispatch();
    const udata = {}

    const Schema = yup.object().shape({
      type: yup.string().required(),
      name: yup.string()
                .length(20,'Too Long!')
                .required(),
      description: yup.string()
                      .length(200,'Too Long!')
                      .required(),
      price: yup.number()
                .min(0)
                .positive()
                .required(),
      tdp: yup.number()
                .min(0)
                .positive(),
      socket: yup.string()
                .length(20,'Too Long!'),
      vram: yup.number()
                .min(0)
                .positive(),
      pcapacity: yup.number()
                .min(0)
                .positive(),
      bronze: yup.string()
                .length(20,'Too Long!'),
      capacity: yup.number()
                .min(0)
                .positive(),
      frequency: yup.number()
                .min(0)
                .positive('Can not be negative!'),
      port: yup.string()
                .length(20,'Too Long!'),
    })

    const { register, errors, handleSubmit } = useForm({
      validationSchema: Schema});
    const onSubmit = data => console.log(data);
    
    const useStyles = makeStyles(theme => ({
        root: {
          position: 'relative',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '30%',
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

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">
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
                        ref={register}
                        >
                        {hardware.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {errors.type && <p>{errors.type.message}</p>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="hardware name" 
                    name="name" type="text" onChange={(e) => setName(e.target.value)} value={name} 
                    ref={register}/>
                    {errors.name && <p>{errors.name.message}</p>}

                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        name="description"
                        multiline
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ref={register}
                    />
                    {errors.description && <p>{errors.description.message}</p>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="price" 
                    name="price" type="float" onChange={(e) => setPrice(e.target.value)} value={price} 
                    ref={register}/>
                    {errors.price && <p>{errors.price.message}</p>}
                    <br/>

                    <input
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
                    ref={register({ required: true})}
                    name='icon'
                    />
                    {errors.icon && <p>{errors.icon.message}</p>}

                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Image upload
                      </Button>
                    </label><br/>

                    {!cropdone && icon &&
                    <div style={{position:'relative',height:'500px',width:'500px'}}>
                    <Cropper
                      image={icon}
                      crop={crop}
                      zoom={zoom}
                      onZoomChange={setZoom}
                      minZoom={0.5}
                      aspect={1/1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                    />
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
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} ref={register}/>
                    {errors.tdp && <p>{errors.tdp.message}</p>}<br/>

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="socket" name="socket" type="int"
                    onChange={(e) => setSocket(e.target.value)} value={socket} ref={register}/>
                    {errors.socket && <p>{errors.socket.message}</p>}
                    </div>
                    }

                    {type=='gpu' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} ref={register}/>
                    {errors.tdp && <p>{errors.tdp.message}</p>}<br/>

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="vram" name="vram" type="int"
                    onChange={(e) => setVram(e.target.value)} value={vram} ref={register}/>
                    {errors.vram && <p>{errors.vram.message}</p>}
                    </div>
                    }

                    {type=='motherboard' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="	socket" name="socket" type="int"
                    onChange={(e) => setSocket(e.target.value)} value={socket} ref={register}/>
                    {errors.socket && <p>{errors.socket.message}</p>}
                    </div>
                    }

                    {type=='powersupply' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="power capacity" name="pcapacity" type="int" 
                    onChange={(e) => setPcapacity(e.target.value)} value={pcapacity} ref={register}/>
                    {errors.pcapacity && <p>{errors.pcapacity.message}</p>}<br/>

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="bronze" name="bronze" type="int"
                    onChange={(e) => setBronze(e.target.value)} value={bronze} ref={register}/>
                    {errors.bronze && <p>{errors.bronze.message}</p>}
                    </div>
                    }

                    {type=='ram' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="capacity" name="capacity" type="int" 
                    onChange={(e) => setCapacity(e.target.value)} value={capacity} ref={register}/>
                    {errors.capacity && <p>{errors.capacity.message}</p>}<br/>

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="frequency" name="frequency" type="int"
                    onChange={(e) => setFrequency(e.target.value)} value={frequency} ref={register}/>
                    {errors.frequency && <p>{errors.frequency.message}</p>}
                    </div>
                    }

                    {type=='storage' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} ref={register}/>
                    {errors.tdp && <p>{errors.tdp.message}</p>}<br/>

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="capacity" name="capacity" type="int" 
                    onChange={(e) => setCapacity(e.target.value)} value={capacity} ref={register}/>
                    {errors.capacity && <p>{errors.capacity.message}</p>}<br/>

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="port" name="port" type="int"
                    onChange={(e) => setPort(e.target.value)} value={port} ref={register}/>
                    {errors.port && <p>{errors.port.message}</p>}
                    </div>
                    }

                    </FormControl>

                <br/><br/><Button type="submit" 
                style={{position:'relative'}}
                fullwidth variant="contained" color="primary">Submit</Button>

            </form>
        </div>
    )
}

export default withRouter(HardwareForm);
