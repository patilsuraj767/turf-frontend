import { Modal, Button } from "react-bootstrap";
const ConfirmModal = (props) => {  
    return (
      <>
        <Modal show={props.data.show} onHide={() => props.setModalData({})}>
          <Modal.Header closeButton>
            <Modal.Title>{props.data.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.data.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.setModalData({})}>
              Close
            </Button>
            <Button variant={props.data.buttonVariant} onClick={() => props.runFunc(props.data.bookingID)}>
              {props.data.buttonAction}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ConfirmModal;