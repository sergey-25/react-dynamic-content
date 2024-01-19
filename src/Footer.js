import React from 'react';
import SimpleContainer from './SimpleContainer';
import Box from '@mui/material/Box';


function Footer(props) {
    return (
      <div style={{background:'#f7f7f7'}}>
          <SimpleContainer >
              <Box sx={{padding:'20px 0', }}>
            <footer>
              
              <p>&copy; 2023. All rights reserved.</p>
             
            </footer>
            </Box>
        </SimpleContainer>
      </div>
    );
}

export default Footer;
