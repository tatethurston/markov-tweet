import React, { Component } from 'react';
import _ from 'lodash';
import API from './api';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitter_user_id: '',
      order: 1,
      markovTweets: [],
      twitterUserNames: ['realDonaldTrump']
    }
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.createMarkovTweet = this.createMarkovTweet.bind(this);
  }

  async createMarkovTweet() {
    const { twitter_user_id, order, markovTweets, twitterUserNames } = this.state;
    const tweet = await API.post('/markov_tweets', { twitter_user_id, order });
    this.setState({
      markovTweets: [tweet, ...markovTweets],
      twitterUserNames: _.uniq([twitter_user_id, ...twitterUserNames])
    });
  }

  onChangeUser(twitter_user_id) { this.setState({ twitter_user_id }); }
  onChangeOrder(e, order) { this.setState({ order }); }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Card style={{
            display: 'flex',
            padding: '15px',
            justifyContent: 'center'
          }}>
            <AutoComplete
              hintText="Twitter user name"
              searchText={this.state.twitter_user_id}
              dataSource={this.state.twitterUserNames}
              onUpdateInput={this.onChangeUser}
            />
            <p>Order: {this.state.order}</p>
            <Slider
              min={0}
              max={3}
              step={1}
              value={this.state.order}
              onChange={this.onChangeOrder}
            />
            <RaisedButton
              label="Generate Markov Tweet"
              primary
              onClick={this.createMarkovTweet}
            />
          </Card>

          {this.state.markovTweets.map(tweet =>
            <Card style={{ margin: '15px' }}>
              <CardText>{tweet.message}</CardText>
              <CardHeader
                title={`- @${tweet.twitter_user_id}`}
                subtitle={`Created ${tweet.created_at}`}
                style={{ paddingTop: '0px' }}
              />
            </Card>
          )}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
