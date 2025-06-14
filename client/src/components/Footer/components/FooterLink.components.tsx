import { memo } from 'react'
import type { FooterLinkProps } from '../types'

export const FooterLink = memo<FooterLinkProps>(({ href, children, external = false }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="text-gray-600 hover:text-java-orange transition-colors duration-200"
  >
    {children}
  </a>
))

FooterLink.displayName = 'FooterLink' 