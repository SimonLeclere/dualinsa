export default function CheckmarkSvg({unlocked=false}) {
    return (
      <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
        <g clipPath="url(#clip0_7030_116512)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.5239 18.112L14.4053 13.9934C13.1459 12.734 11.104 12.734 9.84455 13.9934C8.58514 15.2528 8.58514 17.2947 9.84455 18.5541L16.1331 24.8427C16.7889 25.4985 17.6569 25.8128 18.5161 25.7856C19.3802 25.817 20.2545 25.5028 20.9142 24.8432L32.2521 13.5053C33.5115 12.2459 33.5115 10.204 32.2521 8.94456C30.9927 7.68515 28.9508 7.68515 27.6914 8.94456L18.5239 18.112Z"
            fill = {unlocked == true ? "white" : "#b7b7b7"}
          />
        </g>
        <defs>
          <clipPath id="clip0_7030_116512">
            <rect
              width="24.2966"
              height="17.7878"
              fill="white"
              transform="translate(8.89999 8)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };