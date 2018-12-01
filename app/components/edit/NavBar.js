// @flow

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import routes from '../../constants/routes.json';

import { Connection } from '../../models/connection';

type Props = {
  connection: ?Connection,
  nextPage: () => void,
  previousPage: () => void,
  saveConnection: Connection => void,
  step: integer
};

const renderLinkBackToHomepage = () => (
  <Link to={`${routes.HOME}`}>
    <ArrowBackIcon style={{ color: 'white' }} />
  </Link>
);

const renderLinkForwardToHomepage = () => (
  <Link to={`${routes.HOME}`}>
    <ArrowForwardIcon style={{ color: 'white' }} />
  </Link>
);

export default class NavBar extends Component<Props> {
  renderButtonBack() {
    const { previousPage } = this.props;
    const content = this.isFirstPage() ? (
      renderLinkBackToHomepage()
    ) : (
      <ArrowBackIcon />
    );

    return (
      <Button
        variant="fab"
        color="primary"
        mini
        aria-label="Previous"
        onClick={() => {
          if (!this.isFirstPage()) {
            previousPage();
          }
        }}
      >
        {content}
      </Button>
    );
  }

  renderButtonForward() {
    const { connection, nextPage, saveConnection } = this.props;
    const content = this.isLastPage() ? (
      renderLinkForwardToHomepage()
    ) : (
      <ArrowForwardIcon />
    );

    return (
      <Button
        variant="fab"
        color="primary"
        mini
        aria-label="Next"
        onClick={() => {
          if (this.isLastPage()) {
            saveConnection(connection);
          } else {
            nextPage();
          }
        }}
      >
        {content}
      </Button>
    );
  }

  isFirstPage() {
    const { step } = this.props;

    return step === 0;
  }

  isLastPage() {
    const { step } = this.props;

    return step === 2;
  }

  render() {
    return (
      <Grid container item spacing={0} direction="row" justify="space-between">
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
          {this.renderButtonBack()}
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
          {this.renderButtonForward()}
        </Grid>
      </Grid>
    );
  }
}
