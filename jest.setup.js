// @testing-library/react-native registers its custom Jest matchers (e.g.
// toBeOnTheScreen) as a side effect of being imported anywhere in a test
// file, so no extra setup import is required here. This file exists as a
// hook for any future global test setup.

jest.mock("react-native-worklets", () =>
  require("react-native-worklets/src/mock"),
);
require("react-native-reanimated").setUpTests();
