import React from "react";
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
  padding: 2%;
`;
const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
const Title = styled.input`
  height: 100%;
  font-size: 20px;
  background-color: ${(prop) => (prop.Color ? prop.Color : "transparent")};
  box-sizing: border-box;
  width: 100%;
  border-radius: ${(prop) => (prop.Color ? "20px" : null)};
  border: none;
  border-bottom: ${(prop) => (prop.Color ? "none" : "2px solid grey")};
  padding-left: 5%;
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
  width: 60%;
  height: 100%;
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
  height: 30%;
  display: flex;
  justify-content: end;
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
  height: 80%;
  margin-top: 2%;
  display: flex;
  align-items: center;
`;
const Span = styled.span`
  font-size: 22px;
  margin-right: 3%;
`;
function AddTodo({
  onSubmit,
  colorPicker,
  onChangeDetail,
  detail,
  onChangeTitle,
  title,
  onChangeTodo,
  todo,
  onChangeCol,
  col,
  onChangeRow,
  row,
  color,
}) {
  return (
    <Container>
      <Header>
        <TitleBox>
          <Title
            placeholder="제목"
            Color={color}
            value={title}
            onChange={onChangeTitle}
          ></Title>
        </TitleBox>
        <RightHead>
          <Input type="color" value={color} onChange={colorPicker} />
          <Color>{color}</Color>
        </RightHead>
      </Header>
      <Body>
        <Form onSubmit={onSubmit}>
          <Wrapper>
            <Span>가로 칸 : </Span>
            <InputGrid
              type="number"
              placeholder="6보다 작은수"
              value={col}
              onChange={onChangeCol}
              required
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
            placeholder="일정"
            value={todo}
            onChange={onChangeTodo}
            required
          ></Textarea>
          <Textarea
            placeholder="세부사항"
            value={detail}
            onChange={onChangeDetail}
            required
          ></Textarea>
        </Form>
        <Footer>
          <Button onClick={onSubmit}>추가</Button>
        </Footer>
      </Body>
    </Container>
  );
}

export default AddTodo;
