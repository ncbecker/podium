import FilterPage from "./FilterPage";

export default {
  title: "Podium/Pages",
  component: FilterPage,
};

const Template = (args) => <FilterPage {...args} />;

export const FilterPageOpen = Template.bind({});
FilterPageOpen.args = {
  open: true,
};
