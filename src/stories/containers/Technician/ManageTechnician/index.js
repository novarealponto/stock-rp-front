import React, { useState, useEffect } from 'react';
import faker from 'faker';
import { find, filter, match, length } from 'ramda';

import ManageTechinicians from '../../../../containers/Technician/Manage';

const initialData = [];

for (let i = 0; i < 100; i++) {
  initialData.push({
    key: i,
    name: faker.name.findName(),
    external: faker.random.boolean(),
    plate: `AAA12${i}`,
    dueDateCnh: '01010101',
  });
}

const initialQuery = {
  name: '',
  plate: '',
  dueDateCnh: '',
};

export default {
  title: 'Containers/Technician/Manage',
  component: ManageTechinicians,
};

const Template = (args) => {
  const [avancedSearch, setAvancedSearch] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState(initialData);

  const handleClickAvancedSearch = () => setAvancedSearch(!avancedSearch);

  const onChange = ({ target: { name, value } }) => {
    setQuery({ ...query, [name]: value });
  };

  useEffect(() => {
    setData(filterData(initialData));
  }, [query]);

  const createRegex = (pattern) => new RegExp(`${pattern}`, 'gi');

  const applyMatch = (key, object) =>  match(createRegex(query[key]), object[key]);

  const filterData = (data) => {
    const callback = (item) => {
      return (
        length(applyMatch('name', item)) > 0 &&
        length(applyMatch('plate', item)) > 0 &&
        length(applyMatch('dueDateCnh', item)) > 0
      );
    };

    return filter(callback, data);
  };

  return (
    <ManageTechinicians
      {...args}
      query={query}
      onChange={onChange}
      handleClickAvancedSearch={handleClickAvancedSearch}
      data={data}
      avancedSearch={avancedSearch}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
