import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Row,
  Thumbnail,
  Col
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { API } from "aws-amplify";
import { s3Download } from "../../libs/awsLib";

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

  readS3File = async event => {
    this.setState({
      isLoading: true
    });
    try {
      var response = await window.fetch(
        "https://s3.amazonaws.com/groups-app-upload/public/word_index/word_index.json"
      );
      var responseJson = await response.json();
      console.log(responseJson["2"]);
      console.log(responseJson["although"]);
      console.log(responseJson["asdf"] == null);
      this.setState({
        isLoading: false
      });
    } catch (e) {
      this.setState({
        isLoading: false
      });
    }
  };

  renderTest() {
    return (
      <LoaderButton
        block
        bsStyle="primary"
        bsSize="large"
        type="submit"
        isLoading={this.state.isLoading}
        text="Read S3 File"
        loadingText="Reading..."
        onClick={this.readS3File}
      />
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSentimentSubmit}>
          <Grid>
            <Row>
              <Col xs={3} md={3} />
              <Col xs={6} md={6}>
                <Thumbnail
                  href="https://aws.amazon.com/comprehend/"
                  alt="300x200"
                  src="https://pbs.twimg.com/media/DXUI449XkAEuru5.jpg"
                />
              </Col>
              <Col xs={3} md={3} />
            </Row>
          </Grid>
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
                <p>
                  Positivity Score:{" "}
                  {this.state.comprehend_sentiment.SentimentScore.Positive *
                    100}
                </p>
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
        {this.renderTest()}
      </div>
    );
  }
}
