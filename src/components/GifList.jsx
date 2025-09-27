import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const GifItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const Button = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #2b6cb0;
  color: white;
  cursor: pointer;
`;

class GifList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      loading: false,
      next: "",
    };
  }

  componentDidMount() {
    this.fetchGifs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keyword !== this.props.keyword) {
      this.fetchGifs(this.props.keyword);
    }
  }

  async fetchGifs(keyword = "", pos = "") {
    const API_KEY = "AIzaSyCav2N3eodWtXN5_Y6c5U5XUMaxLH705Xc";
    const CLIENT_KEY = "prapireact";

    let url = "";
    if (keyword) {
      url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
        keyword
      )}&key=${API_KEY}&client_key=${CLIENT_KEY}&limit=12&pos=${pos}`;
    } else {
      url = `https://tenor.googleapis.com/v2/featured?key=${API_KEY}&client_key=${CLIENT_KEY}&limit=12&pos=${pos}`;
    }

    this.setState({ loading: true });
    try {
      const res = await fetch(url);
      const data = await res.json();

      this.setState((prev) => ({
        gifs: pos ? [...prev.gifs, ...data.results] : data.results,
        next: data.next || "",
        loading: false,
      }));
    } catch (err) {
      console.error("Error API:", err);
    }
  }

  loadMore = () => {
    this.fetchGifs(this.props.keyword, this.state.next);
  };

  render() {
    return (
      <div>
        <Box>
          {this.state.gifs.map((gif) => (
            <GifItem key={gif.id}>
              <img
                src={gif.media_formats.gif.url}
                alt={gif.content_description}
              />
            </GifItem>
          ))}
        </Box>
        {this.state.next && (
          <Button onClick={this.loadMore}>Завантажити ще</Button>
        )}
      </div>
    );
  }
}

export default GifList;
