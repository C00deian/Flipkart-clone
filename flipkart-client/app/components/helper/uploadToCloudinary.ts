import axios from "axios";

export const uploadToCloudinary = async (file: File) => {
  try {
    // 1. Get Signature from your backend
    const { signature, timestamp, apiKey, cloudName } =
      await axios.get("/api/cloudinary/signature").then(res => res.data);

    // 2. Prepare Form Data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString()); // Convert to string safe side
    formData.append("signature", signature);
    formData.append("folder", "products"); // Yeh server ke signature config se match hona chahiye

    // 3. Upload to Cloudinary
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return res.data;
    
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error; // Error wapas phenko taaki Form component ise pakad sake
  }
};