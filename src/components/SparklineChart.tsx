import { useEffect, useRef } from 'react';

interface SparklineChartProps {
  data: number[];
  className?: string;
}

export const SparklineChart = ({ data, className = '' }: SparklineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length < 2) return;

    const svg = svgRef.current;
    const width = 64;
    const height = 32;
    const padding = 2;

    // Clear previous content
    svg.innerHTML = '';

    // Calculate dimensions
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find min and max values
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    // Create path
    const pathData = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Create path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', 'hsl(var(--faps-chart))');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.classList.add('animate-sparkline');

    svg.appendChild(path);
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width="64"
      height="32"
      viewBox="0 0 64 32"
      className={`${className}`}
    />
  );
};