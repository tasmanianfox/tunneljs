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
import HelpIcon from '@material-ui/icons/Help';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Input from '@material-ui/core/Input';

import styles from './Edit.css';

// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import { Connection } from '../../types/connection'


// import { Link } from 'react-router-dom';

type Props = {
  connection: ?Connection,
  getConnection: (int) => void,
  match: object,
  connectionPropertyUpdated: (object, string, string) => void,
  step: integer
};
export default class Edit extends Component<Props> {
  props: Props;

  renderStepLocal() {
    const { connection, connectionPropertyUpdated } = this.props;
    const node = connection.local;

    return <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Local
        </Typography>

        <Input
          placeholder="Host"
          value={node.host}
          onChange={e => { connectionPropertyUpdated('local', 'host', e.target.value) }}
        />
        <span style={{margin: '0px 10px'}}>:</span>
        <Input
          placeholder="Port"
          value={node.port}
          onChange={e => { connectionPropertyUpdated('local', 'port', e.target.value) }}
        />
        <Typography variant="body1" gutterBottom className={styles.descriptionBlock}>
          In this section you need to specify the destination endpoint for SSH tunnel on your machine.
        </Typography>

        <Typography variant="body1" gutterBottom className={styles.descriptionBlock}>
          <strong>Host.</strong> If connection must be available only locally, please use "127.0.0.1".
          If port needs to be exposed (for example, to your home network), please specify external IP address of your machine.
        </Typography>

        <Typography variant="body1" gutterBottom className={styles.descriptionBlock}>
          <strong>Port.</strong> If this field is empty, the application will try to find a local port which is not in use.
        </Typography>
    </div>;
  }

  renderStepGate() {
    return <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Gate
        </Typography>

        <Input
          placeholder="Host"
        />
        <span style={{margin: '0px 10px'}}>:</span>
        <Input
          placeholder="Port"
        />
        <Typography variant="body1" gutterBottom className={styles.descriptionBlock}>
          Here you should configure a connection with remote server which will be used to forward the connection.
        </Typography>
    </div>;
  }

  renderStepTarget() {
    return <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Target
        </Typography>

        <Input
          placeholder="Host"
        />
        <span style={{margin: '0px 10px'}}>:</span>
        <Input
          placeholder="Port"
        />
        <Typography variant="body1" gutterBottom className={styles.descriptionBlock}>
          This is address of target machine. In other words, this should be host and port of remote server which accepts connections
          and is available from the Gate machine (see step 2).
          Sometimes the server application and SSH server are deployed to the same machine. In this case the "127.0.0.1" address might be specified.
        </Typography>

        <Typography variant="body1" gutterBottom className={styles.descriptionBlock}>
          <strong>Port.</strong> This is actually a port which you need to forward form remote server.
        </Typography>
    </div>;
  }


  renderContent() {
    const {
      step
    } = this.props;

    switch (step) {
      case 0:
        return this.renderStepLocal();
      case 1:
      return this.renderStepGate();
      case 2:
      return this.renderStepTarget();
      default:
        return null;
    }
  }

  renderSshExample() {
    const {
      step
    } = this.props;

    return <div>
      <Typography variant="body1" gutterBottom className={styles.descriptionBlock}>
        <strong>A hint: OpenSSH command.</strong> 
        This is an example of OpenSSH command which forwards a SSH connection to local port.
        Highlighted part of the command shows command line options which are going to be modified on current tab.
      </Typography>
      <div className={styles.exampleCommand}>
        <span>ssh -f -N -L </span>
        <span style={{color: step === 2 ? 'red' : 'black'}}>-i ~/.ssh/id_rsa </span>
        <span style={{color: step === 0 ? 'red' : 'black'}}>127.0.0.1:3307</span>
        <span>:</span>
        <span style={{color: step === 2 ? 'red' : 'black'}}>mysql.internal.example.com:3306 </span>
        <span style={{color: step === 1 ? 'red' : 'black'}}>user@example.com:22</span>
      </div>
    </div>;
  }

  render() {
    const {
      connection,
      getConnection,
      match,
      step
    } = this.props;

    if (connection === null) {
      getConnection(match.params.id);
      return <div />;
    }


    return <Grid
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
        xs={12} s={8} md={6} lg={6}
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

        { this.renderContent() }
        { this.renderSshExample() }
      </Grid>
  
    </Grid> 
            //<Link to="/">Go back</Link><br />
  }
}