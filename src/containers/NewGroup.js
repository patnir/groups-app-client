import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { DatePicker, TimePicker, InputNumber } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import "./NewGroup.css";
import { API } from "aws-amplify";

export default class NewGroup extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      meetingLocation: "",
      meetingDate: "08/10/2018",
      meetingTime: "12:00",
      meetingTimeMoment: null,
      attendanceLimit: 1,
      meetingNotes: "",
      participantIds: []
    };
  }

  validateForm() {
    return (
      this.state.meetingNotes.length > 0 &&
      this.state.meetingLocation.length > 0
    );
  }

  handleInputNumberChange = number => {
    this.setState({
      attendanceLimit: number
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleDatePickerChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      meetingDate: dateString
    });
  };

  handleTimePickerChange = (time, timeString) => {
    console.log(time, timeString);
    this.setState({
      meetingTime: timeString,
      meetingTimeMoment: time
    });
    console.log(this.state.meetingTime);
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.createNote({
        meetingLocation: this.state.meetingLocation,
        meetingDate: this.state.meetingDate,
        meetingTime: this.state.meetingTime,
        attendanceLimit: this.state.attendanceLimit,
        meetingNotes: this.state.meetingNotes,
        participantIds: this.state.participantIds
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  createNote(note) {
    return API.post("groups", "/groups", {
      body: note
    });
  }

  render() {
    const format = "HH:mm";

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="meetingNotes">
          <ControlLabel>Meeting Focus</ControlLabel>
          <FormControl
            placeholder="Subject/ Homework/ Exam/ etc."
            onChange={this.handleChange}
            value={this.state.meetingNotes}
            componentClass="textarea"
          />
        </FormGroup>
        <FormGroup controlId="meetingLocation">
          <ControlLabel>Meeting Location</ControlLabel>
          <FormControl
            placeholder="RAWLS 1051 [Going to make this a Google Maps location picker]"
            onChange={this.handleChange}
            value={this.state.meetingLocation}
            componentClass="textarea"
          />
        </FormGroup>
        <Col xs={6}>
          <ControlLabel>Meeting Date</ControlLabel>
        </Col>
        <Col xs={6}>
          <ControlLabel>Meeting Time</ControlLabel>
        </Col>
        <Col xs={6}>
          <FormGroup controlId="meetingDate">
            <DatePicker
              defaultValue={moment("2018-08-10", "YYYY-MM-DD")}
              onChange={this.handleDatePickerChange}
              value={moment(this.state.meetingDate)}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup controlId="meetingTime">
            <TimePicker
              onChange={this.handleTimePickerChange}
              value={
                this.state.meetingTimeMoment
                  ? this.state.meetingTimeMoment
                  : moment("12:00", format)
              }
              format={format}
              defaultValue={moment("12:00", format)}
            />
          </FormGroup>
        </Col>

        <FormGroup controlId="attendanceLimit">
          <ControlLabel>Group Attendance Limit</ControlLabel>
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            onChange={this.handleInputNumberChange}
          />
        </FormGroup>

        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Create"
          loadingText="Creating…"
        />
      </form>
    );
  }
}
