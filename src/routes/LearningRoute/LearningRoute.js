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
    <div class="card-answer back-card">
      <div class="record">
        <div class="right">{props.wordCorrectCount}</div>/<div class="wrong">{props.wordIncorrectCount}</div>
      </div>
      {props.isCorrect ? <div class="correct"> \&#10004; Correct</div> : <div class="incorrect"> &#10006; Incorrect</div>}
      <div class="feedback">
        Your Answer <div class="correct-answer">this</div> The Correct Answer{" "}
        <div class="correct-answer">that</div>
      </div>
    </div>
  );
}
//YOU NEED TO FINISH IMPLEMENTING FEEDBACK CARD AND THEN NEXT BUTTON. YOU HAVE STYLING NOW MAKE FETCH CALL AND FLIP ON FETCH CALL

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
    // LanguageApiService.postGuess(this.state.guess).then((results) => {
    //   this.setState({
    //     back: results,
    //   });
    // });
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
