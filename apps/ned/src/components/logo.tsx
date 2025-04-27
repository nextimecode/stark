interface LogoProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export const Logo = ({
  width = 1885,
  height = 2319,
  fill = "white",
  className,
}: LogoProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 1885 2319"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M963.191 1232.63L947.807 2204.13L291.81 2160.64C254.318 2169.44 220.292 2189.2 194.064 2217.4C167.836 2245.6 150.593 2280.97 144.529 2319C140.121 2317.52 134.7 2315.89 128.571 2314.05C87.0723 2301.56 13.0935 2279.3 0.939841 2228.54C-13.0088 2173.36 132.631 2046.59 151.092 2034.07C145.977 2002.43 150.315 1969.98 163.56 1940.79C176.806 1911.59 198.371 1886.96 225.554 1869.97L568.937 1549.56L562.783 1126.37L1767.9 0L1760.32 476.518L963.191 1232.63ZM1483.21 1237.74L1002.8 1692.1L1014.7 1248.61L1466.59 826.864L1483.21 1237.74ZM1884.66 1332.93L994.821 2193.04L1006.31 1761.86L1868.66 938.668L1884.66 1332.93Z"
        fill={fill}
      />
    </svg>
  );
};
