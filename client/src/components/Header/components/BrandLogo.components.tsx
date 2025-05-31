import { memo } from 'react'

export const BrandLogo = memo(() => {
  return (
    <div className="flex-shrink-0">
      <a href="/" className="flex items-center group">
        <img
          src="/JustDrinkJava_logo.png"
          alt="JustDrinkJava"
          className="h-10 w-auto transition-all duration-300 
                    group-hover:scale-110"
        />
      </a>
    </div>
  )
})

BrandLogo.displayName = 'BrandLogo' 