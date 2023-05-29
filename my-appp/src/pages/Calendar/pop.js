import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import "./pop.css";
import Tag from "./Tag";

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
  handleEdit,
  handleDelete,
  tagList,
  setTagList,
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
              <label>活動標籤</label>
              <Tag
                tagList={tagList}
                setTagList={setTagList}
                tagFrom={"create"}
              />
            </div>
          </div>
        ) : (
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
                type="datetime-local"
                className="form-control"
                defaultValue={localEndDate}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
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
            <div className="form-group">
              <label>活動標籤</label>
              <Tag
                tagList={tagList}
                setTagList={setTagList}
                tagFrom={"create"}
              />
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
          <>
            <Button onClick={handleSave}>新增</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
