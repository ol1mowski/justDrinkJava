import { memo } from 'react'
import { BenefitItem } from './BenefitItem.component'
import { 
  AcademicCapIcon, 
  TrophyIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline'
import type { BenefitsSectionProps } from '../types'

export const BenefitsSection = memo<BenefitsSectionProps>(({ className }) => (
  <div className={[
    'relative bg-java-orange min-h-screen flex items-center justify-center p-8 lg:p-12',
    className
  ].filter(Boolean).join(' ')}>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full" />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-white rounded-full" />
    </div>

    <div className="relative max-w-lg w-full">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AcademicCapIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Dołącz do społeczności
        </h1>
        <p className="text-orange-100 text-lg leading-relaxed">
          Odkryj świat programowania Java z tysiącami innych developerów
        </p>
      </div>

      <div className="space-y-6">
        <BenefitItem
          icon={<TrophyIcon className="w-6 h-6 text-white" />}
          title="Ekskluzywne quizy"
          description="Dostęp do zaawansowanych quizów i testów sprawdzających Twoją wiedzę z Java"
        />
        
        <BenefitItem
          icon={<UserGroupIcon className="w-6 h-6 text-white" />}
          title="Społeczność"
          description="Dołącz do aktywnej społeczności programistów i dziel się doświadczeniem"
        />
        
        <BenefitItem
          icon={<ChartBarIcon className="w-6 h-6 text-white" />}
          title="Śledź postępy"
          description="Monitoruj swój rozwój i zdobywaj punkty doświadczenia za ukończone zadania"
        />
      </div>

      <div className="mt-12 text-center">
        <p className="text-orange-100 text-sm">
          Już <span className="font-semibold text-white">10,000+</span> programistów nam zaufało
        </p>
      </div>
    </div>
  </div>
))

BenefitsSection.displayName = 'BenefitsSection' 