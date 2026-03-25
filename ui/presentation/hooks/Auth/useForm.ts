import React, { useState } from "react";

export function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as T)
    );
  };

  return {
    formData,
    handleInputChange,
  };
}
