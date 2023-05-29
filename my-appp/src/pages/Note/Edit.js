import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import Editor from "./Components/Editor/Editor";
import Tag from "./Components/Tag/Tag";

function Edit() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { id } = useParams();
  const docNoteEditRef = doc(db, "notes", id);
  const [tagList, setTagList] = useState([]);
  const [uid, setUid] = useState("");
  const [userSelectList, setUserSelectList] = useState([]);
  const [noteDataWait, setNoteDataWait] = useState([]);
  const [ownerUid, setOwnerUid] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState([]);
  const [tagsListDbDefault, setTagsListDbDefault] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getNoteEdit = async () => {
      try {
        const docSnap = await getDoc(docNoteEditRef);
        setNoteDataWait(docSnap.data().title);
        setTitle(docSnap.data().title);
        setBody(docSnap.data().body);
        setUserSelectList(docSnap.data().allow);
        setTagList(docSnap.data().tag);
        setUid(auth?.currentUser?.uid);
        setOwnerUid(docSnap.data().owner[0].uid);
        setOwnerEmail(docSnap.data().owner[0].email);
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    };
    getNoteEdit();
  }, []);

  useEffect(() => {
    if (
      noteDataWait &&
      uid &&
      !userSelectList.map((x) => x.value).includes(uid)
    ) {
      navigate("/");
    }
  }, [noteDataWait, uid]);

  useEffect(() => {
    const updateViewTime = async (id) => {
      try {
        await updateDoc(docNoteEditRef, {
          viewAt: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    };
    updateViewTime();
  }, []);

  const updateEditNote = async (id) => {
    try {
      await updateDoc(docNoteEditRef, {
        title: title ? title : new Date().toLocaleString(),
        body,
        editAt: serverTimestamp(),
        viewAt: serverTimestamp(),
        tag: tagList,
        allow: userSelectList,
      });
      await setDoc(doc(db, "tag", "tagsListDbDefault"), {
        tags: tagsListDbDefault,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
            userFrom={"edit"}
            ownerUid={ownerUid}
            ownerEmail={ownerEmail}
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
              tagFrom={"edit"}
              setTagsListDbDefault={setTagsListDbDefault}
              tagsListDbDefault={tagsListDbDefault}
            />
            <button
              class="btn btn-primary"
              onClick={updateEditNote}
              style={{ fontWeight: "900" }}
            >
              修改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
