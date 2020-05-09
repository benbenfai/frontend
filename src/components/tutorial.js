import React, { useEffect } from 'react';
import {Container} from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';

export const Tutorial = () => {

    return (
        <Grid   container
        direction="row"
        justify="center"
        alignItems="center"
        >

        <div>
        
        <Container>

            <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>
                Hardware information upload
            </FormLabel><br/>

            <iframe 
            width="960" 
            height="540" 
            src="https://www.youtube.com/embed/Mih8xMsFdkI" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe><br/><br/>
            
            <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>
                Build Tool
            </FormLabel><br/>

            <iframe 
            width="960" 
            height="540" 
            src="https://www.youtube.com/embed/Mih8xMsFdkI" frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>

        </Container>
        </div>
        </Grid>
    );
}

export default Tutorial;