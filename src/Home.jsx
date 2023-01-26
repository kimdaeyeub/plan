import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  query,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "./fbase";
import TodoDetail from "./TodoDetail";
import AddTodo from "./AddTodo";

const Pre = styled.pre`
  border-radius: 20px;
  line-height: 1.5;
  border: 2px solid ${(prop) => prop.Color};
  width: 100%;
  height: ${(prop) => prop.Height};
  padding: 5%;
  padding-left: 20px;
  font-size: 22px;
  margin-top: 5%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background-color: white;
  min-width: 300px;
  position: fixed;
  z-index: 10;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  min-height: 470px;
  box-sizing: border-box;
  padding: 10px;
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;
const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  box-sizing: border-box;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;
  border: 2px solid white;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
`;
const Nav = styled.div`
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Search = styled.input`
  width: 30%;
  background-color: transparent;
  padding: 13px;
  border: 2px solid white;
  border-radius: 15px;
`;
const PlusBtn = styled.button`
  width: 40px;
  background-color: transparent;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  font-size: 30px;
  color: white;
`;
const Content = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-flow: row;
  grid-auto-rows: 200px;
  grid-auto-columns: 200px;
  overflow-x: auto;
  gap: 15px;
`;
const TitleBox = styled.div`
  background-color: ${(prop) => prop.Color};
  width: 60%;
  height: 100%;
  padding: 5px;
  padding-left: 5%;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
`;
const Box = styled.div`
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border: 3px solid white;
  border-radius: 20px;
  display: flex;
  padding: 3%;
  flex-direction: column;
  align-items: center;
  grid-column: ${(prop) => (prop.mobile ? "span 1" : `span ${prop.Col}`)};
  grid-row: ${(prop) => (prop.mobile ? "span 1" : `span ${prop.Row}`)};
`;
const BoxHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-size: 25px;
`;
function Home({ mobile, userObj }) {
  const [modal, setModal] = useState(false);
  const [modalInput, setModalInput] = useState(false);
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const addTodoBox = () => {
    setModal(true);
    setColor("");
  };
  const onClickModalOverlay = () => {
    setModal(false);
    setRow("");
    setTitle("");
    setTodo("");
    setCol("");
    setModal(false);
    setDetail("");
  };
  const onChangeCol = (event) => {
    const {
      target: { value },
    } = event;
    if (Number(value) < 0 || Number(value) > 6) {
      console.log("error");
    } else {
      setCol(value);
    }
  };
  const onChangeRow = (event) => {
    const {
      target: { value },
    } = event;
    if (Number(value) < 0 || Number(value) > 6) {
      console.log("error");
    } else {
      setRow(value);
    }
  };
  const onChangeTitle = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };
  const onChangeTodo = (event) => {
    const {
      target: { value },
    } = event;
    setTodo(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "todos"), {
        color,
        col,
        row,
        title,
        todo,
        detail,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setRow("");
    setTitle("");
    setTodo("");
    setCol("");
    setModal(false);
    setDetail("");
  };
  useEffect(() => {
    const q = query(
      collection(dbService, "todos"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const todoArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let userData = [];
      for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].creatorId === userObj.uid) {
          userData.push(todoArr[i]);
        }
      }
      setData(userData);
    });
  }, []);
  const [inputModeData, setInputModeData] = useState();
  const onInputMode = (data) => {
    setInputModeData(data);
    setModalInput(true);
  };
  const onClickInputOverlay = () => {
    setModalInput(false);
    setColorMode(false);
    setRow("");
    setTitle("");
    setTodo("");
    setCol("");
    setDetail("");
  };
  const [color, setColor] = useState("#080808");
  const [colorMode, setColorMode] = useState(false);
  const colorPicker = (event) => {
    const {
      target: { value },
    } = event;
    setColor(value);
    setColorMode(true);
  };
  const [detail, setDetail] = useState("");
  const [detailValue, setDetailValue] = useState(false);
  const onChangeDetail = (event) => {
    const {
      target: { value },
    } = event;
    setDetail(value);
    setDetailValue(true);
  };
  const deleteTodo = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, "todos", id));
      setModalInput(false);
    }
  };
  const updateTodos = (event) => {
    event.preventDefault();
  };
  const updateTodo = async (id) => {
    if (col && row && todo && detail) {
      await updateDoc(doc(dbService, "todos", id), {
        color,
        col,
        row,
        todo,
        detail,
      });
      setColorMode(false);
      setCol("");
      setRow("");
      setTodo("");
      setDetail("");
      setModalInput(false);
      setDetailValue(false);
    } else {
      window.confirm("빈칸을 채워주세요");
    }
  };
  return (
    <Body>
      {modal ? (
        <Modal>
          <ModalContent>
            <AddTodo
              inputModeData={inputModeData}
              color={color}
              colorPicker={colorPicker}
              onChangeDetail={onChangeDetail}
              detail={detail}
              onChangeTitle={onChangeTitle}
              title={title}
              onChangeTodo={onChangeTodo}
              todo={todo}
              onChangeCol={onChangeCol}
              col={col}
              onChangeRow={onChangeRow}
              row={row}
              onSubmit={onSubmit}
            />
          </ModalContent>
          <ModalOverlay onClick={onClickModalOverlay}></ModalOverlay>
        </Modal>
      ) : null}
      {modalInput ? (
        <Modal>
          <ModalContent>
            <TodoDetail
              inputModeData={inputModeData}
              color={color}
              colorPicker={colorPicker}
              data={data}
              onChangeDetail={onChangeDetail}
              detail={detail}
              onChangeTitle={onChangeTitle}
              title={title}
              onChangeTodo={onChangeTodo}
              todo={todo}
              onChangeCol={onChangeCol}
              col={col}
              onChangeRow={onChangeRow}
              row={row}
              updateTodo={updateTodo}
              updateTodos={updateTodos}
              deleteTodo={deleteTodo}
              colorMode={colorMode}
              detailValue={detailValue}
            />
          </ModalContent>
          <ModalOverlay onClick={onClickInputOverlay}></ModalOverlay>
        </Modal>
      ) : null}
      <Wrapper>
        <Nav>
          <Search placeholder="검색" />
          <PlusBtn onClick={addTodoBox}>+</PlusBtn>
        </Nav>
        <Content>
          {data.map((data, index) => (
            <Box mobile={mobile} key={index} Col={data.col} Row={data.row}>
              <BoxHead>
                <TitleBox Color={data.color} onClick={() => onInputMode(data)}>
                  <Title>{data.title}</Title>
                </TitleBox>
              </BoxHead>
              <Pre Color={data.color} Height={"40%"}>
                {data.todo}
              </Pre>
              {mobile || data.row < 2 ? null : (
                <Pre Color={data.color} Height={"60%"}>
                  {data.detail}
                </Pre>
              )}
            </Box>
          ))}
        </Content>
      </Wrapper>
    </Body>
  );
}

export default Home;
