import React from 'react';
import { Row, Col } from 'reactstrap'

const Footer = ({ leftMessage, rightMessage }) => 
    <Row>
        <Col>{ leftMessage }</Col>
        <Col className='text-right'>{ rightMessage }</Col>
    </Row>

export default Footer;