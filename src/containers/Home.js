import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import { API, Auth } from "aws-amplify";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      groups: [],
      currentUserId: ""
    };
  }

  async componentDidMount() {
    const userCreds = await Auth.currentUserCredentials();
    const currentUserId = userCreds.data.IdentityId;

    this.setState({
      currentUserId
    });

    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const groups = await this.groups();
      this.setState({ groups });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  groups() {
    return API.get("groups", "/groups");
  }

  renderGroupsList(groups) {
    return [{}].concat(groups).map(
      (group, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={group.groupId}
            href={`/groups/${group.groupId}`}
            onClick={this.handleGroupClick}
            header={
              group.meetingNotes
                ? group.meetingNotes.trim().split("\n")[0]
                : "Information Not Available"
            }
          >
            {"Created: " + new Date(group.createdAt).toLocaleString()}
            <br />
            {"Updated at: " + new Date(group.updatedAt).toLocaleString()}
            <br />
            {group.userId === this.state.currentUserId
              ? "Your Group"
              : group.participantIds &&
                group.participantIds.length === group.attendanceLimit
                ? "This group is full"
                : "This group is not full"}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href="/groups/new"
            onClick={this.handleGroupClick}
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new group
            </h4>
          </ListGroupItem>
        )
    );
  }

  handleGroupClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  };

  renderLander() {
    return (
      <div className="lander">
        <h1>Positivty Detector</h1>
        <p>
          Use Sentiment Analysis and ML to check how positive are your words
        </p>
        <div>
          <Link to="/login" className="btn btn-success btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-info btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderGroups() {
    return (
      <div className="groups">
        <PageHeader>Your Groups</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderGroupsList(this.state.groups)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderGroups() : this.renderLander()}
      </div>
    );
  }
}
