export default function CoinSvg({ empty, ...props }) {
  return (
    <svg width="30" height="30" viewBox="0 0 260 260" {...props}>
      <defs>
        <mask id="coinMask">
          <rect width="100%" height="100%" fill="white" />
          <circle cx="45" cy="45" r="35" fill="black" />
        </mask>
      </defs>
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <circle
          cx="45"
          cy="45"
          r="45"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: empty ? "black" : "rgb(255,200,67)",
            fillRule: "nonzero",
            opacity: empty ? 0.2 : 1,
          }}
          mask="url(#coinMask)"
          transform="matrix(1 0 0 1 0 0)"
        />
        <circle
          cx="45"
          cy="45"
          r="35"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: empty ? "black" : "rgb(211,135,0)",
            fillRule: "nonzero",
            opacity: empty ? 0 : 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
        />
        <path
          d="M 46.524 26.367 l 5.019 10.169 c 0.248 0.501 0.726 0.849 1.279 0.93 l 11.222 1.631 c 1.394 0.203 1.95 1.915 0.942 2.898 l -8.12 7.915 c -0.4 0.39 -0.583 0.953 -0.489 1.504 l 1.917 11.176 c 0.238 1.388 -1.219 2.447 -2.465 1.791 l -10.037 -5.277 c -0.495 -0.26 -1.086 -0.26 -1.581 0 l -10.037 5.277 c -1.247 0.655 -2.703 -0.403 -2.465 -1.791 l 1.917 -11.176 c 0.095 -0.551 -0.088 -1.114 -0.489 -1.504 l -8.12 -7.915 c -1.008 -0.983 -0.452 -2.696 0.942 -2.898 l 11.222 -1.631 c 0.553 -0.08 1.032 -0.428 1.279 -0.93 l 5.019 -10.169 C 44.1 25.104 45.9 25.104 46.524 26.367 z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: empty ? "black" : "rgb(255,200,67)",
            fillRule: "nonzero",
            opacity: empty ? 0.2 : 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
