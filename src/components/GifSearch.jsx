import React from "react";
import styled from "styled-components";

const Controls = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  min-width: 220px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #2b6cb0;
  color: white;
  font-weight: 600;
`;

class GifSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  handleChange = (e) => this.setState({ query: e.target.value });

  handleSearch = () => {
    this.props.onSearch(this.state.query.trim());
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") this.handleSearch();
  };

  render() {
    return (
      <Controls>
        <Input
          value={this.state.query}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <Button onClick={this.handleSearch}>search</Button>
      </Controls>
    );
  }
}

export default GifSearch;
