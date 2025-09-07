import * as Core from './modules/core'
import * as Gen from './modules/gen'
import * as Util from './modules/utils'
import * as SnippetCore from './modules/snippets'
import {writeSnippetsToFiles} from './modules/snippets-file'
import * as ConfigCore from './modules/config'
import {writeConfigToFiles} from './modules/config-file'

const Snippet = {
  ...SnippetCore,
  writeSnippetsToFiles,
}

const Config = {
  ...ConfigCore,
  writeConfigToFiles,
}

export {Core, Gen, Util, Snippet, Config}
