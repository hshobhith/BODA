import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import Quagga from 'quagga';

interface BarcodeScannerProps {
  onClose: () => void;
  onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onClose, onScan }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const stopCamera = () => {
    try {
      Quagga.stop();
      // Get all video tracks and stop them
      const videoTracks = document.querySelectorAll('video');
      videoTracks.forEach(video => {
        if (video.srcObject) {
          const tracks = (video.srcObject as MediaStream).getTracks();
          tracks.forEach(track => track.stop());
        }
      });
    } catch (err) {
      console.error('Error stopping camera:', err);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current,
        constraints: {
          facingMode: "environment",
          aspectRatio: { min: 1, max: 2 }
        },
      },
      decoder: {
        readers: [
          "ean_reader",
          "ean_8_reader",
          "upc_reader",
          "upc_e_reader",
          "code_128_reader",
          "code_39_reader",
          "code_93_reader"
        ]
      },
      locate: true
    }, function(err) {
      if (err) {
        setError(err.message);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      setIsScanning(false);
      onScan(code);
      stopCamera();
    });

    return () => {
      stopCamera();
    };
  }, [onScan]);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Scan Barcode</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error ? (
          <div className="text-red-600 mb-4">{error}</div>
        ) : (
          <div className="relative">
            <div ref={videoRef} className="w-full h-64" />
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-lg pointer-events-none" />
          </div>
        )}

        <div className="mt-4 text-center text-gray-600">
          {isScanning ? 'Position the barcode within the frame' : 'Barcode detected!'}
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner; 