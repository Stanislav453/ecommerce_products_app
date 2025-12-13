# Unused Code Analysis

This document lists all unused code found in the codebase.

## Unused Functions

### 1. `getProducts` function

**File:** `src/api/apiRequestRepository.ts:34`

```typescript
export const getProducts = async (): Promise<Product> => {
  const response = await axios.get(API_URL);
  return response.data.products;
};
```

**Status:** ❌ **NOT imported or used anywhere**

- Only `getProductsCategory` is actually used (imported in `useGetCategoryQuery.tsx`)
- Function is exported but never called

**Recommendation:** Remove or mark for future use with a comment

---

## Unused Types/Interfaces

### 2. `Product` interface

**File:** `src/type.ts:62`

```typescript
export interface Product extends ProductSummary {
  description: string;
  category: Category;
  discountPercentage: number;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta[];
}
```

**Status:** ⚠️ **Only used as return type for unused `getProducts` function**

- Imported in `apiRequestRepository.ts` but only used in unused function
- Not used anywhere else in the codebase

**Recommendation:** Remove if `getProducts` is removed, or keep if planning to use it

---

### 3. `Order` interface

**File:** `src/type.ts:83`

```typescript
export interface Order {
  name: string;
  price: number;
  desc: string;
}
```

**Status:** ❌ **NOT imported or used anywhere**

**Recommendation:** Remove or mark for future use

---

### 4. `UserReview` type

**File:** `src/type.ts:89`

```typescript
export type UserReview = {
  id: string;
  comment: string;
  author: string;
  email: string;
  saveUserInfo: boolean;
};
```

**Status:** ❌ **NOT imported or used anywhere**

- Note: `ReviewSubmission` interface in `shopRepository.ts` has similar structure but different name

**Recommendation:** Remove or consolidate with `ReviewSubmission` if they serve the same purpose

---

### 5. `ProductDetailResponse` interface

**File:** `src/type.ts:79`

```typescript
export interface ProductDetailResponse {
  products: ProductSummary;
}
```

**Status:** ❌ **NOT imported or used anywhere**

**Recommendation:** Remove or mark for future use

---

### 6. `ProductSummaryResponse` interface

**File:** `src/type.ts:58`

```typescript
export interface ProductSummaryResponse {
  products: ProductView[];
}
```

**Status:** ❌ **NOT imported or used anywhere**

**Recommendation:** Remove or mark for future use

---

### 7. `Route` type

**File:** `src/constants/routes.ts:49`

```typescript
export type Route = (typeof ROUTES)[keyof typeof ROUTES];
```

**Status:** ❌ **Exported but never imported or used**

- `ROUTES` constant is used, but `Route` type is not

**Recommendation:** Remove if not needed, or use it for type safety in route-related functions

---

### 8. `Dimensions` interface (internal)

**File:** `src/type.ts:1`

```typescript
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}
```

**Status:** ⚠️ **Only used in unused `Product` interface**

- Not exported, only used internally in `Product` interface

**Recommendation:** Remove if `Product` interface is removed

---

### 9. `Meta` interface (internal)

**File:** `src/type.ts:15`

```typescript
interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
```

**Status:** ⚠️ **Only used in unused `Product` interface**

- Not exported, only used internally in `Product` interface

**Recommendation:** Remove if `Product` interface is removed

---

## Unused Dependencies

### 10. `zustand` package

**File:** `package.json:22`

```json
"zustand": "^5.0.6"
```

**Status:** ❌ **NOT imported anywhere in the codebase**

- State management is handled by React Context (`CartProvider`) and `useReducer`
- No imports of `zustand` found in any source files

**Recommendation:** Remove from dependencies if not planning to use it, or document why it's kept for future use

---

## Summary

### High Priority (Safe to Remove)

1. ✅ `getProducts` function - confirmed unused
2. ✅ `Order` interface - confirmed unused
3. ✅ `UserReview` type - confirmed unused
4. ✅ `ProductDetailResponse` interface - confirmed unused
5. ✅ `ProductSummaryResponse` interface - confirmed unused
6. ✅ `Route` type - confirmed unused
7. ✅ `zustand` dependency - confirmed unused

### Medium Priority (Depends on `Product` interface)

8. ⚠️ `Product` interface - only used by unused function
9. ⚠️ `Dimensions` interface - only used in `Product`
10. ⚠️ `Meta` interface - only used in `Product`

### Total Unused Code

- **7 items** that can be safely removed immediately
- **3 items** that depend on whether `Product` interface is kept
- **1 unused dependency** (`zustand`)

---

## Recommendations

1. **Remove unused function:**
   - Delete `getProducts` from `apiRequestRepository.ts`
   - Remove import of `Product` from that file

2. **Remove unused types:**
   - Delete `Order`, `UserReview`, `ProductDetailResponse`, `ProductSummaryResponse` from `type.ts`
   - Delete `Route` type from `routes.ts` (or use it for type safety)

3. **Remove unused dependency:**
   - Run: `npm uninstall zustand`
   - Or document why it's kept for future use

4. **Decision needed:**
   - Decide if `Product` interface will be used in the future
   - If not, remove `Product`, `Dimensions`, and `Meta` interfaces
   - If yes, keep them and document their purpose

---

## Verification Commands

To verify unused code:

```bash
# Check if getProducts is imported
grep -r "getProducts[^C]" src/

# Check if Product interface is used (excluding getProducts)
grep -r "\bProduct\b" src/ | grep -v "getProducts"

# Check if zustand is imported
grep -r "import.*zustand" src/

# Check if Order is used
grep -r "\bOrder\b" src/

# Check if UserReview is used
grep -r "\bUserReview\b" src/
```
