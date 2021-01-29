import React, { Component } from "react";
import LanguageApiService from "../../services/language-api-service";
import "../../styles/card.css";

function Front(props) {
  return (
    <div class="card front-card">
      <div class="record">
        <div class="right">{props.wordCorrectCount}</div>/
        <div class="wrong">{props.wordIncorrectCount}</div>
      </div>
      <div class="word">{props.nextWord}</div>
    </div>
  );
}

function Back(props) {
  return (
    <div class="card back-card">
      <div class="record">
        <div class="right">{props.wordCorrectCount}</div>/
        <div class="wrong">{props.wordIncorrectCount}</div>
      </div>
      <div class="word">{props.nextWord}</div>
    </div>
  );
}

class LearningRoute extends Component {
  state = {
    front: {},
    guess: "",
    back: {},
  };

  componentDidMount() {
    LanguageApiService.getHead().then((head) => {
      this.setState({
        front: head,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    LanguageApiService.postGuess(this.state.guess).then((results) => {
      this.setState({
        back: results,
      });
    });
  }

  render() {
    return (
      <section className="learning">
        <div class="score">
          Score: <div class="tally">{this.state.front.totalScore}</div>
        </div>
        <div className="flip">
          <div class="flip-internal">
            <Front {...this.state.front} />
            <Back {...this.state.front} />
          </div>
        </div>
        <div class="answer-input">
          <label className="answer-label" for="answer">
            Answer:
          </label>
          <input id="answer" />
        </div>
        <button class="next-button">{"Check"}</button>
      </section>
    );
  }
}

export default LearningRoute;
