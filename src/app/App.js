import React, { Component } from 'react';
import { Container } from 'reactstrap'
import Header from './Header'
import QuestionnaireContainer from '../questionnaire/QuestionnaireContainer'
import Footer from './Footer'

class App extends Component {
  render() {

    const serverUrl = 'http://localhost:8090/flashcard-rest/questionnaires'

    return <Container>
      <Header title='Flashcard Client with React' subtitle='Version 1' />
      <QuestionnaireContainer serverUrl={ serverUrl } />
      <Footer message='@ The FHNW Team' />
    </Container>
  }
}

export default App;
