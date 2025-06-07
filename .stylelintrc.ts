import { Config } from 'stylelint'

const config: Config = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-scss'],
  rules: {
    indentation: 2,
    'string-quotes': 'single',
    'color-no-invalid-hex': true,
    'block-no-empty': true,
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'max-empty-lines': 1,
    'at-rule-no-unknown': [true]
  }
}

export default config
