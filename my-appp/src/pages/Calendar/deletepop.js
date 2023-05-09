import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteConfirmationModal({
    setDeleteright,
    DeleteConfirmationModal,
    setDeleteConfirmationModal,
  }) {

    
    return (
      <Modal show={DeleteConfirmationModal} onHide={() => setDeleteConfirmationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>確認刪除</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          確定要刪除這個行事曆嗎？
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmationModal(false)}>取消</Button>
          <Button variant="danger" onClick={() => setDeleteright(true)}>刪除</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default DeleteConfirmationModal;
  