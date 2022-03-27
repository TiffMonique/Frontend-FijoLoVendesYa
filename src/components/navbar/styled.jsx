import styled from "@emotion/styled";

export const StyledNavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 90px;
  //position: fixed;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1440px;
    padding: 0px 60px;
  }
  .logo {
    height: 70%;
  }



  .content {
    display: flex;
    flex-direction: row;
  }

  .loginButtons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ul {
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    width: max-content;

    .li {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0px 10px;

      .link{
        color: #333333;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        font-family: "Montserrat", sans-serif;
      }

    }
  }

.item-input{
  width: 40vw;
}

.ui{
    background-color: #d8e5ff;
    border-radius:0px;
  }

  



`;


export const Input = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-radius: 12px;
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

