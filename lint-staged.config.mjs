/** Quote staged paths for commands returned by a lint-staged callback. */
function quoteShellArgument(argument) {
  return "'" + argument.replaceAll("'", "'\"'\"'") + "'"
}

export default {
  '*.ts': (stagedFiles) => {
    const quotedFiles = stagedFiles.map(quoteShellArgument).join(' ')
    return [
      `eslint --fix ${quotedFiles}`,
      `prettier --write ${quotedFiles}`,
      'npm run build',
      // Generated bundles are outside lint-staged's matched TypeScript files.
      'git add -- MMM-Hello-World-Ts.js MMM-Hello-World-Ts.js.map node_helper.js node_helper.js.map',
    ]
  },
  '*.{js,mjs}': ['eslint --fix --no-warn-ignored', 'prettier --write'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '!(*.{ts,js,mjs,css})': 'prettier --write --ignore-unknown',
}
