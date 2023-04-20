import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import moment from "moment";

function MyVerticallyCenteredModal({
  modalStatus,
  handleClose,
  startDate,
  endDate,
  setEventInput,
  eventInput,
  handleSave,
  delStatus,
  eventId,
  handleEdit,
  handleDelete,
}) {
  return (
    
    <Modal show={modalStatus} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          新增行事曆
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <div className="form-group">
            <label>起始日期</label>
            <input
              value={moment(startDate).format("YYYY/MM/DD[（]ddd[）]HH:mm")}
              className="form-control"
              disabled
            />

            <label></label>
          </div>
          <div className="form-group">
            <label>結束日期</label>
            <input
              value={moment(endDate).format("YYYY/MM/DD[（]ddd[）]HH:mm")}
              className="form-control"
              disabled
            />
            <label></label>
          </div>
          <div className="form-group">
            <label>標題</label>
            <input
              value={eventInput}
              className="form-control"
              placeholder="標題..."
              onChange={(e) => setEventInput(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {delStatus ? (
          <>
            {" "}
            <Button
              onClick={() => {
                handleDelete(eventId);
              }}
            >
              <i class="bi bi-trash3"></i>
            </Button>
            <Button
              onClick={() => {
                handleEdit(eventId);
              }}
            >
              修改
            </Button>
          </>
        ) : (
          <Button onClick={handleSave}>新增</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
