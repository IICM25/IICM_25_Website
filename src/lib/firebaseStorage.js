import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  import firebaseApp from "./firebaseConfig";
  
  const storage = getStorage(firebaseApp);
  
  //upload file
  const uploadFile = async (path, file) => {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      let url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log("Error in uploading file: ", error);
    }
  };
  
  const deleteFile = async (path) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.log("Error in deleting file: ", error);
    }
  };
  
  export { uploadFile, deleteFile };
  export default storage;