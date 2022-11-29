import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Form, Toast, ToastContainer } from 'react-bootstrap';

const App = function () {
  const [mediaRecorder, setMediaRecorder] = useState();
  const [recordedAudio, setRecordedAudio] = useState();
  const [recordedAudioCorrected, setRecordedAudioCorrected] = useState();
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [recordingAvailable, setRecordingAvailable] = useState(false);
  const [recordingAvailableCorrected, setRecordingAvailableCorrected] = useState(false);
  const [showToastRecording, setShowToastRecording] = useState(false);
  const [showToastCorrecting, setShowToastCorrecting] = useState(false);
  const [email, setEmail] = useState("");


  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const tempMediaRecorder = new MediaRecorder(stream)
        setMediaRecorder(tempMediaRecorder);
        tempMediaRecorder.addEventListener("dataavailable", event => {
          let audioChunks = [];
          audioChunks.push(event.data);
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log(audioUrl);
          setRecordedAudio(new Audio(audioUrl));
          setRecordingAvailable(true)
        });
      });
  }, [])


  const startRecording = () => {
    mediaRecorder.start();
    setRecordingStarted(true);
    setShowToastRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecordingStarted(false);
    setShowToastRecording(false);
  };

  const playRecording = () => {
    recordedAudio.play();
  };

  const playRecordingCorrected = () => {
    recordedAudioCorrected.play();
  };

  const submitAudio = (form) => {
    form.preventDefault();
    console.log(form)
    //console.log("submit");
    setShowToastCorrecting(true);
    setTimeout(() => { setShowToastCorrecting(false); setRecordedAudioCorrected(recordedAudio); setRecordingAvailableCorrected(true) }, 10000);
  }

  return (
    <Container id="root" className="App">
      <Row>
        <ToastContainer className="p-3" position="top-end">
          <Toast show={showToastRecording} bg="info" onClose={() => { setShowToastRecording(false) }}>
            <Toast.Header closeButton={true}>
              <p className="me-auto">Recording Started</p>
            </Toast.Header>
            <Toast.Body>Please speak and press stop when you are done</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer className="p-3" position="top-end">
          <Toast show={showToastCorrecting} bg="warning">
            <Toast.Header>
              <p className="me-auto">Processing audio</p>
            </Toast.Header>
            <Toast.Body>Please wait, your corrected audio will be available soon.</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>
      <Row>
        <h1>Audio Recorder</h1>
      </Row>
      <Row className="row">
        <Col className="d-grid gap-2">
          <Button size="lg" variant="outline-primary" onClick={startRecording} disabled={recordingStarted}>
            Record
          </Button>
        </Col>
        <Col className="d-grid gap-2" >
          <Button size="lg" variant="outline-danger" onClick={stopRecording} disabled={!recordingStarted}>Stop</Button>
        </Col>
        <Col className="d-grid gap-2">
          <Button size="lg" variant="outline-warning" onClick={playRecording} disabled={!recordingAvailable}>Play</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={submitAudio}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row>
                <Col xs={12} >
                  <Form.Label>Email address</Form.Label>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Control size="lg" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Col>
                <Col className="d-grid gap-2">
                  <Button size="lg" variant="primary" type="submit" disabled={!(recordingAvailable && email)}>
                    Correct Audio
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col className="d-grid gap-2">
          <Button size="lg" variant="outline-success" onClick={playRecordingCorrected} disabled={!recordingAvailableCorrected}>Play</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
