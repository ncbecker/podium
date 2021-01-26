import styled from "styled-components/macro";
import { ReactComponent as LoadingIcon } from "../assets/loading.svg";

const Container = styled.div`
  padding: 1rem;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  svg path,
  svg rect {
    fill: ${(props) => props.theme.icon};
  }
`;

const LoadingIndicator = () => {
  return (
    <Container>
      <LoadingIcon />
    </Container>
  );
};

export default LoadingIndicator;
