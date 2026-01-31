// Integration-style tests for the main App component.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "../App";

/**
 * Frontend integration test for form submission.
 */

describe("App", () => {
  it("submits the form with the expected payload", async () => {
    // Mock fetch to capture the outgoing request.
    const user = userEvent.setup();
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        net: 3000,
        breakdown: {
          incomeTax: 500,
          churchTax: 0,
          solidarityTax: 20,
          healthInsurance: 300,
          pensionInsurance: 200,
          unemploymentInsurance: 50,
          nursingCareInsurance: 40,
        },
      }),
    });

    // @ts-expect-error test override
    global.fetch = fetchSpy;

    // Render the form and submit it.
    render(<App />);

    const grossInput = screen.getByLabelText(/gross amount/i);
    await user.clear(grossInput);
    await user.type(grossInput, "6000");

    await user.click(
      screen.getByRole("button", { name: /calculate net salary/i })
    );

    // Verify the request contains expected values.
    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/v1/salary/calculate",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("\"grossAmount\":6000"),
      })
    );
    expect(fetchSpy.mock.calls[0][1]?.body).toContain(
      "\"healthInsuranceType\":\"statutory\""
    );
  });
});
