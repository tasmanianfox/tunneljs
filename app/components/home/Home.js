// @flow

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import DeleteDialog from './DeleteDialog';

import { Connection } from '../../models/connection';
import { DialogDeleteConnectionState } from '../../reducers/dialogDeleteConnection';
import ConnectionsList from './ConnectionsList';

type Props = {
  addConnection: () => void,
  connections: Array<Connection>,
  deleteConnectionClick: () => void,
  deleteDialog: DialogDeleteConnectionState,
  onDeleteDialogYesClick: () => void,
  onDeleteDialogNoClick: () => void,
  sshConnectionError: Connection => void,
  sshConnectionEstabilished: Connection => void
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const {
      addConnection,
      connections,
      deleteDialog,
      deleteConnectionClick,
      onDeleteDialogYesClick,
      onDeleteDialogNoClick,
      sshConnectionError,
      sshConnectionEstabilished,
      sshConnectionTerminated
    } = this.props;

    return (
      <Grid justify="center" container>
        <ConnectionsList
          addConnection={addConnection}
          connections={connections}
          deleteConnectionClick={deleteConnectionClick}
          sshConnectionError={sshConnectionError}
          sshConnectionEstabilished={sshConnectionEstabilished}
          sshConnectionTerminated={sshConnectionTerminated}
        />
        <DeleteDialog
          {...deleteDialog}
          onYesClick={connection => {
            onDeleteDialogYesClick(connection);
          }}
          onNoClick={connection => {
            onDeleteDialogNoClick(connection);
          }}
        />
      </Grid>
    );
  }
}
