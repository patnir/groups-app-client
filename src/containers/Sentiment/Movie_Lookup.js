import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Image,
  Row,
  Col,
  Panel
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";

export default class Sentiment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      movieReviewUrl: "",
      movieName: "",
      movieComponents: null
    };
  }

  validateForm() {
    return this.state.movieName.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateMovieLookupClearForm() {
    return this.state.movieComponents != null;
  }

  handleMovieSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    var result = null;

    var curr_movie = this.state.movieName.toLowerCase().replace(" ", "+");

    try {
      var response = await window.fetch(
        "http://www.omdbapi.com/?t=" + curr_movie + "&apikey=6d706eee"
      );
      result = await response.json();

      this.setState({
        movieComponents: result
      });

      this.setState({ isLoading: false });
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="MovieLookup">
        <form onSubmit={this.handleMovieSubmit}>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <FormGroup controlId="movieName">
                <ControlLabel>Enter Movie Name</ControlLabel>
                <FormControl
                  placeholder="The Dark Knight"
                  onChange={this.handleChange}
                  value={this.state.movieName}
                  componentClass="textarea"
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <LoaderButton
                block
                bsStyle="primary"
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Find Movie"
                loadingText="Finding..."
                id="movieLookupReviewButton"
              />
            </Col>
          </Row>
        </form>

        {this.state.movieComponents ? (
          <form>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <Image src={this.state.movieComponents.Poster} responsive />
              </Col>
              <Col xs={6} md={8}>
                <Panel bsStyle="primary">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">
                      {this.state.movieComponents.Title}
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>{this.state.movieComponents.Plot}</Panel.Body>
                </Panel>
              </Col>
            </Row>
          </form>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
