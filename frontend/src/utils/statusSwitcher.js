export const ComplaintStatus = (status) => {
  switch (status) {
    case "PENDING_REVIEW":
      return "PENDING REVIEW";
      break;
    case "UNDER_REVIEW":
      return "UNDER REVIEW";
      break;
    case "IN_PROGRESS":
      return "IN PROGRESS";
      break;
    case "CLOSED":
    case "REJECTED":
      return "RESOLVED";
      break;

    default:
      return "PENDING REVIEW";
      break;
  }
};
