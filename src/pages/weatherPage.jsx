import React, { useState, useEffect } from 'react';
import { Grid, GridRow } from 'semantic-ui-react';

import Chat from '../components/chat.jsx';

// sign up form component
function WeatherPage() {
  return (
    <Grid>
      <GridRow>
        Weather thing goes here.
      </GridRow>
      <GridRow>
        <Chat />
      </GridRow>
    </Grid>
  );
}

export default WeatherPage;
