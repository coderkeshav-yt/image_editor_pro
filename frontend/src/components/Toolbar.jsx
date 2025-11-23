import { Download, ZoomIn, ZoomOut } from 'lucide-react';

const Toolbar = ({ image, zoom, setZoom, onProcess, isProcessing, selectedFeature }) => {
  return (
    <div className="h-14 bg-[#2b2b2b] border-b border-[#3a3a3a] flex items-center justify-between px-5">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-[#e8e8e8] tracking-tight">
          ImagePro
        </h1>
        <div className="h-4 w-px bg-[#4a4a4a]"></div>
        <span className="text-xs text-[#9a9a9a]">Image Editor</span>
      </div>

      {/* Center: Zoom Controls */}
      {image && (
        <div className="flex items-center gap-1 bg-[#232323] rounded-md px-2 py-1">
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            className="p-1 hover:bg-[#333] rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 text-[#b0b0b0]" />
          </button>
          <span className="text-xs font-medium text-[#d0d0d0] min-w-[45px] text-center px-2">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            className="p-1 hover:bg-[#333] rounded"
            title="Zoom In"
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
              flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium
              transition-all
              ${isProcessing
                ? 'bg-[#3a3a3a] text-[#7a7a7a] cursor-not-allowed'
                : 'bg-[#0066ff] text-white hover:bg-[#0052cc]'
              }
            `}
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#7a7a7a] border-t-transparent rounded-full animate-spin"></div>
                <span>Processing</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
