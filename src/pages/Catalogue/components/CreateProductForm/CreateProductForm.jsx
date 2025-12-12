import { useState } from "react";
import axios from "axios";
import styles from "./CreateProductForm.module.css"
function CreateProductForm({ onProductCreated }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.price ||
            !formData.description ||
            !formData.image
        ) {
            setMessage("Пожалуйста, заполните все поля и выберите изображение");
            setMessageType("error");
            return;
        }
        setIsSubmitting(true);
        setMessage("");
        try {
            
            const data = new FormData();
            data.append("name", formData.name);
            data.append("price", formData.price);
            data.append("description", formData.description);
            data.append("image", formData.image);
            
            const response = await axios.post(
                "https://torguisam.ru/api/product/create-oksei-product",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            
            setMessage("Товар успешно создан!");
            setMessageType("success");
            
            setFormData({
                name: "",
                price: "",
                description: "",
                image: null,
            });
            
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = "";
            if (onProductCreated) {
                onProductCreated(response.data);
            }
        } catch (error) {
            console.error("Ошибка при создании товара:", error);
            let errorMessage = "Ошибка при создании товара: ";
            if (error.code === "ERR_NETWORK") {
                errorMessage += "Сервер недоступен. Проверьте подключение к интернету.";
            } else if (error.response) {
                errorMessage += `${error.response.status} - ${error.response.data?.message || error.response.statusText
                    }`;
            } else if (error.request) {
                errorMessage += "Сервер не отвечает. Попробуйте позже.";
            } else {
                errorMessage += error.message;
            }
            setMessage(errorMessage);
            setMessageType("error");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className={styles.create_product_form}>
            <h2>Создать новый товар</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Название товара:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Введите название товара"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Введите цену"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Введите описание товара"
                        rows="4"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Изображение:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>
                {message && <div className={`message ${messageType}`}>{message}</div>}
                <button type="submit" disabled={isSubmitting} className={styles.btn_create_product}>
                    {isSubmitting ? "Создание..." : "Создать товар"}
                </button>
            </form>
        </div>
    );
}
export default CreateProductForm;