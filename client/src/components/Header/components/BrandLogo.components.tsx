import { memo } from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = memo(() => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center group">
        <img
          src="/JustDrinkJava_logo.png"
          alt="JustDrinkJava"
          className="h-10 w-auto transition-all duration-300 
                    group-hover:scale-110"
        />
      </Link>
    </div>
  );
});

BrandLogo.displayName = 'BrandLogo';
