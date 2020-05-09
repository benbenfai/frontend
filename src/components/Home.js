import React, { useEffect } from 'react';
import {Container} from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';

export const Home = () => {

    return (
        <Container>

            <FormLabel component="legend" style={{display: "flex",fontSize:'24px',justifyContent: "center"}}>
                PC Build Tool
            </FormLabel><br/>

            <Typography color="inherit" variant="subtitle1" component="div">

                Hi! let make your own build!

            </Typography>

        </Container>
    );
}

export default Home;