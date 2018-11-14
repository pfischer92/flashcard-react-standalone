import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Header from './Header'
import QuestionnaireContainer from '../questionnaire/QuestionnaireContainer'
import Footer from './Footer'

class App extends Component {
  render() {
    return <Container>
      <Header title='Flashcard Client with React' subtitle='Version 1' />
      <QuestionnaireContainer />
      <Footer message='@ The FHNW Team' />
    </Container>
  }
}

export default App;
