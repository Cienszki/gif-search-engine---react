var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'QFSYRQyL0euIIq0MKnTBaWsYkzcRN91r';

App = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},
	getGif: function(searchingText, callback) {
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function() {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText).data;
				var gif = {
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif);
			}
		}
		xhr.send();
	},
	handleSearch: function(searchingText) {
		this.setState({
			loading: true,
		});
		this.getGif(searchingText, function(gif) {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}.bind(this));
	},
	render: function() {
		var styleDiv = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};
		return (
			<div style={styleDiv}>
				<h1>Gif search engine</h1>
				<p>Random gif from:{" "}
					<a href='http://giphy.com' textDecoration='none'>giphy</a>
					 .{" "}Press Enter to keep going
				</p>
				<Search onSearch={this.handleSearch}/>
				<Gif 
					loading={this.state.loading} 
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>			
		)
	}
})