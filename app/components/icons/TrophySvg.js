export default function TrophySvg({ unlocked = false, ...props }) {
    return (
      <svg width="105" height="89" viewBox="0 0 105 89" fill="none" {...props}>
        <ellipse
          cx="52.5564"
          cy="67.7784"
          rx="22.4297"
          ry="20.3697"
          fill={unlocked == true ? "#FFB800" : "#AFAFAF"}
        ></ellipse>
        <ellipse
          cx="52.5564"
          cy="62.6959"
          rx="22.4297"
          ry="20.3697"
          fill={unlocked == true ? "#FFD600" : "#AFAFAF"}
        ></ellipse>
        <path
          d="M35.2837 71.8353C37.0692 74.9453 41.8904 78.7941 46.7356 80.0312"
          stroke={unlocked == true ? "#FFF500" : "#AFAFAF"}
          strokeWidth="4.6734"
          strokeLinecap="round"
        ></path>
        <path
          d="M40.97 69.3791C41.9876 71.1516 44.7353 73.3452 47.4968 74.0502"
          stroke={unlocked == true ? "#FFF500" : "#AFAFAF"}
          strokeWidth="4.6734"
          strokeLinecap="round"
        ></path>
        <path
          d="M68.2007 64.1053C68.2007 70.8805 61.5298 76.8096 52.7121 76.8096C43.8943 76.8096 37.2235 70.8805 37.2235 64.1053C37.2235 57.3301 43.8943 51.401 52.7121 51.401C61.5298 51.401 68.2007 57.3301 68.2007 64.1053Z"
          stroke={unlocked == true ? "#FFB800" : "#AFAFAF"}
          strokeWidth="3.01241"
        ></path>
        <path
          d="M17.3816 11.4355C17.3816 3.1568 26.1494 -2.27311 33.7815 0.934306C40.8985 3.92521 48.517 6.66357 52.5545 6.66357C56.5921 6.66357 64.2106 3.92521 71.3275 0.934308C78.9597 -2.27311 87.7275 3.1568 87.7275 11.4355V34.3697C87.7275 53.7952 71.98 69.5427 52.5545 69.5427C33.1291 69.5427 17.3816 53.7952 17.3816 34.3697V11.4355Z"
          fill={unlocked == true ? "#FFB800" : "#AFAFAF"}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M87.7275 21.0444C86.643 41.5035 69.7102 57.7589 48.9808 57.7589C36.5675 57.7589 25.5156 51.9298 18.4131 42.8596C17.7392 40.1407 17.3816 37.297 17.3816 34.3697V11.4355C17.3816 3.1568 26.1494 -2.27311 33.7815 0.934306C40.8985 3.92521 48.517 6.66357 52.5545 6.66357C56.5921 6.66357 64.2106 3.92521 71.3275 0.934308C78.9597 -2.27311 87.7275 3.1568 87.7275 11.4355V21.0444Z"
          fill={unlocked == true ? "#FFD600" : "#AFAFAF"}
        ></path>
        <circle
          cx="29.6788"
          cy="11.2542"
          r="6.94978"
          fill={unlocked == true ? "#FFF500" : "#AFAFAF"}
        ></circle>
        <path
          d="M58.7405 13.872C64.2067 12.9001 67.262 11.6908 71.377 9.41648"
          stroke={unlocked == true ? "#FFF500" : "#AFAFAF"}
          strokeWidth="9.29181"
          strokeLinecap="round"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.26014 26.1716C3.24474 25.897 2.19899 26.4976 1.92438 27.513L1.79236 28.0011C0.251515 33.6987 3.62117 39.5665 9.31868 41.1073L10.0909 41.3162C10.2291 42.5931 10.495 44.0908 10.9274 45.6959C8.28389 44.4473 5.14154 44.2821 2.23252 45.5002L1.16946 45.9454C0.199208 46.3516 -0.257982 47.4675 0.148295 48.4378L0.343623 48.9043C2.62328 54.3484 8.88469 56.9138 14.3289 54.6341L14.8702 54.4075C15.5961 55.4647 16.4218 56.4893 17.3585 57.4489C13.4278 57.8114 9.85 60.3467 8.3477 64.2837L7.93681 65.3604C7.5618 66.3432 8.05448 67.4439 9.03724 67.8189L9.50972 67.9992C15.0241 70.1034 21.2002 67.3389 23.3044 61.8246L23.7153 60.7478C23.9141 60.2269 23.869 59.6728 23.6364 59.2112C23.5574 58.8347 23.3276 58.4909 22.9715 58.2775C19.8938 56.4338 17.6739 53.7916 16.1067 50.9741C15.9303 50.5815 15.733 50.2045 15.5165 49.844C15.354 49.5123 15.2 49.1793 15.0541 48.8461C13.5172 45.3356 12.9251 41.8875 12.8428 39.7864L12.899 39.5787C14.4398 33.8812 11.0702 28.0133 5.37267 26.4725L4.26014 26.1716Z"
          fill={unlocked == true ? "#FFF500" : "#AFAFAF"}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.0225 25.7233C100.025 25.4034 101.096 25.9563 101.416 26.9583L101.57 27.4401C103.365 33.0626 100.263 39.076 94.6403 40.8713L93.9755 41.0836C93.8396 42.4669 93.5502 44.1295 93.0544 45.9174C95.7851 44.4706 99.1184 44.2137 102.191 45.5004L103.254 45.9456C104.225 46.3518 104.682 47.4677 104.275 48.438L104.08 48.9045C101.801 54.3486 95.5391 56.914 90.0949 54.6343L89.2569 54.2834C88.5047 55.3934 87.6435 56.469 86.6603 57.4731C90.4992 57.9122 93.9664 60.4245 95.439 64.2839L95.8499 65.3606C96.2249 66.3434 95.7323 67.4441 94.7495 67.8191L94.277 67.9994C88.7627 70.1036 82.5866 67.3391 80.4824 61.8248L80.0715 60.748C79.7439 59.8896 80.0784 58.9412 80.8232 58.465C80.8973 58.3952 80.98 58.3322 81.0709 58.2777C84.9149 55.9749 87.4209 52.4263 88.9882 48.8463C90.4535 45.4995 91.0599 42.2096 91.1846 40.0893C91.1718 40.0557 91.1598 40.0215 91.1487 39.9868L90.9949 39.5051C89.1996 33.8826 92.3021 27.8692 97.9246 26.0739L99.0225 25.7233Z"
          fill={unlocked == true ? "#FFF500" : "#AFAFAF"}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.26014 27.92C3.24474 27.6454 2.19899 28.246 1.92438 29.2614L1.79236 29.7495C0.251515 35.4471 3.62117 41.3149 9.31868 42.8558L10.0909 43.0646C10.2291 44.3415 10.495 45.8392 10.9274 47.4443C8.28389 46.1957 5.14154 46.0305 2.23252 47.2486L1.16946 47.6938C0.199208 48.1001 -0.257982 49.2159 0.148295 50.1862L0.343623 50.6527C2.62328 56.0968 8.88469 58.6622 14.3289 56.3825L14.8702 56.1559C15.5961 57.2131 16.4218 58.2377 17.3585 59.1973C13.4278 59.5598 9.85 62.0951 8.3477 66.0321L7.93681 67.1088C7.5618 68.0916 8.05448 69.1923 9.03724 69.5673L9.50972 69.7476C15.0241 71.8518 21.2002 69.0874 23.3044 63.573L23.7153 62.4962C23.9141 61.9753 23.869 61.4212 23.6364 60.9596C23.5574 60.5831 23.3276 60.2393 22.9715 60.026C19.8939 58.1822 17.6739 55.54 16.1067 52.7225C15.9303 52.3299 15.733 51.9529 15.5165 51.5924C15.354 51.2607 15.2 50.9277 15.0541 50.5945C13.5172 47.084 12.9251 43.6359 12.8428 41.5348L12.899 41.3271C14.4398 35.6296 11.0702 29.7618 5.37267 28.2209L4.26014 27.92Z"
          fill={unlocked == true ? "#FFD600" : "#AFAFAF"}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.0225 27.4717C100.025 27.1518 101.096 27.7047 101.416 28.7067L101.57 29.1885C103.365 34.811 100.263 40.8244 94.6403 42.6197L93.9755 42.832C93.8396 44.2153 93.5502 45.8779 93.0544 47.6658C95.7851 46.219 99.1184 45.9621 102.191 47.2488L103.254 47.694C104.225 48.1003 104.682 49.2162 104.275 50.1864L104.08 50.6529C101.801 56.0971 95.5391 58.6624 90.0949 56.3827L89.2569 56.0318C88.5047 57.1418 87.6435 58.2174 86.6603 59.2215C90.4992 59.6606 93.9664 62.173 95.439 66.0323L95.8499 67.109C96.2249 68.0918 95.7323 69.1925 94.7495 69.5675L94.277 69.7478C88.7627 71.852 82.5866 69.0876 80.4824 63.5732L80.0715 62.4964C79.7439 61.638 80.0784 60.6896 80.8232 60.2134C80.8973 60.1436 80.9799 60.0806 81.0709 60.0262C84.9149 57.7233 87.4209 54.1747 88.9882 50.5947C90.4535 47.2479 91.0599 43.958 91.1846 41.8377C91.1718 41.8041 91.1598 41.77 91.1487 41.7353L90.9949 41.2535C89.1996 35.631 92.3021 29.6176 97.9246 27.8223L99.0225 27.4717Z"
          fill={unlocked == true ? "#FFB800" : "#AFAFAF"}
        ></path>
      </svg>
    );
  }