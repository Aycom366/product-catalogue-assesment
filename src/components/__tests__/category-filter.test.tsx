import { Colors } from "@/constants/theme";
import { fireEvent, render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { CategoryFilter } from "../category-filter";

const categories = ["Category 1", "Category 2", "Category 3"];

describe("CategoryFilter", () => {
  it("renders the categories", () => {
    const { getByText } = render(
      <CategoryFilter
        categories={categories}
        selected='Category 1'
        onSelect={jest.fn()}
      />,
    );
    expect(getByText("Category 1")).toBeTruthy();
    expect(getByText("Category 2")).toBeTruthy();
    expect(getByText("Category 3")).toBeTruthy();
  });

  it("calls onSelect when a category is selected", () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <CategoryFilter
        categories={categories}
        selected='Category 1'
        onSelect={onSelect}
      />,
    );
    fireEvent.press(getByText("Category 2"));
    expect(onSelect).toHaveBeenCalledWith("Category 2");
  });

  it("gives the selected category a tint background", () => {
    const { getByTestId } = render(
      <CategoryFilter
        categories={categories}
        selected='Category 1'
        onSelect={jest.fn()}
      />,
    );
    const style = getByTestId("category-tab-Category 1").props.style;
    expect(StyleSheet.flatten(style).backgroundColor).toBe(Colors.light.tint);
  });
});
