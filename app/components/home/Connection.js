// @flow

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerIcon from '@material-ui/icons/Power';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './Home.css';

type Auth = {
  user: string
};

type Props = {
  auth: Auth,
  name: string,
  gate: NetworkNode
};

export default class Connection extends Component<Props> {
  props: Props;

  render() {
    const { auth, name, gate } = this.props;

    return (
      <Grid item className={styles.connectionBlock}>
        <Paper className={styles.connectionBlockPaper}>
          <Grid direction="row" container>
            <Grid item xl={8} lg={8} sm={8} xs={12}>
              <Typography variant="title" gutterBottom>
                {name}
              </Typography>
              <Typography variant="subheading" gutterBottom>
                {auth.user}@{gate.host}:{gate.port}
              </Typography>
            </Grid>
            <Grid xl={4} lg={4} sm={4} xs={12} item className={styles.controlsBlock}>
              <Button
                variant="fab"
                color="primary"
                mini
                aria-label="Connect"
                className={styles.controlsButton}
              >
                <PowerIcon />
              </Button>
              <Button
                variant="fab"
                mini
                aria-label="Edit"
                className={styles.controlsButton}
              >
                <EditIcon />
              </Button>
              <Button
                variant="fab"
                color="secondary"
                mini
                aria-label="Remove"
                className={styles.controlsButton}
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}
