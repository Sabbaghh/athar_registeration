'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface BadgeDisplayProps {
  email: string;
}

export function BadgeDisplay({ email }: BadgeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, email, {
        width: 280,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
    }
  }, [email]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <p className="text-white text-3xl uppercase tracking-wider mb-4">
          SCAN QR TO REGISTER
        </p>
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
