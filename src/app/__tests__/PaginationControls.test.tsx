import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationControls from "../components/PaginationControls";
import "@testing-library/jest-dom";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("PaginationControls", () => {
  const items = Array.from({ length: 15 }, (_, i) => ({ id: i + 1 }));
  const pushMock = jest.fn();
  const replaceMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      replace: replaceMock,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
      toString: () => "",
    });

    (usePathname as jest.Mock).mockReturnValue("/test");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders page numbers", () => {
    render(
      <PaginationControls
        items={items}
        itemsPerPage={5}
        renderPage={() => <div>Test Page</div>}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(replaceMock).toHaveBeenCalledWith("?page=1", { scroll: false });
  });

  it("calls onPageChange and push when page is clicked", async () => {
    const onPageChange = jest.fn();

    render(
      <PaginationControls
        items={items}
        itemsPerPage={5}
        renderPage={() => <div>Test Page</div>}
        onPageChange={onPageChange}
      />
    );

    await userEvent.click(screen.getByText("2"));

    expect(onPageChange).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("?page=2", { scroll: false });
  });
});
