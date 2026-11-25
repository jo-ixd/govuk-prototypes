"use client";

import { useState } from "react";
import Hint from "@/app/components/govuk/Hint";
import { ControlPanel, ControlText } from "@/app/playground/_components/Controls";

export default function HintPlayground() {
  const [text, setText] = useState(
    "It’s on your National Insurance card, benefit letter, payslip or P60."
  );

  return (
    <ControlPanel
      title="Hint playground"
      fields={<ControlText label="Hint text" value={text} onChange={setText} />}
      preview={<Hint text={text} />}
    />
  );
}
