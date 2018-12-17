import React, { Component } from 'react';
import { Container } from 'reactstrap'
import Header from './Header'
import QuestionnaireContainer from '../questionnaire/QuestionnaireContainer'
import Footer from './Footer'
import Message from '../misc/Message'

const APP_CONFIG = 'application.json'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { serverUrl: null, error: false, message: '' }
    }

    componentDidMount() {
        fetch(APP_CONFIG)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Error loading configuration.')
            })
            .then(configuration =>
                this.setState({ serverUrl: configuration.url }))
            .catch(error => {
                this.setState({ error: true, message: error.message })
                console.error(error)
            })
    }

    renderQuestionnaireContainer = () =>
        this.state.serverUrl ? <QuestionnaireContainer serverUrl={ this.state.serverUrl } /> : null

    renderMessage = () =>
        this.state.error ? <Message message={ this.state.message } /> : null

    render() {
        return <Container>
            <Header title='Flashcard Client with React' subtitle='Version 2' />
            { this.renderQuestionnaireContainer() }
            { this.renderMessage() }
            <Footer message='@ The FHNW Team' />
        </Container>
    }
}

export default App;
