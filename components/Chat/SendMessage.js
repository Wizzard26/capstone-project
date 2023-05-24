import styled from "styled-components";
export default function SendMessage({ handleSubmit, handleMessageChange, message }) {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextInput
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Your message here ...."
      />
    </StyledForm>
  )
};


const StyledForm = styled.form`
  width: 100%;
  position: fixed;
  bottom: 60px;
`;

const StyledTextInput = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  padding: 4px 20px;
  
  &:focus {
    border: none;
    outline: none;
  }
`;
