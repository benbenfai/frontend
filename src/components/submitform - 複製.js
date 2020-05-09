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
import './styles.css'
import { useForm } from "react-hook-form"
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-cropper';

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
    const [submit,setSubmit] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const udata = {}

    const { register, errors, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    const useStyles = makeStyles(theme => ({
        root: {
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '30%',
          padding: "20px",
          left: "50%"
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
          position: 'relative',
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

      const cropperRef = useRef(null)

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

      const [crop, setCrop] = useState({ aspect: 1 / 1 });
      const [img,setImg ] = useState('');

      function crop(){
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
      }

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
                        ref={register({ required: true, maxLength: 20 })}
                        >
                        {hardware.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {errors.singleErrorInput && "Your input is required"}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="hardware name" name="name" type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    {!name && <FormHelperText>Hardware name is required</FormHelperText>}

                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {!description && <FormHelperText>Description is required</FormHelperText>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="price" name="price" type="float" onChange={(e) => setPrice(e.target.value)} value={price} />
                    {!price && <FormHelperText>Hardwarename is required</FormHelperText>}<br/>

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
                    />

                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Image upload
                      </Button>
                    </label>
                    
                    <ReactCrop src={icon} crop={crop} 
                    onChange={newCrop => setCrop(newCrop)}/>

                    <img src={img}></img>

                      <Button variant="contained" color="primary" component="span">
                        crop
                      </Button>

                    {type=='cpu' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} />
                    {!tdp && <FormHelperText>Tdp is required</FormHelperText>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="	socket" name="socket" type="int"
                    onChange={(e) => setSocket(e.target.value)} value={socket} />
                    {!socket && <FormHelperText>Socket is required</FormHelperText>}
                    </div>
                    }

                    {type=='gpu' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} />
                    {!tdp && <FormHelperText>Tdp is required</FormHelperText>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="	vram" name="vram" type="int"
                    onChange={(e) => setVram(e.target.value)} value={vram} />
                    {!vram && <FormHelperText>vram is required</FormHelperText>}
                    </div>
                    }

                    {type=='motherboard' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="	socket" name="socket" type="int"
                    onChange={(e) => setSocket(e.target.value)} value={socket} />
                    {!socket && <FormHelperText>Socket is required</FormHelperText>}
                    </div>
                    }

                    {type=='powersupply' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="power capacity" name="pcapacity" type="int" 
                    onChange={(e) => setPcapacity(e.target.value)} value={pcapacity} />
                    {!pcapacity && <FormHelperText>capacity is required</FormHelperText>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="bronze" name="bronze" type="int"
                    onChange={(e) => setBronze(e.target.value)} value={bronze} />
                    {!bronze && <FormHelperText>bronze is required</FormHelperText>}
                    </div>
                    }

                    {type=='ram' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="capacity" name="capacity" type="int" 
                    onChange={(e) => setCapacity(e.target.value)} value={capacity} />
                    {!capacity && <FormHelperText>capacity is required</FormHelperText>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="frequency" name="frequency" type="int"
                    onChange={(e) => setFrequency(e.target.value)} value={frequency} />
                    {!frequency && <FormHelperText>frequency is required</FormHelperText>}
                    </div>
                    }

                    {type=='storage' &&
                    <div>
                    <TextField style={{minWidth:'170'}} id="standard-basic" label="tdp" name="tdp" type="int" 
                    onChange={(e) => setTdp(e.target.value)} value={tdp} />
                    {!tdp && <FormHelperText>Tdp is required</FormHelperText>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="capacity" name="capacity" type="int" 
                    onChange={(e) => setCapacity(e.target.value)} value={capacity} />
                    {!capacity && <FormHelperText>capacity is required</FormHelperText>}

                    <TextField style={{minWidth:'170'}} id="standard-basic" label="port" name="port" type="int"
                    onChange={(e) => setPort(e.target.value)} value={port} />
                    {!port && <FormHelperText>port is required</FormHelperText>}
                    </div>
                    }

                    </FormControl>

                <br/><br/><Button type="submit" fullwidth variant="contained" color="primary">Submit</Button>

            </form>
        </div>
    )
}

export default withRouter(HardwareForm);
