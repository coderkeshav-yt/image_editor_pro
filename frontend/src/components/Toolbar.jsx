import { Download, ZoomIn, ZoomOut } from 'lucide-react';

const Toolbar = ({ image, zoom, setZoom, onProcess, isProcessing, selectedFeature }) => {
  return (
    <div className="h-12 sm:h-14 bg-[#2b2b2b] border-b border-[#3a3a3a] flex items-center justify-between px-3 sm:px-5">
      {/* Left: Brand */}
      <div className="flex items-center gap-2 sm:gap-3">
        <h1 className="text-sm sm:text-base font-semibold text-[#e8e8e8] tracking-tight">
          ImagePro
        </h1>
        <div className="hidden sm:block h-4 w-px bg-[#4a4a4a]"></div>
        <span className="hidden sm:inline text-xs text-[#9a9a9a]">Image Editor</span>
      </div>

      {/* Center: Zoom Controls */}
      {image && (
        <div className="flex items-center gap-0.5 sm:gap-1 bg-[#232323] rounded-md px-1.5 sm:px-2 py-1">
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            className="p-1 hover:bg-[#333] rounded touch-manipulation"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 text-[#b0b0b0]" />
          </button>
          <span className="text-xs font-medium text-[#d0d0d0] min-w-[35px] sm:min-w-[45px] text-center px-1 sm:px-2">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            className="p-1 hover:bg-[#333] rounded touch-manipulation"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#b0b0b0]" />
          </button>
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {image && selectedFeature && (
          <button
            onClick={onProcess}
            disabled={isProcessing}
            className={`
              flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium
              transition-all touch-manipulation
              ${isProcessing
                ? 'bg-[#3a3a3a] text-[#7a7a7a] cursor-not-allowed'
                : 'bg-[#0066ff] text-white hover:bg-[#0052cc] active:bg-[#0047b3]'
              }
            `}
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#7a7a7a] border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden xs:inline">Processing</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Export</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
