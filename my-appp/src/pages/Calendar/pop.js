import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function MyVerticallyCenteredModal({
  modalStatus,
  handleClose,
  setEventInput,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  eventInput,
  handleSave,
  delStatus,
  eventId,
  handleEdit,
  handleDelete,
}) {

  return (
    <Modal show={modalStatus} onHide={handleClose} centered>
      <Modal.Header style={{ border: "none" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{delStatus ? "修改行事曆" : "新增行事曆"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {delStatus ? (
        <div className="form-group">
          <div className="form-group">
            <label>起始日期</label>
            <DateTime
              value={moment(startDate).format("YYYY/MM/DD[（]ddd[）]HH:mm")}
              onChange={(Date) => setStartDate(Date)}
              dateFormat="YYYY/MM/DD[（]ddd[）]"
              timeFormat="HH:mm"
              timeIntervals={15}
            />
            <label></label>
          </div>
          <div className="form-group">
            <label>結束日期</label>
            <DateTime
              value={moment(endDate).format("YYYY/MM/DD[（]ddd[）]HH:mm")}
              onChange={(date) => setEndDate(date)}
              dateFormat="YYYY/MM/DD[（]ddd[）]"
              timeFormat="HH:mm"
              timeIntervals={15}
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
      ) : (
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
      )
      }
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
      {delStatus ? (
        <>
          <Button onClick={handleEdit}>修改</Button>
          <Button onClick={() => { handleDelete(eventId); }}>
            <i className="bi bi-trash3"></i>
          </Button>
        </>
      ) : (
        <Button onClick={handleSave}>新增</Button>
      )}
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal 