import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const InputField = styled.input`
  width: 250px;
  height: 45px;
  padding: 0 20px;
  margin: 15px 0;
  background: ${(props) => props.theme.inputOverlay};
  border: none;
  outline: none;
  border-radius: 30px;
`;

const Container = styled.div`
  position: relative;
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 65px;
  width: 250px;
  padding: 5px 5px 0 5px;
  background: ${(props) => props.theme.inputOverlay};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const SearchSuggestion = styled.div`
  margin-bottom: 5px;
  padding: 5px;
  background: ${(props) => props.theme.label};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    max-width: 240px;
    font-size: 0.75rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    justify-self: flex-end;
    pointer-events: none;
  }
`;

export const EpisodeSearch = ({ value, onChange, suggestions }) => {
  const history = useHistory();

  return (
    <Container>
      <InputField
        type="text"
        placeholder="Search your favorite episodes..."
        name="episode"
        value={value}
        onChange={onChange}
        required
      />
      {suggestions && (
        <SuggestionsContainer>
          {suggestions.map((episode) => (
            <SearchSuggestion
              key={episode.id}
              onClick={() => {
                history.push(`/details/${episode.id}`);
              }}
            >
              <span title={episode.name}>{episode.name}</span>
              <img src={episode.images[2]?.url} alt={episode.name} />
            </SearchSuggestion>
          ))}
        </SuggestionsContainer>
      )}
    </Container>
  );
};

EpisodeSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  suggestions: PropTypes.array,
};

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
