// @flow

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';

import NavBar from './NavBar';
import StepGate from './StepGate';
import StepLocal from './StepLocal';
import StepTarget from './StepTarget';

import styles from './Edit.css';

import { Connection } from '../../models/connection';

type Props = {
  authPropertyUpdated: (string, string) => void,
  connection: ?Connection,
  connectionPropertyUpdated: (string, string) => void,
  nodePropertyUpdated: (object, string, string) => void,
  getConnection: int => void,
  match: object,
  nextPage: () => void,
  previousPage: () => void,
  saveConnection: Connection => void,
  step: integer
};

export default class Edit extends Component<Props> {
  props: Props;

  renderContent() {
    const {
      authPropertyUpdated,
      connection,
      nodePropertyUpdated,
      step
    } = this.props;

    switch (step) {
      case 0:
        return (
          <StepLocal
            node={connection.local}
            nodePropertyUpdated={nodePropertyUpdated}
          />
        );
      case 1:
        return (
          <StepGate
            node={connection.gate}
            auth={connection.auth}
            authPropertyUpdated={authPropertyUpdated}
            nodePropertyUpdated={nodePropertyUpdated}
          />
        );
      case 2:
        return (
          <StepTarget
            node={connection.target}
            nodePropertyUpdated={nodePropertyUpdated}
          />
        );
      default:
        return null;
    }
  }

  renderSshExample() {
    const { step } = this.props;

    return (
      <div>
        <Typography
          variant="body1"
          gutterBottom
          className={styles.descriptionBlock}
        >
          <strong>A hint: OpenSSH command.</strong>
          This is an example of OpenSSH command which forwards a SSH connection
          to local port. Highlighted part of the command shows command line
          options which are going to be modified on current tab.
        </Typography>
        <div className={styles.exampleCommand}>
          <span>ssh -f -N -L </span>
          <span style={{ color: step === 1 ? 'red' : 'black' }}>
            -i ~/.ssh/id_rsa{' '}
          </span>
          <span style={{ color: step === 0 ? 'red' : 'black' }}>
            127.0.0.1:3307
          </span>
          <span>:</span>
          <span style={{ color: step === 2 ? 'red' : 'black' }}>
            mysql.internal.example.com:3306{' '}
          </span>
          <span style={{ color: step === 1 ? 'red' : 'black' }}>
            user@example.com -p 22
          </span>
        </div>
      </div>
    );
  }

  render() {
    const {
      connection,
      connectionPropertyUpdated,
      getConnection,
      match,
      nextPage,
      previousPage,
      saveConnection,
      step
    } = this.props;

    if (connection === null) {
      getConnection(match.params.id);
      return <div />;
    }

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          container
          item
          spacing={0}
          direction="column"
          justify="center"
          xs={12}
          s={8}
          md={6}
          lg={6}
        >
          <Stepper nonLinear activeStep={step}>
            <Step key="local">
              <StepLabel>Local</StepLabel>
            </Step>
            <Step key="gate">
              <StepLabel>Gate</StepLabel>
            </Step>
            <Step key="target">
              <StepLabel>Target</StepLabel>
            </Step>
          </Stepper>

          <TextField
            label="Connection name"
            value={connection.name || ''}
            onChange={e => {
              connectionPropertyUpdated('name', e.target.value);
            }}
            margin="normal"
          />

          {this.renderContent()}
          {this.renderSshExample()}

          <NavBar
            connection={connection}
            nextPage={nextPage}
            previousPage={previousPage}
            saveConnection={saveConnection}
            step={step}
          />
        </Grid>
      </Grid>
    );
  }
}
