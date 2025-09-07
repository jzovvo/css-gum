import * as Core from './modules/core'
import * as Gen from './modules/generator-functions'
import * as Util from './modules/utils'
import * as BuildSnippetsGenerator from './modules/build-snippets'
import * as BuildConfigsGenerator from './modules/build-configs'
import {writeSnippetsToFiles} from './modules/build-snippets/io'
import {writeConfigToFiles} from './modules/build-configs/io'

const Snippet = {
  ...BuildSnippetsGenerator,
  writeSnippetsToFiles,
}

const Config = {
  ...BuildConfigsGenerator,
  writeConfigToFiles,
}

export {Core, Gen, Util, Snippet, Config}
