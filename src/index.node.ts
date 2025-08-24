import * as Core from './modules/core'
import * as Gen from './modules/gen'
import * as Util from './modules/utils'
import * as SnippetCore from './modules/snippets'
import {writeSnippetsToFiles} from './modules/snippets-file'

const Snippet = {
  ...SnippetCore,
  writeSnippetsToFiles,
}

export {Core, Gen, Util, Snippet}
