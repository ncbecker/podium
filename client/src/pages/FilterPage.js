import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { CloseButton } from "../components/IconButton.js";
import { useState } from "react";

const FilterPageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: calc(50% - 187.5px);
  z-index: 10;
  width: 375px;
  height: ${({ open }) => (open ? "100%" : "0")};
  background: ${(props) => props.theme.inputOverlay};
  border-radius: 15px 15px 0 0;
  transition: height 0.4s ease-in-out;
  overflow: hidden;
`;

const FilterWrapper = styled.div`
  width: 100%;
  padding: 15px;
  display: grid;
  grid-template-rows: repeat(4, auto);
`;

const TopBar = styled.div`
  grid-row: 1 / 2;
  justify-self: end;
`;

const FilterHeading = styled.h2`
  margin: 0;
  grid-row: 2 / 3;
  justify-self: start;
  font-size: 2 rem;
`;

const FilterSubHeading = styled.h3`
  margin: 10px 0;
  font-size: 1.25rem;
`;

const FilterTimeContainer = styled.div`
  grid-row: 3 / 4;
  justify-self: start;
`;

const FilterCategoryContainer = styled.div`
  grid-row: 4 / 5;
  justify-self: start;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const StyledInput = styled.input`
  display: none;
`;
const StyledLabel = styled.label`
  margin-bottom: 5px;
  padding: 5px;
  width: 100%;
  font-weight: 500;
  background: ${(props) => (props.checked ? props.theme.label : "none")};
  border-radius: 5px;
  user-select: none;
  outline: none;
  cursor: pointer;
`;

const time = [
  { time: "week", label: "Best of last week" },
  { time: "month", label: "Best of last month" },
  { time: "year", label: "Best of last year" },
  { time: "alltime", label: "Best of all time" },
];

const categories = [
  { category: "comedy", label: "Comedy", checked: true },
  { category: "crime", label: "True crime", checked: true },
  { category: "edu", label: "Educational", checked: true },
  { category: "news", label: "News & Politics", checked: true },
  {
    category: "biz",
    label: "Business & Technology",
    checked: true,
  },
  { category: "story", label: "Stories", checked: true },
  { category: "art", label: "Arts & Entertainment", checked: true },
  { category: "life", label: "Lifestyle & Health", checked: true },
  { category: "music", label: "Music", checked: true },
  { category: "games", label: "Games", checked: true },
  {
    category: "society",
    label: "Society & Culture",
    checked: true,
  },
];

function FilterPage({ open, onClick }) {
  const [timeFilter, setTimeFilter] = useState(time[3].time);
  const [categoryFilter, setCategoryFilter] = useState(categories);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(timeFilter);
    console.log(categoryFilter);
  };

  return (
    <FilterPageWrapper open={open}>
      <FilterWrapper>
        <TopBar>
          <CloseButton onClick={onClick} />
        </TopBar>
        <FilterHeading>Filter</FilterHeading>
        <FilterTimeContainer>
          <FilterSubHeading>Time</FilterSubHeading>
          <StyledForm onSubmit={handleSubmit}>
            {time.map((t) => (
              <StyledLabel
                key={t.time}
                htmlFor={t.time}
                checked={timeFilter === t.time}
              >
                <StyledInput
                  type="radio"
                  id={t.time}
                  checked={timeFilter === t.time}
                  value={t.time}
                  onChange={(event) => {
                    setTimeFilter(event.target.value);
                  }}
                />
                <span>{t.label}</span>
              </StyledLabel>
            ))}
          </StyledForm>
        </FilterTimeContainer>
        <FilterCategoryContainer>
          <FilterSubHeading>Category</FilterSubHeading>
          <StyledForm onSubmit={handleSubmit}>
            {categoryFilter.map((cat) => (
              <StyledLabel
                key={cat.category}
                htmlFor={cat.category}
                checked={cat.checked}
              >
                <StyledInput
                  type="checkbox"
                  id={cat.category}
                  checked={cat.checked}
                  onChange={(event) => {
                    setCategoryFilter(
                      categoryFilter.map((data) => {
                        if (cat.category === data.category) {
                          data.checked = event.target.checked;
                        }
                        return data;
                      })
                    );
                  }}
                />

                <span>{cat.label}</span>
              </StyledLabel>
            ))}
          </StyledForm>
        </FilterCategoryContainer>
        <FilterSubHeading>
          <button onClick={handleSubmit}>Apply Filter</button>
        </FilterSubHeading>
      </FilterWrapper>
    </FilterPageWrapper>
  );
}

export default FilterPage;

FilterPage.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
};
