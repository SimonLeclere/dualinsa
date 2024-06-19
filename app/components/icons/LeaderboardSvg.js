import { DataLeague } from "./DataLeague";

export default function LeaderboardSvg() {
  return (
    <svg width="50" height="50" viewBox="0 0 46 46" fill="none">
      <path
        d="M7 9.5C7 7.84314 8.34315 6.5 10 6.5H36C37.6569 6.5 39 7.84315 39 9.5V23.5C39 32.3366 31.8366 39.5 23 39.5C14.1634 39.5 7 32.3366 7 23.5V9.5Z"
        fill="#FEC701"
      />
      <path
        opacity="0.3"
        d="M39.0001 13.3455V9.5C39.0001 7.84315 37.657 6.5 36.0001 6.5H31.5706L8.30957 29.8497C9.68623 33.0304 12.0656 35.6759 15.0491 37.3877L39.0001 13.3455Z"
        fill="white"
      />
    </svg>
  );
}

const leaguesName = ["Bronze", "Silver", "Gold", "Diamond"];

export const IconLeagueSvg = ({ leagueName, plume, lock, ...props }) => {
  if (!leaguesName.includes(leagueName)) {
    lock = true;
  }

  if (lock) {
    return (
      <svg width="53" height="59" viewBox="0 0 53 59" {...props}>
        <title>Locked</title>
        <g fill="none" fillRule="evenodd">
          <g fillRule="nonzero">
            <path
              d="M9.021 3.404H43.98c4.98 0 9.02 4.064 9.02 9.076v21.557C53 47.824 41.893 59 28.191 59H24.81C11.107 59 0 47.824 0 34.038V12.481c0-5.013 4.039-9.077 9.021-9.077z"
              fill="#E3E3E3"
            />
            <path
              d="M9.021 3.404H43.98c4.98 0 9.02 4.064 9.02 9.076v14.182c0 12.846-10.35 23.26-23.117 23.26h-6.766C10.35 49.923 0 39.51 0 26.663V12.481c0-5.013 4.039-9.077 9.021-9.077z"
              fill="#E5E5E5"
            />
            <path
              d="M9.021 5.673c-1.868 0-3.383 1.524-3.383 3.404v21.558c0 10.652 8.583 19.288 19.17 19.288h3.383c10.588 0 19.17-8.636 19.17-19.288V9.077c0-1.88-1.514-3.404-3.382-3.404H9.02zm0-5.673H43.98C48.96 0 53 4.064 53 9.077v21.558c0 13.785-11.107 24.961-24.809 24.961H24.81C11.107 55.596 0 44.42 0 30.635V9.077C0 4.064 4.039 0 9.021 0z"
              fill="#EFEFEF"
            />
          </g>
          <g transform="translate(18.014 15.177)" fill="#CFCFCF" opacity=".8">
            <ellipse cx="8.618" cy="8.002" rx="8.348" ry="7.998" />
            <path d="M4.967 11.71c2.016-3.863 5.285-3.864 7.3 0l3.013 5.771c2.016 3.863.116 6.995-4.235 6.995H6.19c-4.355 0-6.251-3.132-4.235-6.995l3.011-5.771z" />
          </g>
        </g>
      </svg>
    );
  }

  // else
  return (
    <svg width="53" height="59" viewBox="0 0 53 59" {...props}>
      <title>{DataLeague[leagueName]?.name || ""}</title>
      <g fill="none">
        <path
          d="M9.021 3.404H43.98c4.98 0 9.02 4.064 9.02 9.076v21.557C53 47.824 41.893 59 28.191 59H24.81C11.107 59 0 47.824 0 34.038V12.481c0-5.013 4.039-9.077 9.021-9.077z"
          fill={DataLeague[leagueName]?.color || ""}
        />
        <path
          d="M9.021 3.404H43.98c4.98 0 9.02 4.064 9.02 9.076v14.182c0 12.846-10.35 23.26-23.117 23.26h-6.766C10.35 49.923 0 39.51 0 26.663V12.481c0-5.013 4.039-9.077 9.021-9.077z"
          fill={DataLeague[leagueName]?.color2 || ""}
        />
        <path
          d="M32.442 3.404H43.98c4.98 0 9.02 4.064 9.02 9.076v5.54L14.505 56.751A24.97 24.97 0 0 1 .073 35.972l32.37-32.568z"
          fill={DataLeague[leagueName]?.color3 || ""}
        />
        <path
          d="M32.442 3.404H43.98c4.98 0 9.02 4.064 9.02 9.076v5.54L18.916 52.313c-5.694-2.018-9.456-4.127-11.285-6.325-1.828-2.199-3.395-6.496-4.7-12.892L32.442 3.404z"
          fill={DataLeague[leagueName]?.color4 || ""}
        />
        <path
          d="M9.021 5.673c-1.868 0-3.383 1.524-3.383 3.404v21.558c0 10.652 8.583 19.288 19.17 19.288h3.383c10.588 0 19.17-8.636 19.17-19.288V9.077c0-1.88-1.514-3.404-3.382-3.404H9.02zm0-5.673H43.98C48.96 0 53 4.064 53 9.077v21.558c0 13.785-11.107 24.961-24.809 24.961H24.81C11.107 55.596 0 44.42 0 30.635V9.077C0 4.064 4.039 0 9.021 0z"
          fill={DataLeague[leagueName]?.color5 || ""}
        />
        <path
          d="M5.638 30.373v.262c0 9.54 6.885 17.463 15.928 19.013l-4.635 4.664C8.598 51.506 2.235 44.37.483 35.56l5.155-5.187zm41.724-6.68V9.077c0-1.88-1.515-3.404-3.383-3.404H30.187L35.825 0h8.154C48.96 0 53 4.064 53 9.077v8.943l-5.638 5.673z"
          fill={DataLeague[leagueName]?.color6 || ""}
        />
        {plume && (
          <>
            <path
              d="M25.223 16.742l3.282-3.282c2.996-2.996 7.942-2.908 11.047.197 3.105 3.105 3.193 8.05.197 11.047l-8.293 8.293a1.453 1.453 0 0 1-1.066.425l-4.227-.11a.298.298 0 0 0-.219.086.308.308 0 0 0 .008.436l1.82 1.82a.727.727 0 0 1 0 1.027l-1.467 1.467A3.2 3.2 0 0 1 23.38 39l-7.595-1.577-1.577-7.596a3.2 3.2 0 0 1 .853-2.924l6.486-6.486a.727.727 0 0 1 1.028 0l1.81 1.81a.308.308 0 0 0 .436.008.298.298 0 0 0 .087-.219l-.11-4.21c-.01-.398.143-.783.425-1.065z"
              fill={DataLeague[leagueName]?.color7 || ""}
            />
            <path
              d="M32.414 20.95L13.363 40"
              stroke={DataLeague[leagueName]?.color8 || ""}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
      </g>
    </svg>
  );
};

export const LeaderboardBannerSvg = (props) => {
  return (
    <svg width="267" height="169" viewBox="0 0 267 169" {...props}>
      <title>Locked Tab NEW</title>
      <g fill="none" fillRule="nonzero">
        <path
          d="M7.315 72.39L51.1 47.11c6.801-3.927 15.498-1.596 19.425 5.205l19.22 33.29c10.035 17.381 4.08 39.606-13.301 49.641l-5.474 3.16c-17.38 10.035-39.606 4.08-49.641-13.301L2.11 91.815C-1.817 85.014.514 76.317 7.315 72.39z"
          fill="#CF9C6D"
        />
        <path
          d="M40.982 52.952l10.107-5.835c6.801-3.927 15.513-1.57 19.459 5.264l6.886 11.927-20.772 78.763c-13.55 1.423-27.327-4.898-34.904-17.225l19.224-72.894z"
          fill="#D3A67B"
        />
        <path
          d="M17.851 119.08c8.322 8.055 15.466 12.5 21.433 13.334 5.967.836 16.329-1.16 31.087-5.984 8.374-8.526 13.465-15.453 15.273-20.782 1.808-5.328 2.016-14.017.623-26.068l3.479 6.025c10.035 17.381 4.08 39.606-13.301 49.641l-5.474 3.16c-17.38 10.035-39.606 4.08-49.641-13.301l-3.479-6.025z"
          fill="#C88E57"
        />
        <path
          d="M22.483 123.294c6.372 5.404 11.972 8.445 16.8 9.12 4.503.63 11.51-.35 21.018-2.944l-3.588 13.603c-13.582 1.463-27.379-4.842-34.915-17.18l.685-2.6z"
          fill="#CD9968"
        />
        <path
          d="M11.182 79.917a5.374 5.374 0 0 0-1.96 7.343l16.905 29.28c7.426 12.862 23.855 17.28 36.695 9.868l7.306-4.219c12.84-7.413 17.228-23.85 9.802-36.713l-16.905-29.28a5.374 5.374 0 0 0-7.339-1.973L11.182 79.917zm-4.226-7.32L51.46 46.903c6.603-3.812 15.052-1.54 18.872 5.075l16.904 29.28c9.76 16.906 3.993 38.508-12.881 48.251l-7.307 4.219c-16.875 9.742-38.467 3.936-48.228-12.97L1.916 91.478c-3.82-6.615-1.563-15.069 5.04-18.88z"
          fill="#E5AE7C"
        />
        <path
          d="M24.849 114.325l1.278 2.214c7.048 12.208 22.205 16.81 34.707 10.91l-2.61 9.893c-13.24 3.418-27.53-1.18-36.275-12.02l2.9-10.997zM74.42 75.933L63.025 56.197a5.374 5.374 0 0 0-7.339-1.974L38.008 64.429l3.036-11.512 10.416-6.014c6.603-3.812 15.052-1.54 18.872 5.075l7.143 12.373-3.055 11.582z"
          fill="#E7B689"
        />
        <g>
          <path
            d="M215.815 47.11L259.6 72.39c6.801 3.927 9.132 12.624 5.205 19.425l-19.22 33.29c-10.035 17.381-32.26 23.336-49.641 13.301l-5.474-3.16c-17.38-10.035-23.336-32.26-13.301-49.641l19.22-33.29c3.927-6.801 12.624-9.132 19.425-5.205z"
            fill="#C2D1DD"
          />
          <path
            d="M249.482 66.548l10.107 5.835c6.801 3.927 9.116 12.65 5.17 19.484l-6.885 11.927-78.597 21.392c-8.008-11.024-9.422-26.114-2.535-38.84l72.74-19.798z"
            fill="#D1DCE5"
          />
          <path
            d="M180.649 79.58c-2.815 11.234-3.093 19.643-.832 25.228 2.26 5.585 9.169 13.562 20.726 23.93 11.57 2.99 20.115 3.935 25.634 2.836 5.518-1.098 13.147-5.263 22.888-12.494l-3.479 6.025c-10.035 17.381-32.26 23.336-49.641 13.301l-5.474-3.16c-17.38-10.035-23.336-32.26-13.301-49.641l3.479-6.025z"
            fill="#AAC1D4"
          />
          <path
            d="M179.315 85.698c-1.495 8.22-1.328 14.59.502 19.11 1.705 4.215 6.058 9.791 13.058 16.73l-13.574 3.694c-8.058-11.031-9.496-26.132-2.58-38.828l2.594-.706z"
            fill="#BFD0DE"
          />
          <path
            d="M211.23 54.223a5.374 5.374 0 0 0-7.339 1.974l-16.905 29.28c-7.426 12.862-3.038 29.3 9.802 36.712l7.306 4.219c12.84 7.413 29.269 2.994 36.695-9.869l16.905-29.28a5.374 5.374 0 0 0-1.96-7.342L211.23 54.223zm4.226-7.32l44.504 25.694c6.603 3.812 8.86 12.266 5.04 18.881l-16.904 29.28c-9.76 16.906-31.353 22.712-48.228 12.97l-7.307-4.219c-16.874-9.743-22.642-31.345-12.881-48.251l16.904-29.28c3.82-6.615 12.269-8.887 18.872-5.075z"
            fill="#D6E4EF"
          />
          <path
            d="M188.265 83.262l-1.279 2.214c-7.048 12.208-3.454 27.636 7.906 35.512l-9.872 2.687c-9.581-9.758-12.745-24.433-7.729-37.426l10.974-2.987zm58.034 23.734l11.395-19.736a5.374 5.374 0 0 0-1.96-7.343L238.055 69.71l11.489-3.127 10.416 6.014c6.603 3.812 8.86 12.266 5.04 18.881l-7.143 12.373-11.558 3.145z"
            fill="#E0EAF3"
          />
        </g>
        <rect
          fill="#FFF1BF"
          transform="rotate(45 85.728 11.728)"
          x="76.728"
          y="2.728"
          width="18"
          height="18"
          rx="5"
        />
        <rect
          fill="#FEE68C"
          transform="rotate(45 71 29.757)"
          x="65"
          y="23.757"
          width="12"
          height="12"
          rx="2"
        />
        <rect
          fill="#FFF1BF"
          transform="rotate(45 184.728 157.728)"
          x="175.728"
          y="148.728"
          width="18"
          height="18"
          rx="5"
        />
        <g>
          <path
            d="M100.54 35h65.92C176.7 35 185 43.3 185 53.54v49.08c0 26.167-21.213 47.38-47.38 47.38h-8.24C103.213 150 82 128.787 82 102.62V53.54C82 43.3 90.3 35 100.54 35z"
            fill="#FEC701"
          />
          <path
            d="M151.226 35h15.216c10.239 0 18.54 8.266 18.54 18.462v17.796l-74.8 74.717C93.954 138.812 82.52 122.839 82 104.15L151.226 35z"
            fill="#FED540"
          />
          <path
            d="M130.798 67.728l6.688-6.688c5.81-5.81 15.426-5.612 21.479.441 6.053 6.053 6.25 15.67.441 21.479l-16.404 16.405c-.34.34-.805.524-1.285.51l-8.68-.25a.576.576 0 0 0-.425.166.6.6 0 0 0 .018.848l3.932 3.932c.34.34.34.893 0 1.234l-3.224 3.223c-1.466 1.466-3.594 2.081-5.682 1.643l-14.775-3.106-3.106-14.775c-.438-2.089.177-4.216 1.643-5.682l12.956-12.956a.872.872 0 0 1 1.234 0l3.915 3.915a.6.6 0 0 0 .847.017.576.576 0 0 0 .167-.425l-.25-8.647c-.013-.48.171-.945.51-1.284z"
            fill="#F89701"
          />
          <path
            d="M145.125 75.622l-36.94 36.94"
            stroke="#ED8200"
            strokeWidth="4.292"
            strokeLinecap="round"
          />
          <path
            d="M82 94.054c4.145 14.39 9.314 23.98 15.507 28.769 6.193 4.79 19.194 9.252 39.003 13.387 15.013-4.13 25.277-8.593 30.792-13.387 5.515-4.795 11.414-14.384 17.698-28.769v8.566c0 26.167-21.213 47.38-47.38 47.38h-8.24C103.213 150 82 128.787 82 102.62v-8.566z"
            fill="#FFC100"
          />
          <path
            d="M84.483 101.762c3.67 10.164 8.012 17.185 13.024 21.06 4.673 3.615 13.223 7.043 25.65 10.285l-12.893 12.879c-16.187-7.146-27.62-23.09-28.238-41.77l2.457-2.454z"
            fill="#FFD040"
          />
          <path
            d="M100 45.922c-3.866 0-7 3.111-7 6.95v43.686c0 19.192 15.67 34.75 35 34.75h11c19.33 0 35-15.558 35-34.75V52.872c0-3.839-3.134-6.95-7-6.95h-67zM100 35h67c9.941 0 18 8.001 18 17.872v43.686c0 25.224-20.595 45.672-46 45.672h-11c-25.405 0-46-20.448-46-45.672V52.872C82 43.002 90.059 35 100 35z"
            fill="#FEE333"
          />
          <path
            d="M93 93.255v3.303c0 18.215 14.115 33.156 32.077 34.63l-9.395 9.386c-17.18-4.73-30.318-19.107-33.125-36.888L93 93.255zm81-10.935V52.872c0-3.839-3.134-6.95-7-6.95h-26.615L151.32 35H167c9.941 0 18 8.001 18 17.872v18.46L174 82.32z"
            fill="#FEEA66"
          />
        </g>
      </g>
    </svg>
  );
};

export const LeaderboardExplanationSvg = () => {
  return (
    <svg
      width="107"
      height="158"
      viewBox="0 0 107 158"
      fill="none"
      className="absolute right-0"
    >
      <path
        d="M28.4774 76.1387L39.0343 77.7164C40.2236 77.8941 41.2935 78.537 42.0087 79.5036L48.3579 88.084C49.0731 89.0506 49.3751 90.2617 49.1974 91.4509L47.6196 102.008C47.4419 103.197 46.799 104.267 45.8325 104.982L37.252 111.331C36.2854 112.047 35.0743 112.349 33.8851 112.171L23.3282 110.593C22.139 110.415 21.0691 109.773 20.3539 108.806L14.0046 100.225C13.2894 99.2589 12.9874 98.0478 13.1652 96.8586L14.7429 86.3017C14.9206 85.1125 15.5635 84.0426 16.5301 83.3273L25.1106 76.9781C26.0771 76.2629 27.2882 75.9609 28.4774 76.1387Z"
        fill="#676767"
      />
      <path
        d="M35.5968 104.884L82.544 74.3263C85.0604 72.6884 88.4302 73.9744 89.199 76.8659C92.8933 90.7588 87.1614 105.744 74.758 113.817C62.355 121.89 46.3649 121.044 35.2048 112.01C32.8819 110.13 33.0804 106.522 35.5968 104.884Z"
        fill="#58CC02"
      />
      <path
        d="M65.0387 90.1495C62.2153 83.8079 54.7855 80.9559 48.4439 83.7794C42.1023 86.6028 39.2503 94.0326 42.0738 100.374C44.8972 106.716 52.327 109.568 58.6686 106.744C65.0102 103.921 67.8622 96.4911 65.0387 90.1495Z"
        fill="#58CC02"
      />
      <path
        d="M26.3758 80.8707L37.4213 82.5215C38.6731 82.7086 39.7993 83.3853 40.5522 84.4027L47.1953 93.3804C47.9482 94.3978 48.266 95.6727 48.0789 96.9245L46.4282 107.97C46.2411 109.222 45.5644 110.348 44.547 111.101L35.5693 117.744C34.5519 118.497 33.277 118.815 32.0252 118.628L20.9797 116.977C19.7279 116.79 18.6017 116.113 17.8488 115.096L11.2057 106.118C10.4528 105.101 10.135 103.826 10.322 102.574L11.9728 91.5284C12.1599 90.2766 12.8366 89.1503 13.854 88.3975L22.8317 81.7544C23.8491 81.0015 25.124 80.6836 26.3758 80.8707Z"
        fill="#7B7B7B"
      />
      <path
        d="M28.3146 88.6502L33.2912 89.394C34.543 89.5811 35.6692 90.2578 36.4221 91.2752L39.4152 95.3201C40.168 96.3376 40.4859 97.6124 40.2988 98.8642L39.555 103.841C39.368 105.093 38.6913 106.219 37.6738 106.972L33.6289 109.965C32.6115 110.718 31.3366 111.035 30.0848 110.848L25.1083 110.105C23.8565 109.918 22.7302 109.241 21.9774 108.223L18.9843 104.178C18.2314 103.161 17.9136 101.886 18.1007 100.634L18.8444 95.6578C19.0315 94.406 19.7082 93.2798 20.7257 92.5269L24.7705 89.5339C25.788 88.781 27.0628 88.4632 28.3146 88.6502Z"
        fill="#676767"
      />
      <path
        opacity="0.742327"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.6719 105.685C51.5418 105.048 51.9532 104.425 52.5908 104.295C54.2932 103.948 55.6453 103.259 56.6973 102.257C57.7525 101.253 58.563 99.8788 59.0923 98.0758C59.2757 97.4513 59.9305 97.0938 60.5549 97.2771C61.1794 97.4604 61.5369 98.1153 61.3536 98.7397C60.731 100.86 59.7327 102.622 58.3224 103.964C56.9088 105.31 55.1387 106.181 53.062 106.604C52.4244 106.734 51.802 106.323 51.6719 105.685Z"
        fill="#3EB200"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.0711 60.8664L78.1952 59.9883C78.8161 59.5032 79.7128 59.6132 80.1975 60.2343C80.6828 60.855 80.5726 61.7517 79.9518 62.2366L78.8277 63.1148C78.2069 63.5999 77.3103 63.4898 76.8252 62.8689C76.3402 62.2481 76.4503 61.3515 77.0711 60.8664Z"
        fill="#FFEB16"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M91.4711 66.3025L93.4179 43.6452C93.7085 40.2588 96.69 37.7489 100.076 38.0402C100.083 38.0405 100.089 38.0412 100.096 38.0415L128.299 40.5536C131.677 40.8546 134.175 43.8317 133.885 47.2111L131.939 69.8679C131.648 73.2549 128.666 75.7647 125.28 75.4732C125.273 75.4731 125.267 75.4721 125.261 75.4715L97.0578 72.9595C93.6791 72.6588 91.181 69.6816 91.4711 66.3025Z"
        fill="#58CC02"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.8038 47.2176C53.9317 44.4982 60.4074 42.0357 63.2308 39.8299C66.0358 37.6385 69.9254 32.0376 74.9005 23.0264C78.2567 16.9474 85.9057 14.7399 91.9848 18.0961C93.4685 18.9156 94.7715 20.0266 95.8155 21.3622L119.704 51.9375C132.351 68.1227 129.482 91.4947 113.296 104.14L113.294 104.142C97.1077 116.787 73.7346 113.918 61.0881 97.7316L37.1566 67.1019C32.8813 61.63 33.8513 53.7283 39.3232 49.4531C40.6518 48.4151 42.1755 47.6549 43.8038 47.2176Z"
        fill="#58CC02"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.4717 50.6598C67.9645 51.6211 73.3637 47.3799 73.7026 41.8626C79.6526 49.4778 86.7194 58.5229 86.6746 58.4656C86.6449 58.4273 82.8978 61.3547 75.4327 67.2483C72.2643 63.2522 67.944 57.7227 62.4717 50.6598Z"
        fill="#89E219"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50.9672 54.0533L51.7253 53.4611C57.8004 48.7159 66.5721 49.793 71.3187 55.8669L76.8327 62.9241C81.5796 68.9983 80.5028 77.7704 74.4281 82.5167L74.4271 82.5165L73.6691 83.1087C67.594 87.8539 58.8223 86.7769 54.0757 80.7029L48.5616 73.6457C43.8148 67.5716 44.8916 58.7995 50.9662 54.0532L50.9672 54.0533Z"
        fill="#89E219"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79.061 31.7341L79.8182 31.1424C85.8935 26.3972 94.6649 27.4744 99.4116 33.5483L104.926 40.6053C109.673 46.6794 108.596 55.4515 102.521 60.1977L102.52 60.1979L101.817 60.7468C95.7768 65.4659 87.0605 64.4307 82.2934 58.4275L76.7233 51.4141C71.9292 45.3771 72.937 36.5967 78.9739 31.8027C79.0032 31.7795 79.032 31.7567 79.061 31.7341Z"
        fill="#89E219"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.2441 58.1777C58.6875 54.7062 65.1037 55.4941 68.5754 59.9373L72.3994 64.8316C75.8708 69.2745 75.0832 75.6904 70.6402 79.1618C70.6404 79.1616 70.6401 79.1619 70.6402 79.1618C66.1968 82.6332 59.7801 81.8457 56.3085 77.4024L52.4845 72.5082C49.0131 68.0653 49.8011 61.6491 54.2441 58.1777C54.2442 58.1775 54.2439 58.1778 54.2441 58.1777Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.7489 35.9094C87.1923 32.4381 93.6085 33.2259 97.0803 37.669L100.904 42.5635C104.376 47.0063 103.588 53.4224 99.1452 56.8935C94.7018 60.3648 88.2851 59.5774 84.8132 55.1344L80.989 50.2403C77.5179 45.7971 78.3058 39.381 82.7489 35.9094Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M94.1297 33.8287L79.0585 49.1163L78.6235 48.559C75.0043 43.927 75.8252 37.2384 80.4572 33.6192L82.0824 32.3496C85.8179 29.4313 91.2114 30.0936 94.1297 33.8287Z"
        fill="#89E219"
      />
      <path
        d="M86.3156 50.899C86.8153 50.631 87.2435 50.2173 87.5295 49.6794C88.2991 48.2319 87.7478 46.433 86.2972 45.662C85.8949 45.4481 85.4657 45.3357 85.0391 45.3159C85.3458 44.5681 85.8453 43.8874 86.5278 43.3541C88.6224 41.7177 91.6477 42.0887 93.284 44.1835L96.5463 48.3585C98.1831 50.453 97.8119 53.4776 95.7168 55.1145C93.6223 56.7509 90.5976 56.3796 88.9607 54.285L86.3156 50.899Z"
        fill="#4B4B4B"
      />
      <path
        d="M60.3309 71.18C61.0769 70.9655 61.7379 70.4609 62.1307 69.7222C62.9004 68.2746 62.3485 66.4761 60.8982 65.7049C60.3464 65.4115 59.7441 65.3091 59.1672 65.3746C59.4778 64.7189 59.942 64.1237 60.5527 63.6466C62.6474 62.01 65.6723 62.3813 67.3089 64.476L70.571 68.6511C72.2076 70.7456 71.8363 73.7704 69.7417 75.4069C67.647 77.0435 64.6222 76.6722 62.9855 74.5775L60.3309 71.18Z"
        fill="#4B4B4B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102.73 55.7126L95.2132 61.1744C92.8597 62.8843 89.566 62.3624 87.8561 60.0089L85.6196 56.9312L102.307 41.1894L104.543 44.267C107.203 47.9284 106.391 53.0527 102.73 55.7126Z"
        fill="#89E219"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.1516 61.641L90.8859 15.7553C91.5084 15.2689 92.3256 15.2737 92.7108 15.7661L97.8729 22.3732C98.2575 22.866 98.0647 23.6598 97.4415 24.1466L38.7077 70.0319C38.0849 70.5186 37.2678 70.5138 36.8829 70.0211L31.7208 63.4141C31.336 62.9214 31.5289 62.1276 32.1516 61.641Z"
        fill="#FF4B4B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.5034 65.07L94.1086 16.9414L96.6309 20.1699L35.0258 68.2984L32.5034 65.07Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M68.8338 83.9143L76.1556 78.1943C78.448 76.4033 78.8545 73.0931 77.0636 70.8006L74.7213 67.8027L54.9897 79.5043L57.3319 82.5022C60.1181 86.0681 65.2676 86.7004 68.8338 83.9143Z"
        fill="#89E219"
      />
      <path
        d="M87.3574 90.2512L94.7318 84.4859C95.1268 84.1766 95.6929 84.3236 95.8498 84.7764C96.6029 86.9505 95.8217 89.4689 93.8735 90.9921C91.9249 92.5149 89.2943 92.6644 87.3687 91.4073C86.9676 91.1452 86.962 90.56 87.3574 90.2512Z"
        fill="#89E219"
      />
      <path
        d="M100.23 80.1943L107.604 74.4286C108 74.1195 108.565 74.2667 108.723 74.7194C109.475 76.893 108.694 79.4114 106.746 80.9346C104.798 82.4579 102.167 82.6069 100.241 81.3498C99.8401 81.0884 99.8346 80.5031 100.23 80.1943Z"
        fill="#89E219"
      />
      <path
        d="M98.6597 91.4492L106.034 85.6841C106.429 85.3744 106.995 85.5216 107.152 85.9743C107.905 88.1484 107.124 90.6668 105.176 92.19C103.227 93.7129 100.597 93.8624 98.671 92.6054C98.2699 92.3432 98.2643 91.758 98.6597 91.4492Z"
        fill="#89E219"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.514 58.902C80.9738 57.0514 84.4642 57.5402 86.3166 59.9941L87.2354 61.2111C87.2377 61.2142 87.24 61.2172 87.2424 61.2203C89.0845 63.6715 88.5891 67.1549 86.1361 69.0003C83.6764 70.8508 80.1857 70.3622 78.3335 67.9082L77.4148 66.6911C77.4125 66.6881 77.4102 66.685 77.4079 66.6819C75.5657 64.2307 76.0609 60.7475 78.514 58.902Z"
        fill="#F49000"
      />
      <path
        d="M88.2558 59.3135L88.5255 59.6702L83.1352 65.3697L76.1619 68.9717L75.8924 68.6147C74.2872 65.4099 75.2356 61.2725 78.1251 59.0987C81.3678 56.6592 85.613 56.8893 88.2558 59.3135Z"
        fill="#FFC200"
      />
      <path
        d="M81.3253 59.1262C81.9078 58.9484 82.525 59.2759 82.703 59.8583C82.8811 60.4408 82.5531 61.0574 81.97 61.2356C81.0627 61.5128 80.369 62.034 79.8517 62.827C79.5188 63.3373 78.835 63.4815 78.3244 63.149C77.8138 62.8166 77.6697 62.1334 78.0026 61.6231C78.8027 60.3965 79.9227 59.555 81.3253 59.1262Z"
        fill="#FFDE00"
      />
    </svg>
  );
};
