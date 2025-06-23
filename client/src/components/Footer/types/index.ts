export interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}
