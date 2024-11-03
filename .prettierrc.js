module.exports = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'none',
  semi: true,
   rules:{
     "prettier/prettier":
       ["error", {
    "endOfLine": "auto",
        "parser": "flow",
    "comma-dangle": "off"
       },
       ],
       "comma-dangle": "off"


    },

importOrder: [
  '^react',
  '^react$',
  '^react-native$',
  '^redux',
  '^@',
  '^@$',
  '^[a-zA-Z]',
  '^_components/(.*)$',
  '^_features/(.*)$',
  '^_navigation/(.*)$',
  '^_store/(.*)$',
  '^_hooks/(.*)$',
  '^_models/(.*)$',
  '^_utils/(.*)$',
  '^_enums/(.*)$',
  '^_config/(.*)$',
  '_i18n',
  '_languages',
  '^../(.*)$',
  '^./(.*)$'
  ],

};
