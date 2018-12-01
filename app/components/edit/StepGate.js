// @flow
import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  isMethodPassword,
  isMethodPrivateKey
} from '../../models/connectionAuth';

import styles from './Edit.css';

const { dialog } = require('electron').remote;

type Props = {
  auth: ConnectionAuth,
  authPropertyUpdated: (string, string) => void,
  nodePropertyUpdated: (object, string, string) => void,
  node: NetworkNode
};

export default class StepGate extends Component<Props> {
  props: Props;

  renderCredentials() {
    const { auth, authPropertyUpdated } = this.props;

    if (isMethodPassword(auth)) {
      return (
        <div>
          <TextField
            label="Password"
            value={auth.password || ''}
            type="password"
            onChange={e => {
              authPropertyUpdated('password', e.target.value);
            }}
          />
        </div>
      );
    }
    if (isMethodPrivateKey(auth)) {
      return (
        <div>
          <TextField
            label="Path to private key"
            value={auth.privateKeyPath || ''}
            onChange={e => {
              authPropertyUpdated('privateKeyPath', e.target.value);
            }}
            style={{ width: '100%' }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dialog.showOpenDialog({ properties: ['openFile'] }, fileNames => {
                authPropertyUpdated('privateKeyPath', fileNames[0]);
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
    const { auth, authPropertyUpdated, node, nodePropertyUpdated } = this.props;

    return (
      <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Gate
        </Typography>

        <TextField
          label="Host"
          value={node.host || ''}
          onChange={e => {
            nodePropertyUpdated('gate', 'host', e.target.value);
          }}
          margin="normal"
        />
        <TextField
          label="Port"
          value={node.port || ''}
          onChange={e => {
            nodePropertyUpdated('gate', 'port', e.target.value);
          }}
          margin="normal"
        />

        <div>
          <TextField
            label="User"
            value={auth.user || ''}
            onChange={e => {
              authPropertyUpdated('user', e.target.value);
            }}
          />
        </div>

        <div>
          <strong>Auth method: </strong>
          <FormControlLabel
            value="password"
            control={
              <Radio
                color="primary"
                onChange={e => {
                  authPropertyUpdated('method', e.target.value);
                }}
              />
            }
            label="Password"
            labelPlacement="end"
            checked={isMethodPassword(auth)}
          />
          <FormControlLabel
            value="private_key"
            control={
              <Radio
                color="primary"
                onChange={e => {
                  authPropertyUpdated('method', e.target.value);
                }}
              />
            }
            label="Private key"
            labelPlacement="end"
            checked={isMethodPrivateKey(auth)}
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
