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
import styles from './Home.css';

import { Connection } from '../../models/connection';

export type Props = {
  connection: ?Connection,
  isOpen: boolean,
  onYesClick: () => void,
  onNoClick: () => void
};

const renderContentBlock = content => (
  <Grid
    container
    item
    xl={8}
    lg={8}
    sm={8}
    xs={8}
    className={styles.deleteDialogItemBlock}
  >
    {content}
  </Grid>
);

const renderDownarrow = () =>
  renderContentBlock(
    <Grid container alignItems="center" justify="center">
      <ArrowDownward />
    </Grid>
  );

const renderNodeBlock = (node, title) => {
  const port = node.port ? `:${node.port}` : '';

  return renderContentBlock(
    <Grid item xl={12} lg={12} sm={12} xs={12}>
      <Paper className={styles.padding10}>
        <Typography variant="title" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>{`${
          node.host
        }${port}`}</Typography>
      </Paper>
    </Grid>
  );
};

const renderLocalBlock = node => renderNodeBlock(node, 'Local');
const renderGateBlock = node => renderNodeBlock(node, 'Gate');
const renderTargetBlock = node => renderNodeBlock(node, 'Target');

/**
 * Delete confirmation dialog
 */
class DeleteDialog extends Component<Props> {
  props: Props;

  renderContent() {
    const { isOpen, connection } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <DialogContent>
        <Grid container alignItems="center" direction="column">
          {renderLocalBlock(connection.local)}
          {renderDownarrow()}
          {renderGateBlock(connection.gate)}
          {renderDownarrow()}
          {renderTargetBlock(connection.target)}
        </Grid>
      </DialogContent>
    );
  }

  render() {
    const { connection, isOpen, onYesClick, onNoClick } = this.props;

    if (!connection) {
      return <div />;
    }

    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete connection &quot;
            {connection.name}
            &quot;?
          </DialogTitle>

          {this.renderContent()}

          <DialogActions>
            <Button
              onClick={() => {
                onNoClick(connection);
              }}
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={() => {
                onYesClick(connection);
              }}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
