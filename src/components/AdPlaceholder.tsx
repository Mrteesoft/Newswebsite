interface AdPlaceholderProps {
  size?: 'banner' | 'square' | 'sidebar';
  className?: string;
}

export default function AdPlaceholder({ size = 'banner', className = '' }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: 'h-24 md:h-32',
    square: 'aspect-square',
    sidebar: 'h-64',
  };

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <div className="text-center">
        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V1" />
        </svg>
        <p className="text-sm text-gray-500 font-medium">Advertisement</p>
        <p className="text-xs text-gray-400 mt-1">
          {size === 'banner' && '728 x 90'}
          {size === 'square' && '300 x 300'}
          {size === 'sidebar' && '300 x 250'}
        </p>
      </div>
    </div>
  );
}
