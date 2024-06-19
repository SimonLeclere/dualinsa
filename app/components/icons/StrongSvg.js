export default function StrongSvg({unlocked =false}) {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      <g clipPath="url(#clip0_334_225119)">
        <line
          x1="16"
          y1="20.3246"
          x2="24.7589"
          y2="15.2676"
          stroke="white"
          strokeWidth="4"
        ></line>
        <rect
          x="17.7635"
          y="3.66309"
          width="9.1025"
          height="26.2961"
          rx="4.55125"
          transform="rotate(-30 17.7635 3.66309)"
          fill = {unlocked == true ? "black" : "#b7b7b7"}
          fillOpacity={unlocked == true ? "0.2" : "1"}
        ></rect>
        <rect
          x="2.87354"
          y="12.2598"
          width="9.1025"
          height="26.2961"
          rx="4.55125"
          transform="rotate(-30 2.87354 12.2598)"
          fill = {unlocked == true ? "black" : "#b7b7b7"}
          fillOpacity={unlocked == true ? "0.2" : "1"}
        ></rect>
        <rect
          x="25.9184"
          y="3.62891"
          width="9.1025"
          height="18.205"
          rx="4.55125"
          transform="rotate(-30 25.9184 3.62891)"
          fill = {unlocked == true ? "black" : "#b7b7b7"}
          fillOpacity={unlocked == true ? "0.2" : "1"}
        ></rect>
        <rect
          x="-1.23499"
          y="19.3027"
          width="9.1025"
          height="18.205"
          rx="4.55125"
          transform="rotate(-30 -1.23499 19.3027)"
          fill = {unlocked == true ? "black" : "#b7b7b7"}
          fillOpacity={unlocked == true ? "0.2" : "1"}
        ></rect>
        <rect
          opacity="0.2"
          x="2.81079"
          y="20.3145"
          width="3.03417"
          height="5.05694"
          rx="1.51708"
          transform="rotate(-30 2.81079 20.3145)"
          fill="white"
        ></rect>
        <rect
          opacity="0.2"
          x="31.1294"
          y="5.14355"
          width="3.03417"
          height="5.05694"
          rx="1.51708"
          transform="rotate(-30 31.1294 5.14355)"
          fill="white"
        ></rect>
        <rect
          opacity="0.2"
          x="6.85596"
          y="13.2354"
          width="3.03417"
          height="6.06833"
          rx="1.51708"
          transform="rotate(-30 6.85596 13.2354)"
          fill="white"
        ></rect>
        <rect
          opacity="0.2"
          x="22.0269"
          y="5.14355"
          width="3.03417"
          height="6.06833"
          rx="1.51708"
          transform="rotate(-30 22.0269 5.14355)"
          fill="white"
        ></rect>
      </g>
      <defs>
        <clipPath id="clip0_334_225119">
          <rect width="42" height="34" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
