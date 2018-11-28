// @flow
import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import styles from './Home.css';
import Connection from './Connection';

export type ConnectionType = {
  local: NetworkNode,
  gate: NetworkNode,
  target: NetworkNode
};

type Props = {
  addConnection: () => void,
  +connections: Array<ConnectionType>,
  deleteConnectionClick: ConnectionType => void,
  sshConnectionEstabilished: ConnectionType => void,
  sshConnectionTerminated: ConnectionType => void
};

export default class ConnectionsList extends Component<Props> {
  props: Props;

  renderAddButton() {
    const { addConnection } = this.props;

    return (
      <Grid key="btnAdd" item className={styles.connectionBlock}>
        <Button
          variant="contained"
          fullWidth
          mini
          color="primary"
          onClick={addConnection}
        >
          <AddIcon />
          Add a new connection
        </Button>
      </Grid>
    );
  }

  render() {
    const {
      connections,
      deleteConnectionClick,
      sshConnectionEstabilished,
      sshConnectionTerminated
    } = this.props;
    const connectionBlocks = connections.map(connection => (
      <Connection
        key={connection.id}
        connection={connection}
        onRemoveClick={() => {
          deleteConnectionClick(connection);
        }}
        onSshConnectionEstabilished={() => {
          sshConnectionEstabilished(connection);
        }}
        onSshConnectionTerminated={() => {
          sshConnectionTerminated(connection);
        }}
      />
    ));
    connectionBlocks.push(this.renderAddButton());

    return (
      <Grid
        justify="center"
        xl={4}
        lg={6}
        md={6}
        sm={8}
        xs={12}
        item
        direction="column"
        container
      >
        {connectionBlocks}
      </Grid>
    );
  }
}
