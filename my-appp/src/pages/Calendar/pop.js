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
              <input
                className="form-control"
                type="datetime-local"
                defaultValue={localStartDate}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>結束日期</label>
              <input
                className="form-control"
                type="datetime-local"
                defaultValue={localEndDate}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>標題</label>
              <input
                className="form-control"
                value={eventInput}
                placeholder="標題..."
                onChange={(e) => setEventInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>標籤顏色</label>
              <select
                className="form-select"
                name="the_select"
                defaultValue={backgroundColor}
                onChange={(e) => setbackgroundColor(e.target.value)}
              >
                <option value="red">請選擇</option>
                <option value="rgba(29, 131, 220, 0.8)">藍色</option>
                <option value="rgba(249, 105, 14, 1)">橘色</option>
                <option value="rgba(128, 0, 255, 0.5)">紫色</option>
                <option value="rgba(38, 166, 91, 1)">綠色</option>
                <option value="rgba(152, 152, 152, 1)">灰色</option>
                <option value="rgba(167, 101, 0, 1)">棕色</option>
              </select>
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
              <label>標籤顏色</label>
              <select
                className="form-control"
                name="the_select"
                onChange={(e) => setbackgroundColor(e.target.value)}
              >
                <option value="red">請選擇</option>
                <option value="rgba(29, 131, 220, 0.8)">藍色</option>
                <option value="rgba(249, 105, 14, 1)">橘色</option>
                <option value="rgba(128, 0, 255, 0.5)">紫色</option>
                <option value="rgba(38, 166, 91, 1)">綠色</option>
                <option value="rgba(152, 152, 152, 1)">灰色</option>
                <option value="rgba(167, 101, 0, 1)">棕色</option>
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
