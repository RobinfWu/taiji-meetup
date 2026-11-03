
type Confirmation = {
  first_name: string;
  session_title: string;
  start_at: string;
  end_at: string;
  location: string;
  amount_cents: number | null;
  method: string | null;
  reference: string | null;
};

export function confirmationText(
  info: Confirmation,
  etransferReceivingEmail?: string
): { subject: string; text: string } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  const endFmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const start = fmt.format(new Date(info.start_at));
  const end = endFmt.format(new Date(info.end_at));

  let payment: string;

  if (info.amount_cents === null) {
    payment = "Your first class is free. No payment is required.";
  } else {
    const amount = (info.amount_cents / 100).toFixed(2);

    if (info.method === "etransfer") {
      payment = [
        `Amount due: $${amount} CAD`,
        "Payment method: Interac e-Transfer",
        `Send payment to: ${etransferReceivingEmail ?? "Contact us for payment instructions"}`,
        `Payment reference: ${info.reference ?? "Not available"}`,
        "",
        "Your class reservation is confirmed, but payment is still pending.",
        "Please include the payment reference in the e-Transfer message.",
        "Your payment will be marked as received after we verify the transfer.",
      ].join("\n");
    } else if (info.method === "cash") {
      payment = [
        `Amount due: $${amount} CAD`,
        "Payment method: Cash",
        "Please bring payment to your class.",
        "",
        "Your class reservation is confirmed, but payment is still pending.",
      ].join("\n");
    } else {
      payment = [
        `Amount due: $${amount} CAD`,
        "Your class reservation is confirmed, but payment is still pending.",
        "Please contact us for payment instructions.",
      ].join("\n");
    }
  }

  return {
    subject: `Chen Taiji Lab — booking confirmed: ${info.session_title}`,
    text: [
      `Hello ${info.first_name},`,
      "",
      "Your class reservation is confirmed!",
      "",
      `Class: ${info.session_title}`,
      `When: ${start} – ${end} (Kingston local time)`,
      `Location: ${info.location}`,
      "",
      payment,
      "",
      "If you have questions, please reply to this email.",
      "",
      "Chen Taiji Lab",
    ].join("\n"),
  };
}
