import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
function MyVerticallyCenteredModal({
  modalStatus,
  handleClose,
  startDate,
  endDate,
  eventInput,
  setStartDate,
  setEndDate,
  setEventInput,

  handleSave,
  editStatus,
  // handleDelete,
}) {
  return (
    <Modal show={modalStatus} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <div className="form-group">
            <label>title</label>
            <input
              value={eventInput}
              className="form-control"
              placeholder="title..."
              onChange={(e) => setEventInput(e.target.value)}
            />
            <label></label>
          </div>
          <div className="form-group">
            <label>start date</label>
            <input
              value={startDate}
              type="datetime-local"
              className="form-control"
              placeholder="title..."
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label></label>
          </div>
          <div className="form-group">
            <label>end date</label>
            <input
              value={endDate}
              type="datetime-local"
              className="form-control"
              placeholder="title..."
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {editStatus ? (
          <>
            <Button>
              <i class="bi bi-trash3"></i>
            </Button>
            <Button onClick={handleSave}>修改</Button>
          </>
        ) : (
          <Button onClick={handleSave}>新增</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
