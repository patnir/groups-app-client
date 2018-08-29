import React, { Component } from "react";
import { Tabs, PageHeader, Tab } from "react-bootstrap";
import "./Sentiment.css";
import SentimentComprehend from "./Sentiment/Sentiment_Comprehend";
import SentimentNPM from "./Sentiment/Sentiment_NPM";
import SentimentTensorflow from "./Sentiment/Sentiment_Tensorflow";
import MovieLookup from "./Sentiment/Movie_Lookup";

export default class Sentiment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      movieReviewUrl: ""
    };
  }

  validateMovieForm() {
    return this.state.movieReviewUrl.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="Sentiment">
        <PageHeader>
          Detect Sentiment <small>With...</small>
        </PageHeader>
        <Tabs
          style={{ margin: "20px" }}
          defaultActiveKey={1}
          animation={false}
          id="noanim-tab-example"
        >
          <Tab style={{ margin: "20px" }} eventKey={1} title="AWS Comprehend">
            {<SentimentComprehend />}
          </Tab>
          <Tab
            style={{ margin: "20px" }}
            eventKey={2}
            title="NPM Sentiment Analysis"
          >
            {<SentimentNPM />}
          </Tab>
          <Tab
            style={{ margin: "20px" }}
            eventKey={3}
            title="Tensorflow and Keras"
          >
            {<SentimentTensorflow />}
          </Tab>
          <Tab style={{ margin: "20px" }} eventKey={4} title="Movie Lookup">
            {<MovieLookup />}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
