/*
 *
 * TopRedditPosts
 *
 */

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTopRedditPosts from './selectors';
import reducer from './reducer';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table, TableBody, TableCell,
  TableHead, TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TopRedditPostsHeatMap from 'components/TopRedditPostsHeatMap';
import * as d3 from 'd3';
import TopRedditPostsBarChart from '../../components/TopRedditPostsBarChart';
import TopRedditPostsScatterPlot from '../../components/TopRedditPostsScatterPlot';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopRedditPostsHeatMapEncodingTable from '../../components/TopRedditPostsHeatMapEncodingTable';
import TopRedditPostsScatterPlotEncodingTable from '../../components/TopRedditPostsScatterPlotEncodingTable';
import TopRedditPostsBarChartEncodingTable from '../../components/TopRedditPostsBarChartEncodingTable';

const key = 'topRedditPosts';

const stateSelector = createStructuredSelector({
  topRedditPosts: makeSelectTopRedditPosts(),
});

interface Props {
}


export interface HeatMapDataPoint {
  dayOfWeek: number;
  hourOfDay: number;
  numPosts: number;
}

export interface Post {
  id: string;
  title: string;
  score: number;
  times: number;
  ratio: number;
  comm: number;
  auth: string;
  subreddit: string;
  links: string;
  selftext: string;
  hour: number;
  day: number;
  month: number;
  year: number;
  website: string;
  subjectivity: number;
  polarity: number;
}

function TopRedditPosts(props: Props) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: key, reducer: reducer });

  const { topRedditPosts } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const emptyHourOfWeekData: HeatMapDataPoint[] = [];
  const emptyArray: Post[] = [];
  const [hourOfWeekData, setHourOfWeekData] = React.useState(emptyHourOfWeekData);
  const [rawData, setRawData] = React.useState(emptyArray);
  React.useEffect(() => {
    d3.csv('/datasets/alltimereddit.csv')
      .then((data) => {
        const processedDict = {};
        data.forEach(row => {
          const dayOfWeek = new Date(row.year, +row.month - 1, row.day).getDay();
          if (!processedDict[dayOfWeek]) {
            processedDict[dayOfWeek] = {};
          }
          if (!processedDict[dayOfWeek][row.hour]) {
            processedDict[dayOfWeek][row.hour] = 0;
          }
          processedDict[dayOfWeek][row.hour] += 1;
        });
        const processedData: HeatMapDataPoint[] = [];
        Object.keys(processedDict).forEach(dayOfWeek => {
          Object.keys(processedDict[dayOfWeek]).forEach(hourOfDay => {
            const row = {
              dayOfWeek: +dayOfWeek,
              hourOfDay: +hourOfDay,
              numPosts: +processedDict[dayOfWeek][hourOfDay],
            };
            processedData.push(row);
          });
        });
        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
        processedData.sort((a, b) => d3.ascending(a.hourOfDay, b.hourOfDay));
        setHourOfWeekData(processedData);
        setRawData(data);
      });
  }, []);

  return (
    <div>
      <CssBaseline/>

      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Link to="/">
                <IconButton>
                  <ArrowBackIosIcon style={{ color: 'lightgray' }}/>
                </IconButton>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Top Reddit Posts Viz
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box padding="4em">
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Typography>
              The following visualizations were generated using the dataset found <a
              href="https://www.kaggle.com/nossair/top-500-reddit-posts-of-all-time" style={{ color: 'blue' }}>here</a>.
            </Typography>
            <br/>
            <br/>
            <Card>
              <CardContent>
                <Typography>
                  "Reddit . . ., is an American social news aggregation, web content rating, and discussion website . .
                  .,
                  Reddit ranks as the No. 5 most visited website in the U.S. and No. 13 in the world, according to Alexa
                  Internet, with 55% of its user base coming from the United States, followed by the United Kingdom at
                  7.4%
                  and Canada at 5.8%."
                </Typography>
                <br/>
                <Typography>
                  - Wikipedia
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <br/>
            <Typography>
              It would hence be interesting to find out if there are any trends within the top 500 posts on such a
              widely
              used platform.
            </Typography>
            <br/>
            <Typography>
              The dataset contains details of the top 500 posts of all time on Reddit as of 27th January 2020. The
              columns
              relevant to this page are score (No. of upvotes), comm (No. of comments), hour, day, month and year.
            </Typography>
          </Grid>
          <Grid container item direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">
                Exploratory
              </Typography>
              <Typography variant="h5">
                Time of Week Heatmap
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Are there more top 500 posts in certain times of the week?
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                To explore the possibility that the time of the week affects the number of top 500 posts, the following
                heatmap is plotted:
              </Typography>
            </Grid>
            <Grid item>
              <TopRedditPostsHeatMap data={hourOfWeekData}/>
            </Grid>
            <Grid item>
              <TopRedditPostsHeatMapEncodingTable />
            </Grid>
            <Grid item>
              <Typography>
                From the chart, it is clear that most posts in the top 500 are posted from 10:00 to 23:59 UTC. But it is
                not clear if there are significantly more top 500 posts on certain days of the week.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                Scatter Plot, Number of Votes against Number of Comments
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Is the number of votes correlated to the number of comments?
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                To explore the possibility that the number of votes affects the number of comments, a scatter plot is
                drawn.
              </Typography>
            </Grid>
            <Grid item>
              <TopRedditPostsScatterPlot data={rawData}/>
            </Grid>
            <Grid item>
              <TopRedditPostsScatterPlotEncodingTable />
            </Grid>
            <Grid item>
              <Typography>
                One would expect that the more popular posts would have a higher number of comments but it does not seem
                to be the case as shown in the graph. The regression line also does not seem to be a good fit (In fact
                the
                R-Squared value is only 0.025).
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">
                Confirmatory
              </Typography>
              <Typography variant="h5">
                Bar Chart, Number of Top 500 Posts posted on each day of the week
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Are there more top 500 posts in certain days of the week?
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                To check if the day of the week affects the number of top 500 posts, the following
                bar chart is plotted:
              </Typography>
            </Grid>
            <Grid item>
              <TopRedditPostsBarChart data={hourOfWeekData}/>
            </Grid>
            <Grid item>
              <TopRedditPostsBarChartEncodingTable />
            </Grid>
            <Grid item>
              <Typography>
                From the graph, there is no significant change in the number of top 500 posts made even as the day of
                the
                week changes.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default memo(TopRedditPosts);
