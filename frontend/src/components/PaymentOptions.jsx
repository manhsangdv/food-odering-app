import { useState } from "react";

export default function PaymentOptions({ onChange }) {
  const [provider, setProvider] = useState("COD");

  const selectProvider = (p) => {
    setProvider(p);
    onChange({ payment_provider: p, payment_method: p });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button type="button"
          onClick={() => selectProvider("COD")}
          className={`rounded-2xl border p-4 text-left shadow-sm ${provider==="COD"?"border-blue-600 ring-2 ring-blue-100":"border-gray-200"}`}>
          <div className="font-semibold">Thanh toán khi nhận hàng (COD)</div>
          <div className="text-sm text-gray-500">Thu tiền mặt khi giao</div>
        </button>

        <button type="button"
          onClick={() => selectProvider("SEPAY")}
          className={`rounded-2xl border p-4 text-left shadow-sm ${provider==="SEPAY"?"border-blue-600 ring-2 ring-blue-100":"border-gray-200"}`}>
          <div className="font-semibold">SePay</div>
          <div className="text-sm text-gray-500">Chuyển khoản ngân hàng</div>
        </button>
      </div>
    </div>
  );
}