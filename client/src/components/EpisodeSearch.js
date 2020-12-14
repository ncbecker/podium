import styled from "styled-components/macro";
import PropTypes from "prop-types";

const InputField = styled.input`
  width: 250px;
  height: 45px;
  padding: 0 20px;
  margin: 15px 0;
  background: var(--input-overlay-light);
  border: none;
  outline: none;
  border-radius: 30px;
`;

export const EpisodeSearch = ({ value, onChange }) => {
  return (
    <InputField
      type="text"
      placeholder="Search your favorite episodes..."
      name="episode"
      value={value}
      onChange={onChange}
      required
    />
  );
};

EpisodeSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
