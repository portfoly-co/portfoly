import NextLink from 'next/link'
import { Link as PayloadLink } from '@/payload-types'

type LinkProps = {
  link: PayloadLink
  className?: string
}

const Link = (props: LinkProps) => {
  return (
    <NextLink
      className={props.className}
      target="_blank"
      href={
        (props.link.type == 'phone' ? 'tel:' : props.link.type == 'email' ? 'mailto:' : '') +
        props.link.url
      }
    >
      {props.link.text}
    </NextLink>
  )
}

export default Link
