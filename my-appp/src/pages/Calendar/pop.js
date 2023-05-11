import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import "./pop.css";

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
  backgroundColor,
  setbackgroundColor,
}) {
  const localStartDate = moment(startDate).format("YYYY-MM-DDTHH:mm");
  const localEndDate = moment(endDate).format("YYYY-MM-DDTHH:mm");

  return (
    <Modal show={modalStatus} onHide={handleClose} centered>
      <Modal.Header style={{ border: "none" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {delStatus ? "修改行事曆" : "新增行事曆"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {delStatus ? (
          <div className="form-group">
            <div className="form-group">
              <label>起始日期</label>
              <br></br>
              <input
                className="form-control"
                type="datetime-local"
                defaultValue={localStartDate}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
              <label></label>
            </div>
            <div className="form-group">
              <label>結束日期</label>
              <br></br>
              <input
                className="form-control"
                type="datetime-local"
                defaultValue={localEndDate}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
              <br></br>
              <label></label>
            </div>
            <div className="form-group">
              <label>標題</label>
              <input
                className="form-control"
                value={eventInput}
                placeholder="標題..."
                onChange={(e) => setEventInput(e.target.value)}
              />
              <br></br>
            </div>
            <div className="form-group">
              <label>顯示顏色</label>
              <br></br>
              <select
                className="form-control"
                name="the_select"
                defaultValue={backgroundColor}
                onChange={(e) => setbackgroundColor(e.target.value)}
              >
                <option value="red">請選擇</option>
                <option value="#">藍色</option>
                <option value="rgba(255, 0, 0, 0.5)">橘色</option>
                <option value="rgba(128, 0, 255, 0.5)">紫色</option>
                <option value="rgba(255, 165, 0, 0.5)">黃色</option>
                <option value="rgba(128, 128, 128, 0.5)">灰色</option>
                <option value="rgba(165, 42, 42, 0.5)">棕色</option>
              </select>

              <br></br>
            </div>
          </div>
        ) : (
          <div className="form-group">
            <div className="form-group">
              <label>起始日期</label>
              <br></br>
              <input
                className="form-control"
                type="datetime-local"
                defaultValue={localStartDate}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
              <label></label>
            </div>
            <div className="form-group">
              <label>結束日期</label>
              <br></br>
              <input
                type="datetime-local"
                className="form-control"
                defaultValue={localEndDate}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
              <label></label>
            </div>
            <div className="form-group">
              <label>標題</label>
              <br></br>
              <input
                value={eventInput}
                className="form-control"
                placeholder="標題..."
                onChange={(e) => setEventInput(e.target.value)}
              />
              <br></br>
            </div>
            <div className="form-group">
              <label>顯示顏色</label>
              <select
                className="form-control"
                name="the_select"
                onChange={(e) => setbackgroundColor(e.target.value)}
              >
                <option value="red">請選擇</option>
                <option value="rgba(0, 128, 255, 0.5)">藍色</option>
                <option value="rgba(255, 0, 0, 0.5)">橘色</option>
                <option value="rgba(128, 0, 255, 0.5)">紫色</option>
                <option value="rgba(255, 165, 0, 0.5)">黃色</option>
                <option value="rgba(128, 128, 128, 0.5)">灰色</option>
                <option value="rgba(165, 42, 42, 0.5)">棕色</option>
              </select>
              <br></br>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
        {delStatus ? (
          <>
            <Button onClick={handleEdit}>修改</Button>
            <Button onClick={handleDelete}>
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
export default MyVerticallyCenteredModal;
