import { db } from '../Config/Config';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';


export const saveCartStateToFirebase = async (cartState, totalPrice, totalQuantity, user) => {
   

    if (!Array.isArray(cartState)) {
        console.error('cartState is not an array:', cartState);
        return;
    }

    try {
        const userCartRef = collection(db, 'userCarts');
        await addDoc(userCartRef, {
            userId: user.email,
            cartItems: cartState.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image // Assuming image is a property
            })),
            totalPrice: totalPrice,
            totalQuantity: totalQuantity
        });
        console.log('Cart state saved to Firebase');
    } catch (error) {
        console.error('Error saving cart state to Firebase:', error);
    }
};


export const saveAddress = async (shoppingCart, totalPrice, totalQuantity, user, address, paymentMethod) => {
    try {
        // Transform user object to just UID

        // Define the data to be saved to Firestore
        const addressData = {
            shoppingCart,
            totalPrice,
            totalQuantity,
            user, 
            address,
            paymentMethod
        };

        // Get a reference to the 'userAddresses' collection and add a new document
        const userAddressesCollection = collection(db, 'userAddresses');
        await setDoc(doc(userAddressesCollection), addressData);

        console.log('Address saved to Firebase');
    } catch (error) {
        console.error('Error saving address to Firebase:', error);
    }
};

export const deleteProduct = ()=>{
    
}