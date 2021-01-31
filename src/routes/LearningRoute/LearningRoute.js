import React, { Component } from "react";
import LanguageApiService from "../../services/language-api-service";
import "../../styles/card.css";

function Front(props) {
  return (
    <div className="card front-card">
      <div className="record">
        <div className="right">&#10004; {props.wordCorrectCount}</div>/ 
        <div className="wrong">&#10006; {props.wordIncorrectCount}</div>
      </div>
      <div className="word">{props.nextWord}</div>
    </div>
  );
}

function Back(props) {
  return (
    <div className="card-answer back-card">
      <div className="record">
        <div className="right"> &#10004; {props.wordCorrectCount + +props.isCorrect}</div>
        / 
        <div className="wrong">
        &#10006; {props.wordIncorrectCount + +!props.isCorrect}
        </div>
      </div>
      {props.isCorrect ? (
        <div className="correct"> &#10004; Correct</div>
      ) : (
        <div className="incorrect"> &#10006; Incorrect</div>
      )}
      <div className="feedback">
        Your Answer{" "}
        <div
          className={props.isCorrect ? "correct-answer" : "incorrect-answer"}
        >
          {props.guess}
        </div>{" "}
        The Correct Answer <div className="correct-answer">{props.answer}</div>
      </div>
      <div className="original">Original Phrase: {props.nextWord}</div>
    </div>
  );
}

class LearningRoute extends Component {
  state = {
    totalScore: 0,
    front: {},
    guess: { value: "", touched: false },
    back: {},
    flip: "",
    next: {},
  };

  componentDidMount() {
    LanguageApiService.getHead().then((head) => {
      const {
        nextWord,
        wordCorrectCount,
        wordIncorrectCount,
        totalScore,
      } = head;
      this.setState({
        front: { nextWord, wordCorrectCount, wordIncorrectCount },
        totalScore,
      });
    });
  }

  handleChangeInput = (e) => {
    this.setState({
      guess: { value: e.target.value, touched: true },
    });
  };

  invalidInput = (e) => {
    if (this.state.guess.value.length === 0)
      return <div className="error">Enter your guess!</div>;
  };

  getNext = () => {
    this.setState({
      guess: { value: this.state.guess.value, touched: false },
      flip: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    LanguageApiService.postGuess(this.state.guess.value).then(
      async (results) => {
        const {
          nextWord,
          wordCorrectCount,
          wordIncorrectCount,
          totalScore,
          answer,
          isCorrect,
        } = results;
        this.setState({
          totalScore,
          back: {
            ...this.state.front,
            answer,
            isCorrect,
          },
          flip: "activate",
        });
        await new Promise((r) => setTimeout(r, 600));
        this.setState({
          front: { nextWord, wordCorrectCount, wordIncorrectCount },
        });
      }
    );
  };

  render() {
    return (
      <section className="learning">
        <div className="score">
         <h2> Score: <div className="tally">{this.state.totalScore}</div> </h2>
        </div>
        <div className="flip">
          <div className={`flip-internal ${this.state.flip}`}>
            <Front {...this.state.front} totalScore={this.state.totalScore} />
            <Back
              {...this.state.back}
              totalScore={this.state.totalScore}
              guess={this.state.guess.value}
            />
          </div>
        </div>
        {!this.state.flip && (
          <form onSubmit={this.handleSubmit} className="answer-input">
            <fieldset>
              {this.state.guess.touched && this.invalidInput()}
              <label className="answer-label" htmlFor="answer">
                Answer:
              </label>
              <input onChange={this.handleChangeInput} id="answer" />
              <button
                disabled={!!this.invalidInput() || !this.state.guess.touched}
                type="submit"
                className="next-button"
              >
                {"Check"}
              </button>
            </fieldset>
          </form>
        )}
        {!!this.state.flip && (
          <button onClick={this.getNext} type="submit" className="next-button">
            {"Next"}
          </button>
        )}
      </section>
    );
  }
}

export default LearningRoute;

//FIND WAY TO MAKE INFO NTO DISSAPPEAR BEFORE FLIP
