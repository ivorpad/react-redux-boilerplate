import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as fetchUsersActions } from "./sagas/fetchUsersSaga";
import { types } from "./sagas/fetchUsersSaga";

const { FETCH_USERS_CONFIRM } = types;

class App extends Component {
	state = {
		buttonText: "Load Users",
		confirmHidden: true,
		loadUsersHidden: false,
		highlightColor: "yellow"
	};

	handleFetchUsers = () => {
		this.props.fetchUsersRequest();
		this.setState({
			confirmHidden: false,
			loadUsersHidden: true,
			buttonText: "Confirm",
			highlightColor: "#8bc34a"
		});
	};

	handleConfirm = () => {
		this.props.dispatch({ type: FETCH_USERS_CONFIRM });
		this.setState({
			confirmHidden: true,
			loadUsersHidden: false
		});
	};

	render() {
		const { users } = this.props;

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React + Redux + Redux Saga</h1>
				</header>
				<button
					style={
						this.state.loadUsersHidden
							? { display: "none" }
							: { display: "inline" }
					}
					onClick={this.handleFetchUsers}
				>
					Load Users
				</button>
				<button
					style={
						this.state.confirmHidden
							? { display: "none" }
							: { display: "inline" }
					}
					onClick={this.handleConfirm}
				>
					{" "}
					Confirm{" "}
				</button>

				<section>
					{users.length === 0 ? (
						<h3>
							{" "}
							Click{" "}
							<span style={{ background: this.state.highlightColor }}>
								{this.state.buttonText}
							</span>{" "}
							to show some users{" "}
						</h3>
					) : (
						<div className="users">
							{users.map(user => {
								return (
									<div key={user.id} className="user">
										<img src={user.avatar_url} alt={user.login} />
										<a href={user.html_url} target="_blank">
											{user.login}
										</a>
									</div>
								);
							})}
						</div>
					)}
				</section>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			...fetchUsersActions,
			dispatch
		},
		dispatch
	);
};

const mapStateToProps = state => {
	return {
		users: state.users
	};
};

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppContainer;
