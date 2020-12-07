import { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

const InputField = styled.input`
  width: 265px;
  height: 45px;
  padding: 0 20px;
  margin: 15px 0;
  background: var(--input-overlay-light);
  border: none;
  outline: none;
  border-radius: 30px;
`;

export const EpisodeSearch = () => {
  const [searchData, setSearchData] = useState("");

  const handleChange = (event) => {
    setSearchData(event.target.value);
    console.log(searchData);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        placeholder="Search your favorite episodes..."
        name="episode"
        value={searchData}
        onChange={handleChange}
        required
      />
    </form>
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
