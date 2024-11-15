import React from 'react';
import { Box } from '@mui/material';

interface SegmentedProgressBarProps {
  progress: number;
}

export const SegmentedProgressBar = ({
  progress,
}: SegmentedProgressBarProps) => {
  const size = 200;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size}>
        {/* Background Circle (Gray) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle (Green) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4CAF50"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round" // Rounded edges for the progress line
          style={{
            transition: 'stroke-dashoffset 0.35s', // Smooth transition
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          textAlign: 'center',
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {progress >= 100 ? 'Your plate is balanced' : `Progress: ${progress}%`}
      </Box>
    </Box>
  );
};
