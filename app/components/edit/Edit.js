// @flow
import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Input from '@material-ui/core/Input';

import StepGate from './StepGate';
import StepLocal from './StepLocal';

import styles from './Edit.css';

import { Connection } from '../../types/connection';

type Props = {
  connection: ?Connection,
  connectionPropertyUpdated: (object, string, string) => void,
  getConnection: int => void,
  match: object,
  nextPage: () => void,
  previousPage: () => void,
  step: integer
};
export default class Edit extends Component<Props> {
  props: Props;

  renderStepLocal() {
    const { connection, connectionPropertyUpdated } = this.props;
    const node = connection.local;

    return (
      <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Local
        </Typography>

        <Input
          placeholder="Host"
          value={node.host}
          onChange={e => {
            connectionPropertyUpdated('local', 'host', e.target.value);
          }}
        />
        <span style={{ margin: '0px 10px' }}>:</span>
        <Input
          placeholder="Port"
          value={node.port}
          onChange={e => {
            connectionPropertyUpdated('local', 'port', e.target.value);
          }}
        />
        <Typography
          variant="body1"
          gutterBottom
          className={styles.descriptionBlock}
        >
          In this section you need to specify the destination endpoint for SSH
          tunnel on your machine.
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          className={styles.descriptionBlock}
        >
          <strong>Host.</strong> If connection must be available only locally,
          please use &quot;127.0.0.1&quot;. If port needs to be exposed (for
          example, to your home network), please specify external IP address of
          your machine.
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          className={styles.descriptionBlock}
        >
          <strong>Port.</strong> If this field is empty, the application will
          try to find a local port which is not in use.
        </Typography>
      </div>
    );
  }

  renderStepTarget() {
    const { connection, connectionPropertyUpdated } = this.props;
    const node = connection.target;

    return (
      <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Target
        </Typography>

        <Input
          placeholder="Host"
          value={node.host}
          onChange={e => {
            connectionPropertyUpdated('target', 'host', e.target.value);
          }}
        />
        <span style={{ margin: '0px 10px' }}>:</span>
        <Input
          placeholder="Port"
          value={node.port}
          onChange={e => {
            connectionPropertyUpdated('target', 'port', e.target.value);
          }}
        />
        <Typography
          variant="body1"
          gutterBottom
          className={styles.descriptionBlock}
        >
          This is address of target machine. In other words, this should be host
          and port of remote server which accepts connections and is available
          from the Gate machine (see step 2). Sometimes the server application
          and SSH server are deployed to the same machine. In this case the
          &quot;127.0.0.1&quot; address might be specified.
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          className={styles.descriptionBlock}
        >
          <strong>Port.</strong> This is actually a port which you need to
          forward form remote server.
        </Typography>
      </div>
    );
  }

  renderContent() {
    const { connection, connectionPropertyUpdated, step } = this.props;

    switch (step) {
      case 0:
        return (
          <StepLocal
            node={connection.local}
            connectionPropertyUpdated={connectionPropertyUpdated}
          />
        );
      case 1:
        return (
          <StepGate
            node={connection.gate}
            auth={connection.auth}
            connectionPropertyUpdated={connectionPropertyUpdated}
          />
        );
      case 2:
        return this.renderStepTarget();
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
            user@example.com:22
          </span>
        </div>
      </div>
    );
  }

  render() {
    const {
      connection,
      getConnection,
      match,
      nextPage,
      previousPage,
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

          {this.renderContent()}
          {this.renderSshExample()}

          <Grid
            container
            item
            spacing={0}
            direction="row"
            justify="space-between"
          >
            <Grid
              container
              item
              spacing={0}
              justify="flex-start"
              xs={6}
              s={6}
              md={6}
              lg={6}
            >
              <Button
                variant="fab"
                color="primary"
                mini
                aria-label="Previous"
                onClick={() => {
                  previousPage();
                }}
              >
                <ArrowBackIcon />
              </Button>
            </Grid>
            <Grid
              container
              item
              spacing={0}
              justify="flex-end"
              xs={6}
              s={6}
              md={6}
              lg={6}
            >
              <Button
                variant="fab"
                color="primary"
                mini
                aria-label="Next"
                onClick={() => {
                  nextPage();
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
