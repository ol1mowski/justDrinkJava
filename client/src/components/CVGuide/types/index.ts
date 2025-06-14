export interface TooltipData {
  title: string
  dos: string[]
  donts: string[]
  tips: string[]
}

export interface CVSectionProps {
  id: string
  title: string
  children: React.ReactNode
  onClick: () => void
  isActive: boolean
}

export interface TooltipProps {
  data: TooltipData
  onClose: () => void
}

export interface CVSectionContentProps {
  activeTooltip: string | null
  onSectionClick: (sectionId: string) => void
}

export type CVContentProps = CVSectionContentProps

export type TooltipSection = 'header' | 'summary' | 'experience' | 'skills' | 'education' | 'projects' 