export default function ChevronSvg({ direction = "left", ...props }) {

  if (direction === "left") {
    return (
      <svg height="40" viewBox="0 96 960 960" width="40">
        <path
          fill="currentColor"
          d="M560.667 822.377 313.623 575.333 560.667 328.29l53.71 53.71-193.334 193.333 193.334 193.334-53.71 53.71Z"
        />
      </svg>
    )
  }

  return (
    <svg height="40" viewBox="0 96 960 960" width="40">
      <path
        fill="currentColor"
        d="m375.333 822.377-53.71-53.71 193.334-193.334L321.623 382l53.71-53.71 247.044 247.043-247.044 247.044Z"
      />
    </svg>
  )

};
