import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import {
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import moment from "moment";
import "antd/dist/antd.css";
import "./Groups.css";
import { DatePicker, TimePicker, InputNumber } from "antd";
// import { ResourceGroupsTaggingAPI } from "../../node_modules/aws-sdk/clients/all";

const format = "HH:mm";

export default class Groups extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isInitialLoading: false,
      isLoading: false,
      isDeleting: false,
      group: null,
      meetingLocation: "",
      meetingDate: "",
      meetingTime: "",
      meetingTimeMoment: null,
      attendanceLimit: 1,
      meetingNotes: "",
      participantIds: [],
      groupAndOwnerMatch: false,
      currentUserId: "",
      currentUserIsAParticipant: false
    };
  }

  async componentDidMount() {
    this.setState({
      isInitialLoading: true
    });

    try {
      const userCreds = await Auth.currentUserCredentials();
      const currentUserId = userCreds.data.IdentityId;

      const group = await this.getGroup();
      if (group.userId === currentUserId) {
        this.setState({
          groupAndOwnerMatch: true
        });
        // alert("owners match");
      } else {
        if (group.participantIds.includes(currentUserId)) {
          this.setState({
            currentUserIsAParticipant: true
          });
        }
      }
      console.log(group.meetingTime);
      if (
        group.meetingTime === null ||
        group.meetingTime === "" ||
        group.meetingTime === "Invalid date"
      ) {
        group.meetingTime = "12:00";
      }

      const {
        meetingLocation,
        meetingDate,
        meetingTime,
        meetingTimeMoment,
        attendanceLimit,
        meetingNotes,
        participantIds
      } = group;

      this.setState({
        group,
        meetingLocation,
        meetingDate,
        meetingTime,
        meetingTimeMoment,
        attendanceLimit,
        meetingNotes,
        currentUserId,
        participantIds: participantIds ? participantIds : []
      });

      this.setState({
        isInitialLoading: false
      });
    } catch (e) {
      alert(e);

      this.setState({
        isInitialLoading: false
      });
    }
  }

  // should be accessible only if user is owner
  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });
  };

  getGroup() {
    return API.get("groups", `/groups/${this.props.match.params.id}`);
  }

  renderLoading() {
    return (
      <div className="Groups">
        <h1>Loading</h1>
      </div>
    );
  }

  render() {
    // return ;
    return (
      <div className="Groups">
        {this.state.isInitialLoading
          ? this.renderLoading()
          : this.state.groupAndOwnerMatch
            ? this.renderOwnerMatch()
            : this.renderOwnerDontMatch()}
      </div>
    );
  }

  saveGroup(group) {
    return API.put("groups", `/groups/${this.props.match.params.id}`, {
      body: group
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.saveGroup({
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
      console.log(e);
      this.setState({ isLoading: false });
    }
  };

  deleteGroup() {
    return API.del("groups", `/groups/${this.props.match.params.id}`);
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteGroup();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleInputNumberChange = number => {
    this.setState({
      attendanceLimit: number
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

  renderOwnerMatch() {
    return (
      <div className="Group">
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
                    : moment(this.state.meetingTime, format)
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
              value={this.state.attendanceLimit}
              onChange={this.handleInputNumberChange}
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={this.state.isDeleting}
            onClick={this.handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
        </form>
      </div>
    );
  }

  renderInformationPanel() {
    return (
      <Panel className="InformationPanel">
        <Panel.Heading>Group Information</Panel.Heading>
        <Panel.Body>Agenda: {this.state.meetingNotes}</Panel.Body>
        <Panel.Body>
          <ListGroup>
            <ListGroupItem>Where: {this.state.meetingLocation}</ListGroupItem>
            <ListGroupItem>
              When: {this.state.meetingDate} @ {this.state.meetingTime}
            </ListGroupItem>
            <ListGroupItem>
              Attendance Total: {this.state.attendanceLimit}
            </ListGroupItem>
          </ListGroup>
        </Panel.Body>
        <Panel.Body>Owner: {this.state.currentUserId}</Panel.Body>
      </Panel>
    );
  }

  renderODM_Filled() {
    return (
      <div>
        <h3>This ClassGroup is Full</h3>
        <h5>
          {this.state.groupAndOwnerMatch
            ? "You are the owner of this group"
            : " You are NOT the owner of this group."}
        </h5>
        <h5>
          {this.state.currentUserIsAParticipant
            ? "You are part of this group"
            : "You are NOT part of this group."}
        </h5>
        {this.state.groupAndOwnerMatch ||
        this.state.currentUserIsAParticipant ? (
          <div>{this.renderInformationPanel()}</div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  renderODM_NotFilled() {
    return (
      <div className="lander">
        <div>{this.renderInformationPanel()}</div>
        <h3>
          This ClassGroup will be activated when enough people sign up for this
          group
        </h3>
        <h5>
          {this.state.participantIds.length} / {this.state.attendanceLimit} have
          signed up so far
        </h5>
        {this.state.currentUserIsAParticipant ? (
          <form onSubmit={this.handleLeaveSubmit}>
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              type="submit"
              isLoading={this.state.isLoading}
              text="Leave This Section"
              loadingText="Leaving this group..."
            />
          </form>
        ) : (
          <form onSubmit={this.handleSignupSubmit}>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              type="submit"
              isLoading={this.state.isLoading}
              text="Signup For This Section"
              loadingText="Joining this group..."
            />
          </form>
        )}
      </div>
    );
  }

  handleSignupSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    var joined = this.state.participantIds.concat(this.state.currentUserId);
    this.setState({ participantIds: joined });

    console.log(this.state.participantIds);

    try {
      await this.saveGroup({
        meetingLocation: this.state.meetingLocation,
        meetingDate: this.state.meetingDate,
        meetingTime: this.state.meetingTime,
        attendanceLimit: this.state.attendanceLimit,
        meetingNotes: this.state.meetingNotes,
        participantIds: joined
      });

      this.setState({ currentUserIsAParticipant: true });

      // this.props.history.push(`/groups/${this.props.match.params.id}`);
    } catch (e) {
      alert(e);
      console.log(e);
      this.setState({ isLoading: false });
    }

    this.setState({ isLoading: false });
  };

  handleLeaveSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    var removed = this.state.participantIds;

    var index = this.state.participantIds.indexOf(this.state.currentUserId);
    if (index > -1) {
      removed.splice(index, 1);
    } else {
      console.log("DIDNT FIND THE ELEMENT");
    }
    // array = [2, 9]
    this.setState({ participantIds: removed });

    try {
      await this.saveGroup({
        meetingLocation: this.state.meetingLocation,
        meetingDate: this.state.meetingDate,
        meetingTime: this.state.meetingTime,
        attendanceLimit: this.state.attendanceLimit,
        meetingNotes: this.state.meetingNotes,
        participantIds: removed
      });

      this.setState({ currentUserIsAParticipant: false });

      // this.props.history.push(`/groups/${this.props.match.params.id}`);
    } catch (e) {
      alert(e);
      console.log(e);
      this.setState({ isLoading: false });
    }

    this.setState({ isLoading: false });
  };

  renderOwnerDontMatch() {
    return this.state.participantIds.length === this.state.attendanceLimit
      ? this.renderODM_Filled()
      : this.renderODM_NotFilled();
  }
}
