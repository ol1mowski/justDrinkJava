import { memo } from 'react'
import type { BenefitItemProps } from '../types'

export const BenefitItem = memo<BenefitItemProps>(({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-orange-100 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
))

BenefitItem.displayName = 'BenefitItem' 