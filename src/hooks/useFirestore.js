import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useFirestore(collection, condition) {
  const [document, setDocument] = useState([]);
  // Dùng để lấy data từ collection users trong firebase
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    if (condition) {
      // điều kiện để lấy data
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocument([]);
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      console.log("do12312312321");
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(documents, "documents");
      setDocument(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return document;
}

export default useFirestore;
