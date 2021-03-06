import styled from "@emotion/styled";

export const BoxContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -120px;
  margin-bottom: 20px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;

  flex-direction: column;
  justify-content: center;

  //box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
  //max-height: 200px;
  //overflow:auto;
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(100, 100, 100, 0.5);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.button`
  font-size: 11px;
  color: rgb(241, 196, 15);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
  background-color: #fff;
  border: none;

  &:focus {
    outline: none;
  }

  &:hover {
    filter: brightness(1.05);
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(100, 100, 100, 0.6);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 9px 20%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  text-align: center;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
  text-align: center;
  &:hover {
    filter: brightness(1.05);
  }
`;

export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FieldError = styled.span`
  color: #b32e2e;
  font-size: 11px;
  min-height: 18px;
`;
