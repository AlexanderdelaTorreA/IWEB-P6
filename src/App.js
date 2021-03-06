import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Game from "./Components/Game";
import Navbar from "./Components/Navbar";
import {questionAnswer} from './redux/actions';
import {submit} from './redux/actions';
import {changeQuestion} from './redux/actions';
import {initQuestions} from './redux/actions';
import {timer} from './redux/actions';


class App extends Component {

    componentDidMount() {

        let token = "c003ee94c290a3df3dcd";
        let url = "https://quiz2019.herokuapp.com/api/quizzes/random10wa?token="+token;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.props.dispatch(initQuestions(json))
            })
            .catch(error =>{
                console.log(error)
            });
        var intervalo = setInterval(() =>{
            this.props.dispatch(timer(this.props.timer-1));
            if (this.props.timer===0){
                this.props.dispatch(submit(this.props.questions))
            }

        },1000);


    }

  render() {
    return (
      <div>
        <Navbar/>
        <Game question={this.props.questions[this.props.currentQuestion]}
              score={this.props.score}
              isFinished={this.props.finished}
              iCurrentQuestion={this.props.currentQuestion}
              questions={this.props.questions}
              time={this.props.timer}
              onQuestionAnswer={(answer) => {
                this.props.dispatch(questionAnswer(this.props.currentQuestion, answer))
              }}
              onChangeQuestion={(nextQuestion)=>{
                this.props.dispatch(changeQuestion(nextQuestion))
              }}
              onSubmit={(questions)=>{
                this.props.dispatch(submit(questions))
              }}
              onInitQuestions={(questions)=>{
                this.props.dispatch(initQuestions(questions))
              }} />
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(App);
