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
  console.log(+props.isCorrect)
  return (
    <div class="card-answer back-card">
       <div class="record">
        <div class="right">{props.wordCorrectCount + +props.isCorrect}</div>/
        <div class="wrong">{props.wordIncorrectCount + +!props.isCorrect}</div>
      </div>
      {props.isCorrect ? (
        <div class="correct"> &#10004; Correct</div>
      ) : (
        <div class="incorrect"> &#10006; Incorrect</div>
      )}
      <div class="feedback">
        Your Answer <div class={props.isCorrect ? "correct-answer" : "incorrect-answer"}>{props.guess}</div> The Correct
        Answer <div class="correct-answer">{props.answer}</div>
      </div>
      <div class="original">Original Phrase: {props.nextWord}</div>
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
    next: {}
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
    if (this.state.guess.value.length === 0) return <div class="error">Enter your guess!</div>
  };


  getNext = () => {
      this.setState({
        guess: {value: this.state.guess.value, touched:false}, 
        flip: ""
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    LanguageApiService.postGuess(this.state.guess.value).then(async (results) => {
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
      await new Promise(r => setTimeout(r, 600))
    this.setState({
      front:  {nextWord,
      wordCorrectCount,
      wordIncorrectCount}
    })
    });
  };

  render() {
    console.log(this.state.back)
    return (
      <section className="learning">
        <div className="score">
          Score: <div class="tally">{this.state.totalScore}</div>
        </div>
        <div className="flip">
          <div className={`flip-internal ${this.state.flip}`}>
            <Front {...this.state.front} totalScore={this.state.totalScore} />
            <Back {...this.state.back} totalScore={this.state.totalScore} guess={this.state.guess.value} />
          </div>
        </div>
       { !this.state.flip && <form onSubmit={this.handleSubmit} class="answer-input">
          {this.state.guess.touched && this.invalidInput()}
          <label className="answer-label" for="answer">
            Answer:
          </label>
          <input onChange={this.handleChangeInput} id="answer" />
          <button disabled = {!!this.invalidInput() || !this.state.guess.touched} type="submit" class="next-button">
            {"Check"}
          </button>
        </form>}
       { !!this.state.flip && <button onClick={this.getNext} type="submit" class="next-button">
            {"Next"}
          </button>}
      </section>
    );
  }
}

export default LearningRoute;


//FIND WAY TO MAKE INFO NTO DISSAPPEAR BEFORE FLIP