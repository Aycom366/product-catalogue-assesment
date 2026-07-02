import { fireEvent, screen } from "@testing-library/react-native";
import { renderRouter } from "expo-router/testing-library";

import RootLayout from "@/app/_layout";
import ProductListScreen from "@/app/index";
import ProductDetailsScreen from "@/app/product/[id]";
import type { Product } from "@/types/product";

const product: Product = {
  id: 1,
  title: "Fjallraven Backpack",
  price: 109.95,
  description: "A durable backpack for everyday use.",
  category: "men's clothing",
  image: "https://example.com/backpack.png",
  rating: { rate: 3.9, count: 120 },
};

jest.mock("@/api/products", () => ({
  getProducts: jest.fn(() => Promise.resolve([product])),
  getProduct: jest.fn(() => Promise.resolve(product)),
}));

describe("product list -> product details navigation", () => {
  it("navigates to the product details screen when a product is pressed", async () => {
    renderRouter(
      {
        _layout: RootLayout,
        index: ProductListScreen,
        "product/[id]": ProductDetailsScreen,
      },
      { initialUrl: "/" },
    );

    fireEvent.press(await screen.findByTestId("product-card-1"));

    expect(screen).toHavePathname("/product/1");
    expect(await screen.findByText(product.description)).toBeTruthy();
  });
});
