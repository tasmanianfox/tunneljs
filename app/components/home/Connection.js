// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerIcon from '@material-ui/icons/Power';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import routes from '../../constants/routes.json';

import styles from './Home.css';

import { Connection as ConnectionType } from '../../types/connection';

const application = require('../../backend');

type Props = {
  connection: ConnectionType,
  onRemoveClick: ConnectionType => {}
};

export default class Connection extends Component<Props> {
  props: Props;

  render() {
    const { connection, onRemoveClick } = this.props;
    const { auth, name, gate } = connection;
    console.log(application.getApplication());

    return (
      <Grid item className={styles.connectionBlock}>
        <Paper className={styles.padding10}>
          <Grid direction="row" container>
            <Grid item xl={8} lg={8} sm={8} xs={12}>
              <Typography variant="title" gutterBottom>
                {name || 'Unnamed connection'}
              </Typography>
              <Typography variant="subheading" gutterBottom>
                {auth.user || 'unnamed_user'}@{gate.host || 'empty_host'}:
                {gate.port || 'empty_port'}
              </Typography>
            </Grid>
            <Grid
              xl={4}
              lg={4}
              sm={4}
              xs={12}
              item
              className={styles.controlsBlock}
            >
              <Button
                variant="fab"
                color="primary"
                mini
                aria-label="Connect"
                className={styles.controlsButton}
                onClick={() => {
                  application.getApplication().setupConnection(connection);
                }}
              >
                <PowerIcon />
              </Button>
              <Button
                variant="fab"
                mini
                aria-label="Edit"
                className={styles.controlsButton}
              >
                <Link to={`${routes.EDIT}/${connection.id}`}>
                  <EditIcon />
                </Link>
              </Button>
              <Button
                variant="fab"
                color="secondary"
                mini
                aria-label="Remove"
                className={styles.controlsButton}
                onClick={onRemoveClick}
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
