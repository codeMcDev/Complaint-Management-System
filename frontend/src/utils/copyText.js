import toast from "react-hot-toast";
const copyText = async (id) => {
  const text = document.getElementById(`${id}`).innerText;
  try {
    await navigator.clipboard.writeText(text);
    toast.success(
      `${id === "caseNumber" ? "Case Number copied" : "Access Key copied"}`,
    );
  } catch (err) {
    (err) => toast.error(`Text copying failed - ${err}`);
  }
};

export default copyText;
