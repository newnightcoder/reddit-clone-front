import { API_POST } from "..";
import { IScrapedPreview } from "../../store/types";

const fetchPreviewData = async (targetUrl: string) => {
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ targetUrl }),
  };
  try {
    const response = await fetch(`${API_POST}/post-link`, request);
    const { article, error }: { article: IScrapedPreview; error?: string } = await response.json();
    return { article, error };
  } catch (err) {
    throw err;
  }
};

export default fetchPreviewData;
