import React from "react";
import GifSearch from "./components/GifSearch";
import GifList from "./components/GifList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  handleSearch = (query) => {
    this.setState({ keyword: query });
  };

  render() {
    return (
      <div>
        <h1> GIF Search</h1>
        <GifSearch onSearch={this.handleSearch} />
        <GifList keyword={this.state.keyword} />
      </div>
    );
  }
}

export default App;
