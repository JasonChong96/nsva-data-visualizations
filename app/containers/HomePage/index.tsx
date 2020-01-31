import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Meaningless Copyright © '}
      <Link to="/">
        NSVA Data Visualizations
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = ['reddit'];

export default function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon}/>
          <Typography variant="h6" color="inherit" noWrap>
            NSVA Data Visualizations
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              NSVA Data Viz
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Not So Visually Appealing Data Visualizations which are mostly just me exploring frameworks. Some were
              created for CS5346, Data Visualization.
            </Typography>
            {/*<div className={classes.heroButtons}>*/}
            {/*  <Grid container spacing={2} justify="center">*/}
            {/*    <Grid item>*/}
            {/*      <Button variant="contained" color="primary">*/}
            {/*        Main call to action*/}
            {/*      </Button>*/}
            {/*    </Grid>*/}
            {/*    <Grid item>*/}
            {/*      <Button variant="outlined" color="primary">*/}
            {/*        Secondary action*/}
            {/*      </Button>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</div>*/}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link to={`/${card}`}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.cardMedia}
                        image="/images/reddit_viz_sample.png"
                        title="Reddit Top 500 Posts Heatmap"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Top Reddit Posts
                        </Typography>
                        <Typography>
                          Visualizations exploring possible trends within the Top 500 Reddit posts
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          More visualizations coming soon!
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Template taken from material-ui.com
        </Typography>
        <Copyright/>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
