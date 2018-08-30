import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Row,
  Col,
  Thumbnail,
  Badge,
  Panel
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import nGram from "word-ngrams";
import * as tf from "@tensorflow/tfjs";
import { Card } from "antd";
import "antd/dist/antd.css";

const gridStyle = {
  width: "33.3%",
  textAlign: "center"
};

export default class Sentiment_Comprehend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sentimentText: "",
      tensor_sentiment: null,
      alertStyle: "warning",
      word_counts: null,
      review: "",
      currentPrediction: 0,
      word_index: null,
      loadingText: "",
      hasModelLoaded: false,
      currentModel: null
    };
  }

  buildWordCountArray(text) {
    var sentiment = nGram.buildNGrams(text.text, 1);
    this.setState({
      tensor_sentiment: sentiment
    });

    var curr = null;
    var word_counts = new Array(500);

    for (var i = 0; i < 500; i++) {
      word_counts[i] = 0;
    }

    for (curr in sentiment) {
      if (this.state.word_index[curr] != null) {
        word_counts[this.state.word_index[curr]] += sentiment[curr];
      }
    }

    this.setState({
      word_counts
    });
    console.log(word_counts);
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
      await this.buildWordCountArray({
        text: this.state.sentimentText
      });

      var currentTensor = tf.tensor2d([this.state.word_counts], [1, 500]);
      currentTensor.print();

      var prediction = await this.state.currentModel
        .predict(currentTensor)
        .data();
      console.log(prediction[0]);

      var currentPrediction = prediction[0] * 100;
      var alertStyle = "warning";
      var review = "NEUTRAL";

      if (currentPrediction > 55) {
        review = "POSITIVE";
        alertStyle = "success";
      } else if (currentPrediction < 45) {
        review = "NEGATIVE";
        alertStyle = "danger";
      }
      this.setState({
        review,
        currentPrediction,
        alertStyle
      });

      this.setState({ isLoading: false });
    } catch (e) {
      alert(e);
      console.log(e);
      this.setState({ isLoading: false });
    }
  };

  handleModelLoad = async event => {
    this.setState({ isLoading: true });
    try {
      var response = await window.fetch(
        "https://s3.amazonaws.com/groups-app-upload/public/word_index/word_index.json"
      );
      var word_index = await response.json();

      var currentModel = await tf.loadModel(
        "https://s3.amazonaws.com/groups-app-upload/public/model.json"
      );

      this.setState({
        word_index,
        currentModel,
        isLoading: false,
        hasModelLoaded: true
      });
    } catch (e) {
      this.setState({ isLoading: false });
      console.log(e);
    }
  };

  renderModelInfo() {
    return (
      <div>
        <Card title="Keras Model Details" style={{ margin: "20px" }}>
          <Card.Grid style={gridStyle}>Vocab Size: 500</Card.Grid>
          <Card.Grid style={gridStyle}>Layers: 2</Card.Grid>
          <Card.Grid style={gridStyle}>Epochs: 7</Card.Grid>
        </Card>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          type="submit"
          isLoading={this.state.isLoading}
          text="Load Keras Model"
          loadingText="Loading Keras Model"
          onClick={this.handleModelLoad}
        />
      </div>
    );
  }

  renderSentimentDetectionForm() {
    return (
      <form onSubmit={this.handleSentimentSubmit}>
        <Card title="Keras Model Loaded" style={{ margin: "20px" }} />
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
          {this.state.tensor_sentiment && this.state.isLoading === false ? (
            <Alert
              bsStyle={
                this.state.alertStyle ? this.state.alertStyle : "success"
              }
            >
              <h4>{this.state.review} Review</h4>
              <p>
                Positivity Score: {this.state.currentPrediction.toFixed(2)} /
                100
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
          loadingText={
            this.state.loadingText !== ""
              ? this.state.loadingText
              : "Detecting Sentiment"
          }
        />
      </form>
    );
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={3} md={3} />
            <Col xs={6} md={6}>
              <Thumbnail
                href="https://js.tensorflow.org/tutorials/import-keras.html"
                alt="300x200"
                src="https://raw.githubusercontent.com/leriomaggio/deep-learning-keras-tensorflow/master/imgs/releases/keras-tensorflow-logo.jpg"
              />
            </Col>
            <Col xs={3} md={3} />
          </Row>
        </Grid>
        {this.state.hasModelLoaded
          ? this.renderSentimentDetectionForm()
          : this.renderModelInfo()}
      </div>
    );
  }
}
