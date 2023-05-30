import { useState, useEffect } from "react";
import Expenses from "./Expenses/Expenses";
import {
  projectsCollectionRef,
  expensesCollectionRef,
  moneyCollectionRef,
} from "../firebase-config";
import InvoiceList from "./SendInvoice/InvoiceList";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setPassExpense } from "../Redux/passExpense";
import { doc, deleteDoc, updateDoc, getDocs, addDoc } from "firebase/firestore";

export default function Charge() {
  const dispatch = useDispatch();
  const updateExpenseData = useSelector((state) => state.updateExpense.value);
  const deleteExpenseData = useSelector((state) => state.deleteExpense.value);
  const createExpenseData = useSelector((state) => state.createExpense.value);
  const passExpenseData = useSelector((state) => state.passExpense.value);
  const [firstDeleteExpense, setFirstDeleteExpense] = useState(true);
  const [firstUpdateExpense, setFirstUpdateExpense] = useState(true);
  const [firstCreateExpense, setFirstCreateExpense] = useState(true);
  const [firstPassExpense, setFirstPassExpense] = useState(true);
  const [level, setLevel] = useState(localStorage.getItem("level"));
  const [project, setProject] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [money, setMoney] = useState();
  useEffect(() => {
    const getProject = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProject();
  }, []);
  useEffect(() => {
    const getExpense = async () => {
      const data = await getDocs(expensesCollectionRef);
      setExpenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getExpense();
  }, []);
  useEffect(() => {
    const fetchMoney = async () => {
      const data = await getDocs(moneyCollectionRef);
      const moneyData = data.docs.map((doc) => doc.data());
      const moneyValue = moneyData.length > 0 ? moneyData[0].money : 0;
      setMoney(moneyValue);
    };
    fetchMoney();
  }, []);
  useEffect(() => {
    const updateExpense = async () => {
      const expenseDoc = doc(expensesCollectionRef, updateExpenseData.id);

      await updateDoc(expenseDoc, {
        name: updateExpenseData.name,
        amount: updateExpenseData.amount,
        date: updateExpenseData.date,
        projectName: updateExpenseData.projectName,
        updated_at: new Date(),
        IOE: updateExpenseData.IOE,
        type: updateExpenseData.type,
      });

      const updatedData = await getDocs(expensesCollectionRef);
      setExpenses(
        updatedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    if (firstUpdateExpense) {
      setFirstUpdateExpense(false);
      return;
    } else {
      updateExpense();
    }
  }, [updateExpenseData]);
  useEffect(() => {
    const deleteExpense = () => {
      Swal.fire({
        title: "確定刪除?",
        text: "刪除此支出",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          const del = async () => {
            await deleteDoc(doc(expensesCollectionRef, deleteExpenseData.id));
            const updatedData = await getDocs(expensesCollectionRef);
            setExpenses(
              updatedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          };
          del();
          Swal.fire({
            showConfirmButton: false,
            title: "刪除成功",
            text: "已刪除支出",
            icon: "success",
            timer: 1100,
          });
        }
      });
    };

    if (firstDeleteExpense) {
      setFirstDeleteExpense(false);
      return;
    } else {
      deleteExpense();
    }
  }, [deleteExpenseData]);
  useEffect(() => {
    const createExpense = async () => {
      await addDoc(expensesCollectionRef, createExpenseData);
      if (createExpenseData.status === 1) {
        const remainMoney =
          createExpenseData.IOE === "支出"
            ? money - createExpenseData.amount
            : money + createExpenseData.amount;
        setMoney(remainMoney);
        const moneyDoc = doc(moneyCollectionRef, "money");

        await updateDoc(moneyDoc, {
          money: remainMoney,
        });
      }
      const updatedData = await getDocs(expensesCollectionRef);
      setExpenses(
        updatedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    if (firstCreateExpense) {
      setFirstCreateExpense(false);
      return;
    } else {
      createExpense();
    }
  }, [createExpenseData]);
  useEffect(() => {
    const passExpense = async () => {
      if (passExpenseData.hander) {
        const expenseDoc = doc(expensesCollectionRef, passExpenseData.id);
        await updateDoc(expenseDoc, {
          status: 1,
        });
        const remainMoney =
          expenseDoc.IOE === "支出"
            ? money - expenseDoc.amount
            : money + expenseDoc.amount;
        setMoney(remainMoney);
        const moneyDoc = doc(moneyCollectionRef, "money");

        await updateDoc(moneyDoc, {
          money: remainMoney,
        });
        // dispatch(setPassExpense({ hander: false, id: "" }));
      } else {
        Swal.fire({
          title: "確定刪除?",
          text: "刪除此要求",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "刪除",
          cancelButtonText: "取消",
        }).then((result) => {
          if (result.isConfirmed) {
            const del = async () => {
              await deleteDoc(doc(expensesCollectionRef, passExpenseData.id));
              // dispatch(setPassExpense({ hander: true, id: "" }));
            };
            del();
            Swal.fire({
              showConfirmButton: false,
              title: "刪除成功",
              text: "已刪除支出",
              icon: "success",
              timer: 1100,
            });
          }
        });
      }
    };
    if (firstPassExpense) {
      setFirstPassExpense(false);
      return;
    } else {
      passExpense();
    }
  }, [passExpenseData]);

  return (
    <div>
      {level == "money" && <InvoiceList expensesItems={expenses} />}
      <Expenses expensesItems={expenses} projectItems={project} />
    </div>
  );
}
