import React, { useState } from 'react';
import faker from 'faker';

import ManageTechinicians from '../../../../containers/Technician/Manage';

const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: faker.name.findName(),
    external: faker.random.boolean(),
    plate: `AAA12${i}`,
    cnh: '01010101',
    // actions
  });
}

export default {
  title: 'Containers/Technician/Manage',
  component: ManageTechinicians,
};

const Template = (args) => {
  const [avancedSearch, setAvancedSearch] = useState(false);

  const handleClickAvancedSearch = () => setAvancedSearch(!avancedSearch);

  return (
    <ManageTechinicians
      {...args}
      handleClickAvancedSearch={handleClickAvancedSearch}
      data={data}
      avancedSearch={avancedSearch}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
