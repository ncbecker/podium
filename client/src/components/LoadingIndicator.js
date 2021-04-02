import styled from "styled-components/macro";
import { ReactComponent as LoadingIcon } from "../assets/loading.svg";

const Container = styled.div`
  padding: 1rem;
  display: block;
  text-align: center;
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
