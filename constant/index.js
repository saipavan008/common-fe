export const productsData = {
    products: [
        {
            id: 1,
            title: "Essence Mascara Lash Princess",
            description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            category: "beauty",
            price: 9.99,
            discountPercentage: 7.17,
            rating: 4.94,
            images: [
                "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
            ]
        }
    ]
};

export const images = {
  logo: require('../public/assets/frougy-logo.png'),
    homeFruits: require('../public/assets/images/fruits.png'),
    banner1: require('../public/assets/images/banner-1.png')
};

export const bankBookInitialFormData = {
    book_title: '',
    description: '',
    balance_type: '',
    payment_type: ''
};

export const transactionsFormData = {
    amount: null,
    remark: '',
    payment_mode: 'Online',
    category: '',
    created_at: null,
    last_edit: null
}