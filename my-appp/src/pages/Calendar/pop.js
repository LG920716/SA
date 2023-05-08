import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

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
  tag,
  settag,
}) {

  const localStartDate = moment(startDate).format("YYYY-MM-DDTHH:mm");
  const localEndDate = moment(endDate).format("YYYY-MM-DDTHH:mm");

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
            <br></br>
            <input 
              type="datetime-local" 
              defaultValue={localStartDate}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <br></br>
            <label></label>
          </div>
          <div className="form-group">
            <label>結束日期</label>
            <br></br>
            <input 
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
              value={eventInput}
              className="form-control"
              placeholder="標題..."
              onChange={(e) => setEventInput(e.target.value)}
            />
            <br></br>
          </div>
          
          <div className="form-group">
            <label>活動類別</label>
            <br></br>
            <select name="the_select" defaultValue={tag} onChange={(tag) => settag(tag.target.value)}>
              <option value="0">請選擇</option>
              <option value="1">其他活動</option>
              <option value="2">例行社課</option> 
              <option value="3">幹部會議</option>
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
              type="datetime-local" 
              defaultValue={localStartDate}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <br></br>
            <label></label>
          </div>
          <div className="form-group">
            <label>結束日期</label>
            <br></br>
            <input
              type="datetime-local" 
              defaultValue={localEndDate}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
            <br></br>
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
            <label>活動類別</label>
            <br></br>
            <select name="the_select" onChange={(tag) => settag(tag.target.value)}>
              <option value="0">請選擇</option>
              <option value="1">其他活動</option>
              <option value="2">例行社課</option> 
              <option value="3">幹部會議</option>
            </select>
            <br></br>
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