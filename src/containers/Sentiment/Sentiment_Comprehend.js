import React, { Component } from "react";
import { Alert, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { API } from "aws-amplify";

export default class Sentiment_Comprehend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sentimentText: "",
      comprehend_sentiment: null,
      alertStyle: null
    };
  }

  getSentimentFromComprehend(text) {
    return API.post("groups", "/detect_sentiment", {
      body: {
        LanguageCode: "en",
        Text: text.text
      }
    });
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
    var res = "";

    try {
      res = await this.getSentimentFromComprehend({
        text: this.state.sentimentText
      });

      var alertStyle = "danger";

      if (res.Sentiment === "NEUTRAL") {
        alertStyle = "warning";
      } else if (res.Sentiment === "POSITIVE") {
        alertStyle = "success";
      }

      this.setState({
        comprehend_sentiment: res,
        alertStyle
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
            placeholder="Type anything in here to see if it is positive, negative or neutral"
            onChange={this.handleChange}
            value={this.state.sentimentText}
            componentClass="textarea"
          />
        </FormGroup>
        <FormGroup>
          {this.state.comprehend_sentiment ? (
            <Alert
              bsStyle={
                this.state.alertStyle ? this.state.alertStyle : "success"
              }
            >
              <h4>{this.state.comprehend_sentiment.Sentiment}</h4>
              <p>{JSON.stringify(this.state.comprehend_sentiment)}</p>
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
