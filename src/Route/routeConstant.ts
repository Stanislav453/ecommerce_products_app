export const PRODUCT_DETAIL = "/Product-detail";

export const productDetailId = (id: string) => {
  return `${PRODUCT_DETAIL}?id=${id}`;
};
