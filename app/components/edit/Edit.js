// @flow
import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import TextField from '@material-ui/core/TextField';

import { Connection } from '../../types/connection'


import { Link } from 'react-router-dom';

type Props = {
    //connection: Connection;
};

const renderNode = (node, caption) => (
  <Grid item xs={4}>
        <Grid direction="row" container item>
          <Typography component="h3" variant="h1" gutterBottom>
            {caption}
          </Typography>
        </Grid>
          <Grid direction="row" container item>
            <Grid direction="column" container item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="standard-name"
                label="Host"
                value=""
                onChange={() => {}}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid direction="row" container item>
            <Grid direction="column" container item xs={12} sm={12} md={12} lg={12}>
            <TextField
                id="standard-name"
                label="Port"
                value=""
                onChange={() => {}}
                margin="normal"
              />
            </Grid>
          </Grid>
    </Grid> 
)

export default class Home extends Component<Props> {
  props: Props;

  render() {
    // match.params.id


    return <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
  >
    {renderNode(null, 'Target')}
    {renderNode(null, 'Gate')}
    {renderNode(null, 'Local')}
  
  
  </Grid> 
            //<Link to="/">Go back</Link><br />
  }
}
