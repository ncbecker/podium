import styled from "styled-components/macro";
import { CloseButton } from "../components/IconButton.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--input-overlay-light);
  border-radius: 15px 15px 0 0;
`;

function FilterPage() {
  return (
    <PageWrapper>
      <CloseButton />
      <div>Filter</div>
    </PageWrapper>
  );
}

export default FilterPage;
