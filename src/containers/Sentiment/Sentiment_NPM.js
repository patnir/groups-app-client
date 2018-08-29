import React, { Component } from "react";
import { Alert, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import SentimentAnalysis from "sentiment";

export default class Sentiment_Comprehend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      review: "",
      sentimentText: "",
      npm_sentiment: null,
      alertStyle: null
    };
  }

  getSentimentFromNPM(text) {
    var sentiment = new SentimentAnalysis();
    var result = sentiment.analyze(String(text.text));
    var alertStyle = "danger";
    var review = "NEGATIVE";

    if (result.score > 0) {
      review = "POSITIVE";
      alertStyle = "success";
    } else if (result.score === 0) {
      review = "NEUTRAL";
      alertStyle = "warning";
    }
    this.setState({
      npm_sentiment: result,
      review,
      alertStyle
    });

    return result;
  }

  validateForm() {
    return this.state.sentimentText.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSentimentSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.getSentimentFromNPM({
        text: this.state.sentimentText
      });
      this.setState({ isLoading: false });
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSentimentSubmit}>
        <FormGroup controlId="sentimentText">
          <ControlLabel>Check Sentiment</ControlLabel>
          <FormControl
            placeholder="Enter any text here"
            onChange={this.handleChange}
            value={this.state.sentimentText}
            componentClass="textarea"
          />
        </FormGroup>
        <FormGroup>
          {this.state.npm_sentiment ? (
            <Alert
              bsStyle={
                this.state.alertStyle ? this.state.alertStyle : "success"
              }
            >
              <h4>{this.state.review} Review</h4>
              <p>{JSON.stringify(this.state.npm_sentiment)}</p>
            </Alert>
          ) : (
            <div />
          )}
        </FormGroup>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Detect Sentiment"
          loadingText="Detecting…"
        />
      </form>
    );
  }
}
