import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0% 2%;
`;
const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
const Title = styled.span`
  font-size: 3rem;
  font-family: "Nanum Pen Script", cursive;
`;
const Body = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const RightHead = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: end;
  align-items: center;
`;
const Color = styled.span`
  margin-left: 9%;
  font-size: 17px;
  opacity: 0.4;
`;
const TitleBox = styled.div`
  background-color: ${(prop) => prop.Color};
  width: 60%;
  height: 70%;
  padding-left: 5%;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
`;
const Input = styled.input`
  min-width: 30px;
  border: none;
  background-color: transparent;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 90%;
  margin-top: 2%;
  font-size: 22px;
  border-radius: 20px;
  padding: 3%;
  box-sizing: border-box;
`;
const TextBox = styled.div`
  width: 100%;
  border: 2px solid grey;
  height: ${(prop) => (prop.Height ? "40%" : "")};
  margin-top: 2%;
  font-size: 22px;
  border-radius: 20px;
  padding: 3%;
  box-sizing: border-box;
`;
const Button = styled.button`
  min-width: 110px;
  width: 10%;
  height: 80%;
  border: none;
  background-color: transparent;
  font-size: 21px;
`;
const Footer = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: end;
  margin-top: 1%;
`;
const InputGrid = styled.input`
  width: 30%;
  height: 10%;
  padding: 15px;
  border: none;
  border-bottom: 2px solid grey;
`;
const Wrapper = styled.div`
  width: 100%;
  margin-top: 1%;
  display: flex;
  align-items: center;
`;
const Span = styled.span`
  font-size: 22px;
  margin-right: 3%;
`;
function TodoDetail({
  colorPicker,
  inputModeData,
  onChangeDetail,
  detail,
  onChangeTodo,
  todo,
  onChangeCol,
  col,
  onChangeRow,
  updateTodo,
  updateTodos,
  row,
  color,
  deleteTodo,
  colorMode,
  detailValue,
}) {
  const [updateMode, setUpdateMode] = useState(false);
  const mode = () => {
    setUpdateMode(true);
  };
  return (
    <Container>
      <Header>
        <TitleBox Color={colorMode ? color : inputModeData.color}>
          <Title>{inputModeData.title}</Title>
        </TitleBox>
        <RightHead>
          {updateMode ? (
            <>
              <Input
                type="color"
                id="head"
                name="head"
                value={colorMode ? color : inputModeData.color}
                onChange={colorPicker}
              />
              <Color>{color}</Color>
            </>
          ) : (
            <Button onClick={mode}>업데이트</Button>
          )}
        </RightHead>
      </Header>
      <Body>
        {updateMode ? (
          <>
            <Form onSubmit={updateTodos}>
              <Wrapper>
                <Span>가로 칸 : </Span>
                <InputGrid
                  placeholder="6보다 작은수"
                  type="number"
                  value={col}
                  onChange={onChangeCol}
                  required={true}
                />
              </Wrapper>
              <Wrapper>
                <Span>세로 칸 : </Span>
                <InputGrid
                  type="number"
                  placeholder="6보다 작은수"
                  value={row}
                  onChange={onChangeRow}
                  required
                />
              </Wrapper>
              <Textarea
                value={todo}
                onChange={onChangeTodo}
                placeholder="일정"
                required
              ></Textarea>
              <Textarea
                value={detailValue ? detail : inputModeData.detail}
                onChange={onChangeDetail}
                placeholder="세부사항"
                required
              ></Textarea>
            </Form>
            <Footer>
              <Button onClick={() => updateTodo(inputModeData.id)}>
                업데이트
              </Button>
              <Button onClick={() => deleteTodo(inputModeData.id)}>삭제</Button>
            </Footer>
          </>
        ) : (
          <>
            <TextBox Height={false}>{inputModeData.todo}</TextBox>
            <TextBox Height={true}>{inputModeData.detail}</TextBox>
          </>
        )}
      </Body>
    </Container>
  );
}

export default TodoDetail;
