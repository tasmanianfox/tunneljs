// @flow

import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { NetworkNode } from '../../models/networkNode';

import styles from './Edit.css';

type Props = {
  node: NetworkNode,
  nodePropertyUpdated: (object, string, string) => void
};

export default class StepTarget extends Component<Props> {
  render() {
    const { node, nodePropertyUpdated } = this.props;

    return (
      <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Target
        </Typography>

        <TextField
          label="Host"
          value={node.host || ''}
          onChange={e => {
            nodePropertyUpdated('target', 'host', e.target.value);
          }}
          margin="normal"
        />
        <TextField
          label="Port"
          value={node.port || ''}
          onChange={e => {
            nodePropertyUpdated('target', 'port', e.target.value);
          }}
          margin="normal"
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
}
