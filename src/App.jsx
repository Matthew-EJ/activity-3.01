import React, { Component } from "react";
import "./App.css";

const TILE_COUNT = 24;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      lastFlipped: null,
      clicks: 0,
    };
    this.resetTiles = this.resetTiles.bind(this);
    this.flipTile = this.flipTile.bind(this);
  }

  resetTiles() {
    let tiles = [];
    let number = 0;
    for (let i = 0; i < TILE_COUNT; i += 2) {
      number++;
      let tileOne = { flipped: false, matched: false, number };
      let tileTwo = { flipped: false, matched: false, number };
      tiles = [...tiles, tileOne, tileTwo];
    }
    for (let i = 0; i < tiles.length; i++) {
      const swapWith = Math.floor(Math.random() * tiles.length);
      [tiles[i], tiles[swapWith]] = [tiles[swapWith], tiles[i]];
    }
    this.setState({ clicks: 0, tiles });
  }

  renderTile(tile, index) {
    let classes = ["Tile"];
    if (tile.flipped) {
      classes = [...classes, "flipped"];
    }
    if (tile.matched) {
      classes = [...classes, "matched"];
    }
    return (
      <div
        key={`tile-${index}`}
        className={classes.join(" ")}
        onClick={() => this.flipTile(index)}
      >
        {tile.flipped ? tile.number : ""}
      </div>
    );
  }

  flipTile(index) {
    let tiles = [...this.state.tiles];
    let tile = tiles[index];
    let clicks = this.state.clicks + 1;
    let lastFlipped = this.state.lastFlipped;
    if (lastFlipped === null) {
      tiles = this.flipAllBackOver(tiles);
      tile.flipped = true;
      lastFlipped = index;
    } else {
      tile.flipped = true;
      let lastFlippedTile = tiles[lastFlipped];
      if (lastFlippedTile.number === tile.number) {
        lastFlippedTile.matched = true;
        tile.matched = true;
      }
      tiles[lastFlipped] = lastFlippedTile;
      lastFlipped = null;
    }
    tiles[index] = tile;
    this.setState({ clicks, tiles, lastFlipped });
  }

  flipAllBackOver(tiles) {
    return tiles.map((tile) => ({
      ...tile,
      flipped: tile.matched ? tile.flipped : false,
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Memory Game</h1>
        <strong>Clicks: {this.state.clicks}</strong>
        <br />
        <button className="reset" onClick={this.resetTiles}>
          New Game
        </button>
        <hr />
        <div className="board">
          {this.state.tiles.map((tile, index) => this.renderTile(tile, index))}
        </div>
      </div>
    );
  }
}

export default App;