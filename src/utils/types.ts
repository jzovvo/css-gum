import {z} from 'zod'

export const pixelSchema = z.coerce.number()

export const designDraftSchema = z.coerce.number()

export const percentSchema = z.coerce.number()

export const spaceFlagSchema = z.coerce.number().pipe(z.union([z.literal(1), z.literal(0)]))

export type Pixel = z.infer<typeof pixelSchema>

export type DesignDraft = z.infer<typeof designDraftSchema>

export type Percent = z.infer<typeof percentSchema>

export type SpaceFlag = z.infer<typeof spaceFlagSchema>

export type Order = 'asc' | 'desc'

export type VSCodeLanguageIdentifier =
'abap' |
'bat' |
'bibtex' |
'clojure' |
'coffeescript' |
'c' |
'cpp' |
'csharp' |
'dockercompose' |
'css' |
'cuda-cpp' |
'd' |
'dart' |
'pascal' |
'diff' |
'dockerfile' |
'erlang' |
'fsharp' |
'git-commit' | 'git-rebase' |
'go' |
'groovy' |
'handlebars' |
'haml' |
'haskell' |
'html' |
'ini' |
'java' |
'javascript' |
'javascriptreact' |
'json' |
'jsonc' |
'julia' |
'latex' |
'less' |
'lua' |
'makefile' |
'markdown' |
'objective-c' |
'objective-cpp' |
'ocaml' |
'pascal' |
'perl' | 'perl6' |
'php' |
'plaintext' |
'powershell' |
'jade, pug' |
'python' |
'r' |
'razor' |
'ruby' |
'rust' |
'scss' | 'sass' |
'shaderlab' |
'shellscript' |
'slim' |
'sql' |
'stylus' |
'svelte' |
'swift' |
'typescript' |
'typescriptreact' |
'tex' |
'vb' |
'vue' |
'vue-html' |
'xml' |
'xsl' |
'yaml'

export interface SnippetConfig {
  prefix: string
  body: string | string[]
  scope?: string
}

export type Snippets = Record<string, SnippetConfig>


export type ViewportWidthUnit = 'vw' | 'dvw' | 'lvw' | 'svw'
export type ViewportHeightUnit = 'vh' | 'dvh' | 'lvh' | 'svh'
