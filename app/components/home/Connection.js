// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import routes from '../../constants/routes.json';

import styles from './Home.css';

import { Connection as ConnectionType } from '../../models/connection';

const application = require('electron').remote.require('./backend');

type Props = {
  connection: ConnectionType,
  onRemoveClick: ConnectionType => {},
  onSshConnectionEstabilished: ConnectionType => {},
  onSshConnectionTerminated: ConnectionType => {}
};

export default class Connection extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.onConnectClick = this.onConnectClick.bind(this);
    this.onDisconnectClick = this.onDisconnectClick.bind(this);
  }

  getPaperColor() {
    const { connection } = this.props;

    if (connection.isActive) {
      return styles.connectionActive;
    }

    return '';
  }

  async onConnectClick() {
    const { connection, onSshConnectionEstabilished } = this.props;

    await application.getApplication().setupConnection(connection);
    onSshConnectionEstabilished(connection);
  }

  onDisconnectClick() {
    const { connection, onSshConnectionTerminated } = this.props;

    application.getApplication().terminateConnection(connection);
    onSshConnectionTerminated(connection);
  }

  renderConnectButton() {
    const { connection } = this.props;

    if (connection.isActive) {
      return (
        <Button
          variant="fab"
          color="secondary"
          mini
          aria-label="Disconnect"
          className={styles.controlsButton}
          onClick={this.onDisconnectClick}
        >
          <PowerOffIcon />
        </Button>
      );
    }

    return (
      <Button
        variant="fab"
        color="primary"
        mini
        aria-label="Connect"
        className={styles.controlsButton}
        onClick={this.onConnectClick}
      >
        <PowerIcon />
      </Button>
    );
  }

  render() {
    const { connection, onRemoveClick } = this.props;
    const { auth, name, gate } = connection;

    return (
      <Grid item className={styles.connectionBlock}>
        <Paper className={`${styles.padding10} ${this.getPaperColor()}`}>
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
              {this.renderConnectButton()}
              <Button
                variant="fab"
                mini
                aria-label="Edit"
                className={styles.controlsButton}
                disabled={connection.isActive}
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
                disabled={connection.isActive}
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
