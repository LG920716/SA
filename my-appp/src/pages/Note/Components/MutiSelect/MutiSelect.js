import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../../../firebase-config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./MutiSelect.css";

function MutiSelect({
  setUserSelectList,
  userSelectList,
  userFrom,
  ownerUid,
  ownerEmail,
}) {
  const animatedComponents = makeAnimated();
  const [mutiSelect, setMutiSelect] = useState([]);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");

  const getUserSelect = async () => {
    try {
      const data = await getDocs(collection(db, "users"));
      const list = data.docs
        .map((doc) => ({
          value: doc.id,
          label: doc.data().email,
          level: doc.data().level,
        }))
        .filter((x) => x.level !== "unCheck");

      setUid(auth.currentUser.uid);
      setEmail(auth.currentUser.email);

      setMutiSelect(list);
      setUserSelectList(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserSelect();
  }, []);

  const mutiOnchange = (e) => {
    if (
      !e.map((x) => x.value).includes(userFrom === "create" ? uid : ownerUid)
    ) {
      setUserSelectList([
        ...e,
        {
          value: userFrom === "create" ? uid : ownerUid,
          label: userFrom === "create" ? email : ownerEmail,
        },
      ]);
    } else {
      setUserSelectList(e);
    }
  };
  console.log(userSelectList);
  return (
    <Select
      className="mutiSelect"
      isMulti
      options={mutiSelect}
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={mutiOnchange}
      value={userSelectList}
      isDisabled={userFrom === "view"}
    />
  );
}
export default MutiSelect;
