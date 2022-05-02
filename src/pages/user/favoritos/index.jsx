import NavAndFooter from "../../../components/User/NavAndFooter";
import styled from "@emotion/styled";
import DataViewDemo from "../../../components/dataviewfavoritos/DataViewDemo";
import { useState, useEffect, useCallback, useRef } from "react";

const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
`;

const slider = styled.div`
  height: 500px;
`;

const index = () => {
  return (
    <NavAndFooter>
      <div className="container mt-5 carousel">
        <h1 className="slider_title"></h1>
        <Container>
          <DataViewDemo />
        </Container>
      </div>
    </NavAndFooter>
  );
};

export default index;
