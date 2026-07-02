import { render } from "@testing-library/react-native";
import { EmptyState } from "../empty-state";

describe("EmptyState", () => {
  it("renders the title and message", () => {
    const { getByTestId } = render(
      <EmptyState title='No products found' message='Try a different search' />,
    );
    expect(getByTestId("empty-state-title")).toHaveTextContent(
      "No products found",
    );
    expect(getByTestId("empty-state-message")).toHaveTextContent(
      "Try a different search",
    );
  });
});
