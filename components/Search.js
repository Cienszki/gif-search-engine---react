Search = React.createClass({
	getInitialState: function() {
		return {
			searchingText: ''
		};
	},
	handlechange: function(event) {
		var searchingText = event.target.value;
		this.setState({
			searchingText: searchingText
		});
		if (searchingText.length > 2) {
			this.props.onSearch(this.state.searchingText);
		};
	},
	handleKeyUp: function (event) {
		if (event.keyCode === 13) {
			this.props.onSearch(this.state.searchingText);
		}
	},
	render: function() {
		var styleInput = {
			fontSize: '1.5em',
			width: '90%',
			maxWidth: '350px'
		}
		return (
			<input type={'text'} 
				placeholder='What are you looking for ?'
				onChange={this.handlechange}
				onKeyUp={this.handleKeyUp}
				style={styleInput} 
				value={this.state.searchTerm}>
			</input>
		)
	}
})