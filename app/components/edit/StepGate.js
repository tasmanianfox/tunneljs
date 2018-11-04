// @flow
import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ConnectionAuth, NetworkNode } from '../../types/connection';

import styles from './Edit.css';

const { dialog } = require('electron').remote;

type Props = {
  auth: ConnectionAuth,
  connectionPropertyUpdated: (object, string, string) => void,
  node: NetworkNode
};

export default class StepGate extends Component<Props> {
  props: Props;

  renderCredentials() {
    const { auth } = this.props;

    if (auth.isMethodPassword()) {
      return (
        <div>
          <Input placeholder="Password" value="" type="password" />
        </div>
      );
    }
    if (auth.isMethodPrivateKey()) {
      return (
        <div>
          <Input placeholder="Path to private key" value="" />

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dialog.showOpenDialog({ properties: ['openFile'] }, fileNames => {
                console.log(fileNames);
              });
            }}
          >
            Browse
          </Button>
        </div>
      );
    }

    return null;
  }

  render() {
    const { auth, node, connectionPropertyUpdated } = this.props;

    return (
      <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Gate
        </Typography>

        <TextField
          label="Host"
          value={node.host || ''}
          onChange={e => {
            connectionPropertyUpdated('gate', 'host', e.target.value);
          }}
          margin="normal"
        />
        <TextField
          label="Port"
          value={node.port || ''}
          onChange={e => {
            connectionPropertyUpdated('gate', 'port', e.target.value);
          }}
          margin="normal"
        />

        <div>
          <Input
            placeholder="User"
            value={auth.user || ''}
            onChange={() => {}}
          />
        </div>

        <div>
          <strong>Auth method: </strong>
          <FormControlLabel
            value="password"
            control={<Radio color="primary" />}
            label="Password"
            labelPlacement="end"
            checked={auth.isMethodPassword()}
          />
          <FormControlLabel
            value="private_key"
            control={<Radio color="primary" />}
            label="Private key"
            labelPlacement="end"
            checked={auth.isMethodPrivateKey()}
          />
        </div>

        {this.renderCredentials()}

        <Typography
          variant="body1"
          gutterBottom
          className={styles.descriptionBlock}
        >
          Here you should configure a connection with remote server which will
          be used to forward the connection.
        </Typography>
      </div>
    );
  }
}
