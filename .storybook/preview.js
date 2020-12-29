import React from 'react'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import 'moment/locale/pt-br'
import fake from 'faker'

fake.locale = 'pt_PT'

export const decorators = [
  (Story) => (
    <ConfigProvider locale={ptBR}>
      <Story />
    </ConfigProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
