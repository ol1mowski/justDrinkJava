import { memo } from 'react'
import { FooterLink, FooterSection, SocialLinks } from './components'

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterSection title="O nas">
            <p className="text-gray-600 text-sm leading-relaxed">
              JustDrinkJava to platforma dla programistów Java. 
              Dzielimy się wiedzą, poradami i najlepszymi praktykami.
            </p>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </FooterSection>

          <FooterSection title="Nawigacja">
            <div className="flex flex-col space-y-2">
              <FooterLink href="/">Strona główna</FooterLink>
              <FooterLink href="/cv-guide">Poradnik CV</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/kontakt">Kontakt</FooterLink>
            </div>
          </FooterSection>

          <FooterSection title="Zasoby">
            <div className="flex flex-col space-y-2">
              <FooterLink href="/dokumentacja">Dokumentacja</FooterLink>
              <FooterLink href="/tutoriale">Tutoriale</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/wsparcie">Wsparcie</FooterLink>
            </div>
          </FooterSection>

          <FooterSection title="Prawne">
            <div className="flex flex-col space-y-2">
              <FooterLink href="/polityka-prywatnosci">Polityka prywatności</FooterLink>
              <FooterLink href="/regulamin">Regulamin</FooterLink>
              <FooterLink href="/cookies">Pliki cookies</FooterLink>
              <FooterLink href="/rodo">RODO</FooterLink>
            </div>
          </FooterSection>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-java-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="text-gray-800 font-semibold">JustDrinkJava</span>
            </div>
            <p className="text-gray-600 text-sm">
              © {currentYear} JustDrinkJava. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer 