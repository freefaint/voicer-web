import { useState, useCallback } from "react";

import { DialogTitle, Dialog, Typography, IconButton, DialogContent, DialogActions, Button } from "@material-ui/core";
import { ErrorOutline, Close } from "@material-ui/icons";

import { Notification } from "./notification.context";
import { ValidationError } from "types/registry/error";

export function NotificationDialog({ title, text, form, large, confirmButtonText, alert, onClose, onConfirm }: Notification) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<ValidationError<Record<string, any>>[]>([]);

  const handleConfirm = useCallback((data?: Record<string, any>) => {
    setErrors([]);
    
    const errors = data && form?.errors?.filter(i => i.invalid(data));

    if (errors?.length) {
      return(setErrors(errors));
    }

    onConfirm?.(data);
  }, [form?.errors, onConfirm]);

  return (
    <Dialog open={true}>
      <div style={{ width: large ? "600px" : "28rem" }}>
        <DialogTitle>
          <div style={{ display: "flex", flexDirection: alert ? "column" : "row", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", margin: alert ? "1rem 0" : "0 1rem 0 0", }}>
              <ErrorOutline />
            </div>

            <Typography variant="h6" style={{ letterSpacing: "0.15px", flexGrow: 1 }}>
              {title}
            </Typography>

            {!alert && (
              <div style={{ marginRight: "-1rem" }}>
                <IconButton onClick={onClose}>
                  <Close />
                </IconButton>
              </div>
            )}
          </div>
        </DialogTitle>
        
        {text && (
          <DialogContent style={{ fontSize: "0.875rem", textAlign: alert ?  "center" : "left" }}>
            {text}
          </DialogContent>
        )}
        
        {form && (
          <DialogContent dividers>
            <form.Component data={formData} errors={errors} onChange={setFormData} />
          </DialogContent>
        )}

        <DialogActions style={{ margin: "1rem", justifyContent: alert ?  "center" : undefined }}>
          <Button variant="text" color="primary" onClick={onClose}>{alert ? "Закрыть" : "Отмена"}</Button>

          {!alert && (
            <Button variant={form ? "contained" : "text"} color="primary" onClick={() => handleConfirm(formData)}>{confirmButtonText || "OK"}</Button>
          )}
        </DialogActions>
      </div>
    </Dialog>
  )
}