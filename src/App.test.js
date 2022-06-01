import { render, screen, fireEvent } from "@testing-library/react";
import { arrayHandler } from "./App";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("UI tests", () => {
  it("renders without errors", () => {
    render(<App />);
  });

  it("calls the onSubmit method", () => {
    const onSubmit = jest.fn();

    render(
      <form onSubmit={onSubmit}>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    );

    const inputValue = "1, 2, 3";
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: inputValue },
    });
    userEvent.click(screen.getByRole("button"));

    expect(onSubmit).toBeCalled();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("view result", () => {
    render(<App />);
    const inputValue = "1, 2, 3";
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: inputValue },
    });
    userEvent.click(screen.getByRole("button"));

    expect(screen.queryAllByText("3")).toBeTruthy();
  });
});

describe("Tests for array handler", () => {
  it("array is empty", () => {
    expect(arrayHandler([])).toBe(NaN);
  });

  it("simple arrays", () => {
    expect(arrayHandler([1, 2, 3, 4])).toBe(3);
    expect(arrayHandler([1, -2, 3])).toBe(-1);
    expect(arrayHandler([1, 2, -3])).toBe(-2);
    expect(arrayHandler([0, 3, 1, 0])).toBe(0);
  });
  it("array by task", () => {
    expect(arrayHandler([4, 0, 3, 19, 492, -10, 1])).toBe(-10);
  });
  it("bad array task", () => {
    expect(
      arrayHandler(
        ["4", "0", "3", "string", "492", "-10", "1"].map((el) => Number(el))
      )
    ).toBe(-10);
  });
  it("random large array", () => {
    const array = [-51000, -51001];
    for (let i = 2; i < 100_000_000; i++) {
      array.push(Math.floor(Math.random() * 100_000 - 50_000));
    }
    const res = -51000 + -51001;
    expect(arrayHandler(array)).toBe(res);
  });
});
