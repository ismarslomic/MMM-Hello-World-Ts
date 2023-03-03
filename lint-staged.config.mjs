export default {
  '*': ['npm run prettier:fix'],
  '**/*.ts': () => ['npm run lint:fix', 'npm run build', 'git add MMM-Hello-World-Ts.js* node_helper.js*'],
}
