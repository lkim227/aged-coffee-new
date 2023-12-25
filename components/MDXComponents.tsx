import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import { Tweet } from 'react-tweet'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import TOCInlineWithSticky from './TOCInlineWithSticky'
import Mermaid from './Mermaid'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  TOCInlineWithSticky,
  Tweet,
  Mermaid,
}
