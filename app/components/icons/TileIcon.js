const TileIcon = ({ tileType, status }) => {
    switch (tileType) {
      case "star":
        return status === "COMPLETE" ? (
          <CheckmarkSvg />
        ) : status === "ACTIVE" ? (
          <StarSvg />
        ) : (
          <LockSvg />
        );
      /*case "book":
        return status === "COMPLETE" ? (
          <GoldenBookSvg />
        ) : status === "ACTIVE" ? (
          <ActiveBookSvg />
        ) : (
          <LockedBookSvg />
        );
      case "dumbbell":
        return status === "COMPLETE" ? (
          <GoldenDumbbellSvg />
        ) : status === "ACTIVE" ? (
          <ActiveDumbbellSvg />
        ) : (
          <LockedDumbbellSvg />
        );
      case "fast-forward":
        return status === "COMPLETE" ? (
          <CheckmarkSvg />
        ) : status === "ACTIVE" ? (
          <StarSvg />
        ) : (
          <FastForwardSvg />
        );
      case "treasure":
        return status === "COMPLETE" ? (
          <GoldenTreasureSvg />
        ) : status === "ACTIVE" ? (
          <ActiveTreasureSvg />
        ) : (
          <LockedTreasureSvg />
        );
      case "trophy":
        return status === "COMPLETE" ? (
          <GoldenTrophySvg />
        ) : status === "ACTIVE" ? (
          <ActiveTrophySvg />
        ) : (
          <LockedTrophySvg />
        );*/
      default:
        return null; // Ajouté pour gérer les cas non définis
    }
  };
  