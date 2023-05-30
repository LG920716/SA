import { useState, useEffect } from "react";
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { notesCollectionRef, auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import Editor from "./Components/Editor/Editor";
import Tag from "./Components/Tag/Tag";

function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState([]);
  const [userSelectList, setUserSelectList] = useState([]);
  const [tagsListDbDefault, setTagsListDbDefault] = useState([]);

  let navigate = useNavigate();
  console.log(tagsListDbDefault, "createeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  const createNote = async () => {
    try {
      await addDoc(notesCollectionRef, {
        title: title ? title : new Date().toLocaleString(),
        body,
        createAt: serverTimestamp(),
        editAt: serverTimestamp(),
        viewAt: serverTimestamp(),
        tag: tagList,
        owner: [
          { uid: auth?.currentUser?.uid, email: auth?.currentUser?.email },
        ],
        allow: userSelectList,
        dateLineDel: "",
      });
      await setDoc(doc(db, "tag", "tagsListDbDefault"), {
        tags: tagsListDbDefault,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userSelectList, "{{{");
  return (
    <div className="container">
      <div className="wrapper">
        <div className="editorTop">
          <Editor
            title={title}
            setTitle={setTitle}
            body={body}
            setBody={setBody}
            setUserSelectList={setUserSelectList}
            userSelectList={userSelectList}
            userFrom={"create"}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Tag
              tagList={tagList}
              setTagList={setTagList}
              tagFrom={"create"}
              setTagsListDbDefault={setTagsListDbDefault}
              tagsListDbDefault={tagsListDbDefault}
            />
            <button class="btn btn-primary" onClick={createNote}>
              新增
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
