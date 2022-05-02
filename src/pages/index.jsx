import Button from "../components/button";
import NavAndFooter from "../components/User/NavAndFooter";
import ImageSliderHome from "../components/SliderHome/Slider";
import CarouselDemo from "../components/carousel/CarouselDemo";
import PanelMenu from "../components/PanelMenu/PanelMenu";
import Banner from "../components/banner/bannerHome";
import DataViewDemo from "../components/dataview/DataViewDemo";
//import Slider from "react-slick";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;

  .columWidth {
    width: 1500px;
  }

  /* .container2 {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
  } */
`;

const Colum1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
`;

const Colum2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-top: 125px;
`;

const index = () => {
  return (
    <NavAndFooter>
      <ImageSliderHome />
      <Container>
        <Colum1 className="columWidth">
          <CarouselDemo />
        </Colum1>

        <Colum2>
          <PanelMenu />
        </Colum2>
      </Container>
      <Container>
        <DataViewDemo />
      </Container>
      <Container>
        <Banner />
      </Container>
    </NavAndFooter>
  );
};

export default index;
