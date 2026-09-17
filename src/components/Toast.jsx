import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast" role="status">
      <CheckCircle2 size={19} />
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Close notification">
        <X size={18} />
      </button>
    </div>
  );
}