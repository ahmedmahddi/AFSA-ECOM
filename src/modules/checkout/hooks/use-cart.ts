import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";
import { useShallow } from 'zustand/react/shallow'
export const useCart = (tenantSlug: string) => {
  const {
    getCartByTenant,
    addProduct,
    removeProduct,
    clearCart,
    clearAllCarts,
  } = useCartStore();

  const productIds = useCartStore(useShallow((state) => state.tenantCarts[tenantSlug]?.productIds || []))

  const toggleProduct = useCallback((productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  }, [productIds, addProduct, removeProduct, tenantSlug]);

  const isProductInCart = useCallback((productId: string) => {
    return productIds.includes(productId);
  }, [productIds]);

  const clearTenantCart = useCallback(() => {
    clearCart(tenantSlug);
  }, [clearCart, tenantSlug]);

  const addProductToCart = useCallback((productId: string) => {
    addProduct(tenantSlug, productId);
  }, [addProduct, tenantSlug]);

  const removeProductFromCart = useCallback((productId: string) => {
    removeProduct(tenantSlug, productId);
  }, [removeProduct, tenantSlug]);

  return {
    productIds,
    addProduct: addProductToCart,
    removeProduct: removeProductFromCart,
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
