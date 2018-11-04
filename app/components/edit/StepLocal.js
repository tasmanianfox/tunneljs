// @flow
import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import { NetworkNode } from '../../types/connection';
import styles from './Edit.css';

type Props = {
  nodePropertyUpdated: (object, string, string) => void,
  node: NetworkNode
};

export default class StepLocal extends Component<Props> {
  props: Props;

  render() {
    const { node, nodePropertyUpdated } = this.props;

    return (
      <div>
        <Typography component="h2" variant="headline" gutterBottom>
          Local
        </Typography>

        <Input
          placeholder="Host"
          value={node.host || ''}
          onChange={e => {
            nodePropertyUpdated('local', 'host', e.target.value);
          }}
        />
        <span style={{ margin: '0px 10px' }}>:</span>
        <Input
          placeholder="Port"
          value={node.port || ''}
          onChange={e => {
            nodePropertyUpdated('local', 'port', e.target.value);
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
}
