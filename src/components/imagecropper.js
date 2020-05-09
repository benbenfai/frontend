import React,{ useState, useEffect, useCallback, useRef, Fragment } from 'react'
import Cropper from 'react-easy-crop'
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

export default function Crop(){

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

      const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setImg(croppedArea)
      }

      const [icon,setIcon] = useState('');
      const [img,setImg] = useState('');
      const [crop,setCrop] = useState({ x: 0, y: 0 });
      const [size,setSize] = useState({width:'300px',height:'300px'});

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
          width: '300px',
          height: '300px'
        },
      }));      

      
      const classes = useStyles();

    return(
        <div>
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
        </label><br/>

        {icon &&
        <div>
        <Cropper
        image={icon}
        crop={crop}
        zoom={1}
        aspect={1/1}
        onCropChange={setCrop}
        /></div>}

        <Button variant="contained" color="primary" component="span" onclick={onCropComplete}>
            crop
        </Button>
        </div>
    )
}