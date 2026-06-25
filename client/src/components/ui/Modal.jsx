import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Button from "./Button";

/**
 * Modal
 * Used wherever the app currently calls window.confirm() — Dashboard's
 * delete resume, CoachSidebar's delete conversation. Same destructive
 * confirmation pattern, just consistent and dismissible properly.
 *
 * Usage stays a drop-in replacement for window.confirm: pass `open`,
 * `onClose`, `onConfirm`, and copy — the calling code's async logic
 * (api.delete, setState) is unchanged.
 */
function Modal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-surface-raised border border-border-strong rounded-xl p-5"
          >
            <h3 className="text-[14.5px] font-semibold text-ink-primary">{title}</h3>
            {description && (
              <p className="text-[13px] text-ink-tertiary mt-2 leading-relaxed">{description}</p>
            )}
            <div className="flex items-center justify-end gap-2 mt-5">
              <Button variant="ghost" size="sm" onClick={onClose}>
                {cancelLabel}
              </Button>
              <Button
                variant={tone === "danger" ? "danger" : "primary"}
                size="sm"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
